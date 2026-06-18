import type { SchoolData } from '@/types/school.types'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import ScrollReveal from '@/shared/animations/scroll-reveal'
import StaggerChildren from '@/shared/animations/stagger-children'

/** Template B — Campus Life Section (KCS style, using about.mission items) */
export default function CampusLifeSection({ data }: { data: SchoolData }) {
  const items = data.about.mission ?? []

  if (items.length === 0) {
    return null
  }

  return (
    <section id="campus-life" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left: text */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <p className="text-tb-primary-400 text-sm font-bold uppercase tracking-widest mb-3">
              Campus Life
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-tb-heading leading-tight mb-6">
              Campus Life
            </h2>
            <p className="text-tb-body leading-relaxed mb-8">
              Embark on a journey of discovery and growth at {data.name}. Our campus is a vibrant, inclusive community where students explore their passions and unlock their full potential. Beyond our innovative classrooms, students engage in dynamic extracurricular activities, competitive sports, and inspiring academic clubs.
            </p>
            <Link
              href="/campus-life"
              className="inline-flex items-center gap-2 px-6 py-3 bg-tb-primary-400 text-white font-semibold text-sm rounded-full hover:bg-tb-primary-500 transition-all duration-300"
            >
              Explore Campus Life
              <Icon icon="lucide:arrow-right" className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          {/* Right: campus cards */}
          <StaggerChildren className="lg:col-span-3 space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-[160px] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Background image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/70 to-transparent" />

                {/* Content bar */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <h4 className="text-white font-bold text-lg leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-white/70 text-sm line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href={(item as { href?: string }).href ?? '/campus-life'}
                    className="w-10 h-10 rounded-full bg-tb-primary-400 flex items-center justify-center shrink-0 ml-4 hover:bg-tb-primary-500 transition-colors"
                  >
                    <Icon icon="lucide:arrow-right" className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  )
}
