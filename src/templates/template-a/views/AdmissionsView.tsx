import type { SchoolData } from '@/types/school.types'
import AdmissionsHero from '../components/admissions/AdmissionsHero'
import WhyChooseSection from '../components/admissions/WhyChooseSection'
import ApplicationFormSection from '../components/admissions/ApplicationFormSection'
import AdmissionsFaqSection from '../components/admissions/AdmissionsFaqSection'

/** Template A — Admissions Page View (IEIskp style) */
export default function AdmissionsView({ data }: { data: SchoolData }) {
  return (
    <div className="font-(family-name:--font-dm-sans) bg-ta-background text-ta-on-background">
      <AdmissionsHero data={data} />
      <WhyChooseSection data={data} />
      <ApplicationFormSection data={data} />
      <AdmissionsFaqSection data={data} />
    </div>
  )
}
