import type { SchoolData } from '@/types/school.types'
import { Icon } from '@iconify/react'
import ScrollReveal from '@/shared/animations/scroll-reveal'

/** Template B — Hero Section (video background, KCS style) */
export default function HeroSection({ data }: { data: SchoolData }) {
  const slide = data.hero.slides[0]
  if (!slide) return null

  return (
    <section
      id="home"
      className="relative h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Video or Image Background */}
      {slide.video ? (
        <video
          autoPlay
          muted
          playsInline
          className="relative inset-0 w-full h-full object-cover z-0"
        >
          <source src={slide.video} type="video/mp4" />
          {/* Fallback image if video fails */}
          <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${slide.image})` }}
          data-edit-img="hero.slides.0.image"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-1" />

      {/* Content */}
      <ScrollReveal className="absolute z-1 bottom-20 text-center px-4 max-w-5xl">
        {slide.subtitle && (
          <p className="text-tb-background flex items-center justify-center gap-2 mb-6 font-sans tracking-widest text-sm uppercase opacity-90">
            <Icon icon="lucide:graduation-cap" className="w-5 h-5" />
            <span data-edit="hero.slides.0.subtitle">{slide.subtitle}</span>
          </p>
        )}

        <h1 data-edit="hero.slides.0.title" className="text-tb-background font-medium text-3xl md:text-4xl lg:text-6xl leading-tight uppercase mb-6">
          {slide.title}
        </h1>

        {slide.description && (
          <p data-edit="hero.slides.0.description" className="text-tb-background/85 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed mb-10">
            {slide.description}
          </p>
        )}

        {slide.cta && (
          <a
            href={slide.cta.href}
            data-edit-link="hero.slides.0.cta.href"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-tb-primary-400 text-tb-background font-semibold rounded-full hover:bg-tb-primary-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span data-edit="hero.slides.0.cta.label">{slide.cta.label}</span>
            <Icon icon="lucide:arrow-right" className="w-4 h-4" />
          </a>
        )}
      </ScrollReveal>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Icon icon="lucide:chevron-down" className="w-6 h-6 text-tb-background/70" />
      </div>
    </section>
  )
}
