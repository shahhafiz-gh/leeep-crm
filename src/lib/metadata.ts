import type { Metadata } from 'next'

interface MetadataOptions {
  title?: string
  description?: string
  keywords?: string[]
  schoolName?: string
}

const DEFAULT_SCHOOL_NAME = 'LEEEP School'
const DEFAULT_DESCRIPTION = 'Welcome to our school website powered by LEEEP CMS'

/**
 * Build SEO metadata for any page.
 * Prepends school name to page title, provides sensible defaults.
 */
export function buildMetadata(options: MetadataOptions = {}): Metadata {
  const schoolName = options.schoolName ?? DEFAULT_SCHOOL_NAME
  const title = options.title
    ? `${options.title} | ${schoolName}`
    : schoolName
  const description = options.description ?? DEFAULT_DESCRIPTION

  return {
    title,
    description,
    keywords: options.keywords,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}
