import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getSchoolData, resolvePreviewOptions, type RouteSearchParams } from '@/lib/frappe'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import TemplateA from '@/templates/template-a/TemplateA'
import TemplateB from '@/templates/template-b/TemplateB'

type PageProps = { searchParams: Promise<RouteSearchParams> }

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const headersList = await headers()
  const subdomain = headersList.get('x-school-subdomain') ?? ''
  const data = await getSchoolData(subdomain, resolvePreviewOptions(await searchParams))
  return buildMetadata({ schoolName: data?.name, title: 'Admissions', description: data?.admissions.description })
}

export default async function AdmissionsPage({ searchParams }: PageProps) {
  const headersList = await headers()
  const subdomain = headersList.get('x-school-subdomain') ?? ''
  const data = await getSchoolData(subdomain, resolvePreviewOptions(await searchParams))
  if (!data) return notFound()

  if (data.config.template_id === 'template-a') return <TemplateA data={data} page="admissions" />
  if (data.config.template_id === 'template-b') return <TemplateB data={data} page="admissions" />
  return notFound()
}

export const dynamic = 'force-dynamic'
