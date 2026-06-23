import type { PageType, SchoolData } from '@/types/school.types'
import TemplateA from '@/templates/template-a/TemplateA'
import TemplateB from '@/templates/template-b/TemplateB'

/**
 * Render the correct template for a school's data.
 *
 * The template is chosen ONLY from `data.config.template_id` — never from a URL
 * param. A missing/unknown value defaults to `template-a` with a warning so the
 * page still renders instead of crashing. This rule lives here so all routes
 * behave identically.
 */
export function renderTemplate(data: SchoolData, page: PageType, school: string) {
  const templateId = data.config?.template_id

  if (templateId === 'template-b') return <TemplateB data={data} page={page} />

  if (templateId !== 'template-a') {
    console.warn(
      `[cms] Unknown or missing config.template_id (${String(templateId)}) for ` +
        `school="${school}"; defaulting to template-a.`,
    )
  }
  return <TemplateA data={data} page={page} />
}
