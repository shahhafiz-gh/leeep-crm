  'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Generic inline-edit layer (capture only — NO save).
 *
 * Rendered ONLY in preview/draft mode (gated by the caller on
 * `resolvePreviewMode`). It walks the DOM for the editable tags emitted by the
 * Home/layout components and:
 *   - `[data-edit]`        → makes the element `contentEditable`
 *   - `[data-edit-img]`    → clickable, signals an image-upload intent
 *   - `[data-edit-icon]`   → clickable, prompts for a new iconify name
 *   - `[data-edit-link]`   → clickable, prompts for a new href
 *   - `[data-edit-date]`   → clickable, prompts for a new date (stored-blob dates)
 *   - `[data-edit-social]` → clickable, opens a CUSTOM popup to set the URL
 *
 * Every change is `postMessage`d to the parent (the Vue admin) as
 * `{ source, path, type, value }` with an explicit `targetOrigin`. It never
 * fetches, never saves, and never touches `updates.*` / `config.*`.
 */

const MESSAGE_SOURCE = 'leeep-inline-edit'
const ADMIN_SOURCE = 'leeep-admin'

/** Resolve the parent (admin) origin for `postMessage` targetOrigin. */
function getParentOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_ADMIN_ORIGIN
  if (configured) return configured
  if (typeof document !== 'undefined' && document.referrer) {
    try {
      return new URL(document.referrer).origin
    } catch {
      /* fall through */
    }
  }
  // Last resort so a change is never silently dropped in dev. The parent still
  // validates `event.origin`, so this stays a UX-only fallback.
  return '*'
}

/** Social-link editor state (drives the custom popup). */
type SocialEdit = { el: HTMLElement; path: string; platform: string; url: string }

export default function InlineEditLayer() {
  const [social, setSocial] = useState<SocialEdit | null>(null)
  const [draftUrl, setDraftUrl] = useState('')
  const targetOriginRef = useRef<string>('*')

  useEffect(() => {
    // Only meaningful inside the admin iframe.
    if (window.parent === window) return

    const targetOrigin = getParentOrigin()
    targetOriginRef.current = targetOrigin
    const cleanups: Array<() => void> = []

    const post = (payload: { path?: string; type: string; value?: unknown }) => {
      window.parent.postMessage({ source: MESSAGE_SOURCE, ...payload }, targetOrigin)
    }

    // ── Text ─────────────────────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>('[data-edit]').forEach((el) => {
      const path = el.getAttribute('data-edit')
      if (!path) return
      el.setAttribute('contenteditable', 'plaintext-only')
      el.dataset.leeepEditable = 'text'
      const onBlur = () => post({ path, type: 'text', value: el.innerText.trim() })
      // Keep edits single-line for text fields.
      const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          el.blur()
        }
      }
      el.addEventListener('blur', onBlur)
      el.addEventListener('keydown', onKeydown)
      cleanups.push(() => {
        el.removeAttribute('contenteditable')
        delete el.dataset.leeepEditable
        el.removeEventListener('blur', onBlur)
        el.removeEventListener('keydown', onKeydown)
      })
    })

    // ── Images: signal INTENT only ───────────────────────────────────────
    // The authenticated admin opens a file picker and uploads (public) — the
    // renderer never uploads or fetches Frappe itself.
    document.querySelectorAll<HTMLElement>('[data-edit-img]').forEach((el) => {
      const path = el.getAttribute('data-edit-img')
      if (!path) return
      el.dataset.leeepEditable = 'image'
      const onClick = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        post({ path, type: 'image' })
      }
      el.addEventListener('click', onClick)
      cleanups.push(() => {
        delete el.dataset.leeepEditable
        el.removeEventListener('click', onClick)
      })
    })

    // ── Click-to-edit: icons / links / dates ─────────────────────────────
    const clickEditors: Array<{ attr: string; type: string; ask: string }> = [
      { attr: 'data-edit-icon', type: 'icon', ask: 'New icon name (e.g. lucide:star):' },
      { attr: 'data-edit-link', type: 'link', ask: 'New link URL:' },
      { attr: 'data-edit-date', type: 'date', ask: 'New date (YYYY-MM-DD):' },
    ]

    clickEditors.forEach(({ attr, type, ask }) => {
      document.querySelectorAll<HTMLElement>(`[${attr}]`).forEach((el) => {
        const path = el.getAttribute(attr)
        if (!path) return
        el.dataset.leeepEditable = type
        const onClick = (e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          const next = window.prompt(ask, '')
          if (next !== null) post({ path, type, value: next })
        }
        el.addEventListener('click', onClick)
        cleanups.push(() => {
          delete el.dataset.leeepEditable
          el.removeEventListener('click', onClick)
        })
      })
    })

    // ── Social links: reveal empties + open the custom popup ──────────────
    // Live hides un-configured platforms (inline display:none); here we reveal
    // them so the editor can set each one, and flag configured ones as "done".
    document.querySelectorAll<HTMLElement>('[data-edit-social]').forEach((el) => {
      const path = el.getAttribute('data-edit-social')
      if (!path) return
      el.dataset.leeepEditable = 'social'
      if (el.getAttribute('data-social-empty') === 'true') {
        el.style.display = '' // reveal for editing (stays hidden in live)
      } else {
        el.setAttribute('data-leeep-social-done', 'true')
      }
      const onClick = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const url = el.getAttribute('data-social-url') || ''
        setSocial({
          el,
          path,
          platform: el.getAttribute('data-social-platform') || 'link',
          url,
        })
        setDraftUrl(url)
      }
      el.addEventListener('click', onClick)
      cleanups.push(() => {
        delete el.dataset.leeepEditable
        el.removeEventListener('click', onClick)
      })
    })

    // ── Suppress link navigation while editing ───────────────────────────
    const onDocClickCapture = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a')
      if (anchor) e.preventDefault()
    }
    document.addEventListener('click', onDocClickCapture, true)
    cleanups.push(() => document.removeEventListener('click', onDocClickCapture, true))

    // ── Visible affordances ──────────────────────────────────────────────
    const style = document.createElement('style')
    style.textContent = `
      [data-leeep-editable]{outline:1px dashed rgba(59,130,246,.6);outline-offset:2px;border-radius:2px}
      [data-leeep-editable="text"]:focus{outline:2px solid rgba(59,130,246,.9);background:rgba(59,130,246,.06)}
      [data-leeep-editable="image"],[data-leeep-editable="icon"],
      [data-leeep-editable="link"],[data-leeep-editable="date"],
      [data-leeep-editable="social"]{cursor:pointer!important}
      [data-leeep-social-done]{position:relative;outline-color:rgba(34,197,94,.7)!important}
      [data-leeep-social-done]::after{content:'✓';position:absolute;top:-6px;right:-6px;width:15px;height:15px;
        line-height:15px;font-size:10px;font-weight:700;text-align:center;background:#22c55e;color:#fff;
        border-radius:9999px;box-shadow:0 0 0 2px rgba(255,255,255,.85);pointer-events:none;z-index:2}
    `
    document.head.appendChild(style)
    cleanups.push(() => style.remove())

    // ── Apply an uploaded image back into the preview ─────────────────────
    // The preview renders PUBLISHED content (draft fetch needs the editor's
    // Frappe session, unavailable cross-origin), so a reload won't reflect a
    // just-uploaded draft image. The admin posts the new (absolute) URL back
    // and we swap the matching <img> in place — mirroring contentEditable.
    const onAdminMessage = (e: MessageEvent) => {
      const msg = e.data
      if (!msg || msg.source !== ADMIN_SOURCE || msg.type !== 'apply-image') return
      if (typeof msg.path !== 'string' || typeof msg.value !== 'string') return
      const el = document.querySelector<HTMLElement>(`[data-edit-img="${msg.path}"]`)
      if (!el) return
      if (el instanceof HTMLImageElement) {
        el.srcset = msg.value
        el.src = msg.value
      } else {
        el.style.backgroundImage = `url("${msg.value}")`
      }
    }
    window.addEventListener('message', onAdminMessage)
    cleanups.push(() => window.removeEventListener('message', onAdminMessage))

    // Handshake so the admin knows the editable layer is live.
    post({ type: 'ready' })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  // ── Social popup handlers ──────────────────────────────────────────────
  const applySocial = (rawValue: string) => {
    if (!social) return
    const value = rawValue.trim()
    window.parent.postMessage(
      { source: MESSAGE_SOURCE, path: social.path, type: 'link', value },
      targetOriginRef.current,
    )
    const el = social.el
    el.setAttribute('data-social-url', value)
    if (value) {
      el.setAttribute('href', value)
      el.removeAttribute('data-social-empty')
      el.setAttribute('data-leeep-social-done', 'true')
      el.style.display = '' // visible in both editor and live
    } else {
      el.removeAttribute('href')
      el.setAttribute('data-social-empty', 'true')
      el.removeAttribute('data-leeep-social-done')
      // Stays revealed in the editor; live hides it (no edit layer to reveal).
    }
    setSocial(null)
  }

  if (!social) return null

  const label = social.platform.charAt(0).toUpperCase() + social.platform.slice(1)
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applySocial(draftUrl)
    if (e.key === 'Escape') setSocial(null)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Edit ${label} link`}
      onClick={() => setSocial(null)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        background: 'rgba(15,23,42,.55)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 24px 60px rgba(0,0,0,.35)',
          padding: 22,
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          color: '#0f172a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{label} link</h3>
          {social.url && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#15803d',
                background: '#dcfce7',
                borderRadius: 9999,
                padding: '2px 8px',
              }}
            >
              ✓ Added
            </span>
          )}
        </div>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: '#64748b' }}>
          Paste the full URL to your {label} page. Leave empty to hide this icon on the live site.
        </p>
        <input
          autoFocus
          type="url"
          inputMode="url"
          value={draftUrl}
          onChange={(e) => setDraftUrl(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`https://${social.platform}.com/your-school`}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #cbd5e1',
            borderRadius: 9,
            padding: '11px 12px',
            fontSize: 14,
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
          {social.url && (
            <button
              type="button"
              onClick={() => applySocial('')}
              style={{
                marginRight: 'auto',
                border: '1px solid #fecaca',
                background: '#fff',
                color: '#dc2626',
                borderRadius: 9,
                padding: '9px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          )}
          <button
            type="button"
            onClick={() => setSocial(null)}
            style={{
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#334155',
              borderRadius: 9,
              padding: '9px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => applySocial(draftUrl)}
            style={{
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              borderRadius: 9,
              padding: '9px 18px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
