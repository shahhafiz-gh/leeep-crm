import type { SchoolData } from '@/types/school.types'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import NewsSection from '../components/sections/NewsSection'
import EventsSection from '../components/sections/EventsSection'
import CampusLifeSection from '../components/sections/CampusLifeSection'
import FacilitiesSection from '../components/sections/FacilitiesSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'

/** Template B — Home Page View (Kashmir-Cambridge style) */
export default function HomeView({ data }: { data: SchoolData }) {
  return (
    <div className="font-[family-name:var(--font-inter)] bg-tb-background text-tb-foreground">
      <HeroSection data={data} />
      <AboutSection data={data} />
      <NewsSection data={data} />
      <EventsSection data={data} />
      <CampusLifeSection data={data} />
      <FacilitiesSection data={data} />
      <TestimonialsSection data={data} />
    </div>
  )
}
