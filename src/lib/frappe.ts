import axios from 'axios'
import type { SchoolData } from '@/types/school.types'
import { placeholderTemplateAData, mockKcgsData } from './mock'

/**
 * Frappe API client for the LEEEP CMS backend.
 *
 * Known Frappe instances:
 * - IEIskp:             https://iei.leeep.in
 * - Kashmir-Cambridge:  https://kcs.leeep.in
 *
 * API endpoints used in the source repos:
 * - /api/method/education.education.api.get_website_announcements
 * - /api/method/education.education.api.get_website_events
 * - /api/method/education.education.api.get_website_event?name={id}
 * - /api/method/education.education.api.get_website_announcement?name={id}
 */

const frappeClient = axios.create({
  baseURL: process.env.FRAPPE_API_URL ?? 'https://iei.leeep.in',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

/** Options controlling which content variant `getSchoolData` returns. */
export interface SchoolDataOptions {
  /** True when the request asked for draft content (`?preview=1`). */
  preview?: boolean
  /** Per-request token supplied with the preview request (`?token=...`). */
  token?: string
}

/** Search-params shape passed by Next.js pages (already awaited). */
export type RouteSearchParams = Record<string, string | string[] | undefined>

/**
 * Translate a route's `searchParams` into preview options.
 * `?preview=1&token=<secret>` → { preview: true, token: '<secret>' }.
 */
export function resolvePreviewOptions(searchParams?: RouteSearchParams): SchoolDataOptions {
  const previewRaw = searchParams?.preview
  const preview = previewRaw === '1' || previewRaw === 'true'
  const tokenRaw = searchParams?.token
  const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw
  return { preview, token }
}

/**
 * Fetch full school data by subdomain.
 * The Frappe backend resolves which school & template config to return.
 *
 * Draft vs published: the public site always receives published content.
 * Draft content is returned **only** when the request both asked for preview
 * (`?preview=1`) and supplied a token that matches `PREVIEW_SECRET`. The secret
 * is read server-side here and never sent to the browser; the comparison is
 * per-request (no cookie / session).
 */
export async function getSchoolData(
  subdomain: string,
  options?: SchoolDataOptions,
): Promise<SchoolData | null> {
  const secret = process.env.PREVIEW_SECRET
  const previewAuthorized =
    options?.preview === true && !!secret && options.token === secret

  try {
    const res = await frappeClient.get('/api/method/education.education.api.get_school_data', {
      params: { subdomain },
    })

    const message = res.data?.message
    if (message) {
      // The backend may return a content envelope ({ published_content,
      // draft_content }) or a flat SchoolData. Authorised preview requests get
      // the draft variant; everyone else gets published.
      if (message.published_content !== undefined || message.draft_content !== undefined) {
        const content = previewAuthorized
          ? (message.draft_content ?? message.published_content)
          : message.published_content
        if (content) return content as SchoolData
      } else {
        return message as SchoolData
      }
    }

    // If API succeeds but returns no data, throw to trigger fallback
    throw new Error('No data returned from API')
  } catch {
    // Serve mock data in local dev, or on preview/demo deployments
    // (e.g. *.vercel.app) where DEMO_FALLBACK is enabled. Real production
    // multi-tenant hosting leaves this unset so unknown schools 404.
    const allowFallback =
      process.env.NODE_ENV !== 'production' || process.env.DEMO_FALLBACK === 'true'
    if (!allowFallback) return null
    // DEMO_SUBDOMAIN lets a preview deploy force which mock school to show,
    // regardless of the host (the bare *.vercel.app URL has no real subdomain).
    const effective = process.env.DEMO_SUBDOMAIN ?? subdomain
    if (effective === 'kcgs' || effective === 'kcs') return mockKcgsData
    return placeholderTemplateAData
  }
}

/**
 * Resolve the full media URL from a Frappe file path.
 * Frappe stores files as "/files/image.jpg" — we prepend the base URL.
 */
export function resolveFrappeMediaUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const baseURL = process.env.FRAPPE_API_URL ?? 'https://iei.leeep.in'
  return `${baseURL}${encodeURI(path)}`
}
