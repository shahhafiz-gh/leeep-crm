import type { SchoolData } from '@/types/school.types'
import ContactHero from '../components/contact/ContactHero'
import FindUsSection from '../components/contact/FindUsSection'

/** Template A — Contact Page View (IEIskp style) */
export default function ContactView({ data }: { data: SchoolData }) {
  return (
    <div className="font-(family-name:--font-dm-sans) bg-ta-background text-ta-on-background">
      <ContactHero data={data} />
      <FindUsSection data={data} />
    </div>
  )
}
