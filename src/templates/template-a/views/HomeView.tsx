import type { SchoolData } from '@/types/school.types'
import HeroSection from '../components/home/HeroSection'
import AnnouncementsSection from '../components/home/AnnouncementsSection'
import WhyChooseUsSection from '../components/home/WhyChooseUsSection'
import StatsSection from '../components/home/StatsSection'
import AboutSection from '../components/home/AboutSection'
import ProgramsSection from '../components/home/ProgramsSection'
import GallerySection from '../components/home/GallerySection'
import AlumniSection from '../components/home/AlumniSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import AdmissionsSection from '../components/home/AdmissionsSection'
import EventsSection from '../components/home/EventsSection'

/** Template A — Home Page View (IEIskp style) */
export default function HomeView({ data }: { data: SchoolData }) {
  return (
    <>
      <HeroSection data={data} />
      <AnnouncementsSection data={data} />
      <EventsSection data={data} />
      <WhyChooseUsSection data={data} />
      <StatsSection data={data} />
      <AboutSection data={data} />
      <ProgramsSection data={data} />
      <GallerySection data={data} />
      <AlumniSection data={data} />
      <TestimonialsSection data={data} />
      <AdmissionsSection data={data} />
    </>
  )
}
