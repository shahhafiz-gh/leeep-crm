import type { SchoolData } from '@/types/school.types'
import PageHero from '../components/common/PageHero'
import OurStory from '../components/about/OurStory'
import MissionVision from '../components/about/MissionVision'
import Achievements from '../components/about/Achievements'

/** Template B — About Page View (Kashmir-Cambridge style) */
export default function AboutView({ data }: { data: SchoolData }) {
  return (
    <div className="font-[family-name:var(--font-hind)] bg-tb-background text-tb-foreground">
      <PageHero
        eyebrow="Dedicated to Excellence"
        title="About Our School"
        description={data.about.description}
      />
      <OurStory data={data} />
      <MissionVision data={data} />
      <Achievements data={data} />
    </div>
  )
}
