import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { getSiteData, resolveSchool, resolvePreviewMode, type RouteSearchParams } from '@/lib/cms'
import { renderTemplate } from '@/lib/render-template'
import { buildMetadata } from '@/lib/metadata'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<RouteSearchParams>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params
  const headersList = await headers()
  const sp = await searchParams
  const data = await getSiteData(resolveSchool(headersList, sp), resolvePreviewMode(sp))
  const announcement = data.updates.announcements.find((a) => a.id === id)
  return buildMetadata({
    schoolName: data.name,
    title: announcement?.title ?? 'Update',
    description: announcement?.short_description ?? undefined,
  })
}

export default async function UpdateDetailPage({ params, searchParams }: Props) {
  await params
  const headersList = await headers()
  const sp = await searchParams
  const school = resolveSchool(headersList, sp)
  const data = await getSiteData(school, resolvePreviewMode(sp))
  // The update id is read via useParams() inside the client-side UpdatesView.
  return renderTemplate(data, 'updates', school)
}

export const dynamic = 'force-dynamic'
