import type { SchoolData } from '@/types/school.types'
import PageHero from '../components/common/PageHero'
import ContactForm from '../components/contact/ContactForm'
import MapSection from '../components/contact/MapSection'

/** Template B — Contact Page View (Kashmir-Cambridge style) */
export default function ContactView({ data }: { data: SchoolData }) {
  return (
    <div className="font-[family-name:var(--font-hind)] bg-tb-background text-tb-foreground">
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description={`We'd love to hear from you. Reach out to ${data.name} with any questions.`}
      />
      <ContactForm data={data} />
      <MapSection data={data} />
    </div>
  )
}
