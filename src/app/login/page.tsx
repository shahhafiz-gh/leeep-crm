import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { getSiteData, resolveSchool, resolvePreviewMode, type RouteSearchParams } from '@/lib/cms'
import { renderTemplate } from '@/lib/render-template'
import { buildMetadata } from '@/lib/metadata'

type PageProps = { searchParams: Promise<RouteSearchParams> }

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const headersList = await headers()
  const sp = await searchParams
  const data = await getSiteData(resolveSchool(headersList, sp), resolvePreviewMode(sp))
  return buildMetadata({ schoolName: data.name, title: 'Login' })
}

export default async function LoginPage({ searchParams }: PageProps) {
  const headersList = await headers()
  const sp = await searchParams
  const school = resolveSchool(headersList, sp)
  const data = await getSiteData(school, resolvePreviewMode(sp))
  return renderTemplate(data, 'login', school)
}

export const dynamic = 'force-dynamic'
