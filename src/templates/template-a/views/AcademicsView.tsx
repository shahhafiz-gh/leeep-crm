import type { SchoolData } from '@/types/school.types'
import AcademicsHero from '../components/academics/AcademicsHero'
import StreamsSection from '../components/academics/StreamsSection'
import MethodologySection from '../components/academics/MethodologySection'
import ResultsSection from '../components/academics/ResultsSection'
import ClubsSection from '../components/academics/ClubsSection'

/** Template A — Academics Page View (IEIskp style) */
export default function AcademicsView({ data }: { data: SchoolData }) {
  return (
    <div className="font-(family-name:--font-dm-sans) bg-ta-background text-ta-on-background">
      <AcademicsHero data={data} />
      <StreamsSection data={data} />
      <MethodologySection data={data} />
      <ResultsSection data={data} />
      <ClubsSection data={data} />
    </div>
  )
}
