import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getSchoolData } from '@/lib/frappe'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import TemplateA from '@/templates/template-a/TemplateA'
import TemplateB from '@/templates/template-b/TemplateB'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const subdomain = headersList.get('x-school-subdomain') ?? ''
  const data = await getSchoolData(subdomain)
  return buildMetadata({ schoolName: data?.name, description: data?.tagline })
}

export default async function HomePage() {
  const headersList = await headers()
  const subdomain = headersList.get('x-school-subdomain') ?? ''
  const data = await getSchoolData(subdomain)
  if (!data) return notFound()

  if (data.config.template_id === 'template-a') return <TemplateA data={data} page="home" />
  if (data.config.template_id === 'template-b') return <TemplateB data={data} page="home" />
  return notFound()
}

export const dynamic = 'force-dynamic'
