import { Icon } from '@iconify/react'
import type { SchoolData } from '@/types/school.types'
import ScrollReveal from '@/shared/animations/scroll-reveal'
import StaggerChildren from '@/shared/animations/stagger-children'

/** Template B — Our Mission & Vision */
export default function MissionVision({ data }: { data: SchoolData }) {
  const pillars = data.about.mission ?? []
  const vision = data.about.vision
  const values = data.about.values ?? []

  if (pillars.length === 0 && !vision) return null

  return (
    <div className="py-16 md:py-24 bg-tb-primary-50/40">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-tb-primary-400 mb-3">
            What Drives Us
          </span>
          <h3 className="text-3xl font-bold text-tb-heading">Our Mission &amp; Vision</h3>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Mission Card — white */}
          {pillars.length > 0 && (
            <div className="bg-white rounded-xl border border-tb-border p-8 h-full hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-tb-primary-400/10 flex items-center justify-center mb-6">
                <Icon icon="lucide:target" className="w-8 h-8 text-tb-primary-500" />
              </div>
              <h4 className="text-2xl font-bold text-tb-heading mb-4">Our Mission</h4>
              <p className="text-tb-body text-lg leading-relaxed mb-6">
                To deliver an education that nurtures every student through these guiding commitments:
              </p>
              <div className="space-y-4">
                {pillars.map((p) => (
                  <div key={p.title} className="flex items-start gap-3">
                    <Icon
                      icon={p.icon ?? 'lucide:check-circle'}
                      className="w-5 h-5 text-tb-primary-500 mt-1 shrink-0"
                    />
                    <span className="text-tb-body">
                      <span className="font-semibold text-tb-heading">{p.title}</span>
                      {' — '}
                      {p.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vision Card — gold */}
          {vision && (
            <div className="bg-tb-primary-400 rounded-xl p-8 h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mb-6">
                <Icon icon="lucide:eye" className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Our Vision</h4>
              <p className="text-white text-lg leading-relaxed mb-8">{vision}</p>

              {values.length > 0 && (
                <div className="mt-auto">
                  <p className="text-white/80 font-semibold uppercase tracking-wider text-xs mb-3">
                    Our Core Values
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {values.map((v) => (
                      <span
                        key={v}
                        className="inline-flex items-center gap-1.5 bg-white/15 text-white text-sm rounded-full px-3 py-1.5"
                      >
                        <Icon icon="lucide:star" className="w-3.5 h-3.5 text-white/80" />
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </StaggerChildren>
      </div>
    </div>
  )
}
