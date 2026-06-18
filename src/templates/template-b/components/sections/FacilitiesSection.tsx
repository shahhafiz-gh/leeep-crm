import type { SchoolData } from '@/types/school.types'
import { Icon } from '@iconify/react'
import ScrollReveal from '@/shared/animations/scroll-reveal'
import StaggerChildren from '@/shared/animations/stagger-children'

/** Template B — Facilities Section (KCS style, using data.programs as facility items) */
export default function FacilitiesSection({ data }: { data: SchoolData }) {
  const facilities = data.programs ?? []

  return (
    <section className="py-16 md:py-24 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-tb-primary-400 text-sm font-bold uppercase tracking-widest mb-3">
            Our Campus
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-tb-heading mb-4">What We Offer</h2>
          <p className="text-tb-body text-lg max-w-2xl mx-auto leading-relaxed">
            Our campus is designed to provide everything students need for a complete and enriching educational experience.
          </p>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {facilities.map((facility, idx) => {
            // features[0] = iconify icon name, features[1] = hex color
            const iconName = facility.features?.[0] ?? 'lucide:school'
            const color = facility.features?.[1] ?? '#cba73d'
            const bgColor = `${color}18`

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: bgColor }}
                >
                  <Icon
                    icon={iconName}
                    className="w-6 h-6"
                    style={{ color }}
                  />
                </div>
                <h5 className="text-base font-semibold text-tb-heading mb-2">
                  {facility.name}
                </h5>
                <p className="text-tb-body text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            )
          })}
        </StaggerChildren>
      </div>
    </section>
  )
}
