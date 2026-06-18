import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getSchoolData, resolvePreviewOptions, type RouteSearchParams } from '@/lib/frappe'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import TemplateA from '@/templates/template-a/TemplateA'
import TemplateB from '@/templates/template-b/TemplateB'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<RouteSearchParams>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params
  const headersList = await headers()
  const subdomain = headersList.get('x-school-subdomain') ?? ''
  const data = await getSchoolData(subdomain, resolvePreviewOptions(await searchParams))
  const announcement = data?.updates.announcements.find((a) => a.id === id)
  return buildMetadata({
    schoolName: data?.name,
    title: announcement?.title ?? 'Update',
    description: announcement?.short_description,
  })
}

export default async function UpdateDetailPage({ params, searchParams }: Props) {
  await params
  const headersList = await headers()
  const subdomain = headersList.get('x-school-subdomain') ?? ''
  const data = await getSchoolData(subdomain, resolvePreviewOptions(await searchParams))
  if (!data) return notFound()

  // The update id is read via useParams() inside the client-side UpdatesView
  if (data.config.template_id === 'template-a') return <TemplateA data={data} page="updates" />
  if (data.config.template_id === 'template-b') return <TemplateB data={data} page="updates" />
  return notFound()
}

export const dynamic = 'force-dynamic'
