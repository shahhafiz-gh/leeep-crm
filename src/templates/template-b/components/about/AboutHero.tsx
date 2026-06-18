import type { SchoolData } from '@/types/school.types'
import { Icon } from '@iconify/react'
import ScrollReveal from '@/shared/animations/scroll-reveal'

/** Template B — About Hero (full-bleed image with overlay, KCS style) */
export default function AboutHero({ data }: { data: SchoolData }) {
  const bg = data.about.image ?? data.hero.slides[0]?.image

  return (
    <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
      {/* Image background */}
      {bg ? (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bg})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-tb-primary-500 z-0" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-[1]" />

      {/* Content */}
      <ScrollReveal className="relative z-[2] text-center px-4 max-w-4xl mt-10">
        <p className="text-tb-background flex items-center justify-center gap-2 mb-5 font-sans tracking-widest text-sm uppercase opacity-90">
          <Icon icon="lucide:graduation-cap" className="w-5 h-5" />
          {data.about.subtitle ?? 'Dedicated to Excellence'}
        </p>

        <h1 className="text-tb-background font-medium text-3xl md:text-4xl lg:text-6xl leading-tight uppercase mb-6">
          About {data.name}
        </h1>

        <p className="text-tb-background/85 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
          {data.about.description}
        </p>
      </ScrollReveal>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] animate-bounce">
        <Icon icon="lucide:chevron-down" className="w-6 h-6 text-tb-background/70" />
      </div>
    </section>
  )
}
