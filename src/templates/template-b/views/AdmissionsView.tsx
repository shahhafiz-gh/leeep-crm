import type { SchoolData } from '@/types/school.types'
import PageHero from '../components/common/PageHero'
import AdmissionRequirements from '../components/admissions/AdmissionRequirements'
import ApplicationForm from '../components/admissions/ApplicationForm'
import AdmissionFaqSection from '../components/admissions/AdmissionFaqSection'

/** Template B — Admissions Page View (Kashmir-Cambridge style) */
export default function AdmissionsView({ data }: { data: SchoolData }) {
  return (
    <div className="font-[family-name:var(--font-hind)] bg-tb-background text-tb-foreground">
      <PageHero
        eyebrow="Join Our Vibrant Community"
        title="Admissions"
        description={data.admissions.description}
      />
      <AdmissionRequirements data={data} />
      <ApplicationForm data={data} />
      <AdmissionFaqSection data={data} />
    </div>
  )
}
