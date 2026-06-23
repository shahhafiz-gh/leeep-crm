'use client'

import { Icon } from '@iconify/react'
import type { SchoolData } from '@/types/school.types'
import ScrollReveal from '@/shared/animations/scroll-reveal'
import StaggerChildren from '@/shared/animations/stagger-children'

const alumniIcons = [
  'lucide:stethoscope',
  'lucide:cpu',
  'lucide:scale',
  'lucide:calculator',
]

export default function AlumniSection({ data }: { data: SchoolData }) {
  const alumni = data.alumni
  if (!alumni || alumni.length === 0) return null

  return (
    <section className="py-(--spacing-ta-xxl)] bg-ta-surface-container-lowest overflow-hidden">
      <div className="container my-10 mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="px-4 py-2 bg-ta-secondary-container text-ta-on-secondary-container rounded-full font-(family-name:--font-ta-label-md) text-(length:--text-ta-label-md) mb-4 inline-block">
              Our Pride
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-(family-name:--font-ta-h2) text-(length:--text-ta-h2) text-ta-on-surface mb-4">
              Where Our Alumni Are Today
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-(family-name:--font-ta-body-lg) text-ta-on-surface-variant max-w-2xl mx-auto">
              From medical colleges to engineering institutions, our graduates continue to make us proud across diverse fields.
            </p>
          </ScrollReveal>
        </div>

        {/* Alumni Grid */}
        <StaggerChildren stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {alumni.map((person, i) => (
            <div
              key={person.name}
              className="group relative bg-ta-surface-container-low rounded-3xl p-8 border border-ta-outline-variant/50 hover:border-ta-primary/30 hover:shadow-xl transition-all duration-500"
            >
              <Icon
                icon="lucide:quote"
                className="absolute top-6 right-6 text-4xl text-ta-primary/10 group-hover:text-ta-primary/20 transition-colors"
              />
              <p data-edit={`alumni.${i}.testimonial`} className="font-(family-name:--font-ta-body-md) text-ta-on-surface-variant leading-relaxed mb-8 italic">
                &ldquo;{person.testimonial}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-ta-primary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon icon={alumniIcons[i % alumniIcons.length]} className="text-2xl text-ta-on-primary-container" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 data-edit={`alumni.${i}.name`} className="font-(family-name:--font-ta-label-md) text-ta-on-surface font-bold truncate">{person.name}</h3>
                  <p data-edit={`alumni.${i}.achievement`} className="text-ta-primary font-(family-name:--font-ta-label-md) text-sm font-semibold">{person.achievement}</p>
                  <p className="text-ta-on-surface-variant text-xs mt-0.5">Batch <span data-edit={`alumni.${i}.batch`}>{person.batch}</span></p>
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
