'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { SchoolData } from '@/types/school.types'
import ScrollReveal from '@/shared/animations/scroll-reveal'
import StaggerChildren from '@/shared/animations/stagger-children'
import ImagePlaceholder from '@/templates/template-a/components/common/ImagePlaceholder'

export default function AboutSection({ data }: { data: SchoolData }) {
  return (
    <section className="py-10 md:py-20 bg-ta-surface overflow-hidden">
      <div className="container my-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative">
          {/* Left Column: Image with floating badges */}
          <div className="relative w-full max-w-[400px] md:max-w-none mx-auto aspect-square md:h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-ta-primary/5 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-80 z-0 scale-110 animate-pulse" />

            <div className="relative z-10 w-full h-full rounded-[30%_60%_70%_30%/60%_30%_70%_40%] bg-ta-surface-dim overflow-hidden shadow-inner border-4 border-ta-surface">
              {data.about.image ? (
                <Image
                  src={data.about.image}
                  alt={`Students at ${data.name}`}
                  fill
                  className="object-cover"
                  data-edit-img="about.image"
                />
              ) : (
                <ImagePlaceholder label="Add about image" editPath="about.image" />
              )}
            </div>

            {/* Floating Badge (first) */}
            {data.about.badges?.[0] && (
              <ScrollReveal direction="left" delay={0.2} className="absolute top-4 -left-2 md:top-8 md:-left-8 z-20">
                <div className="bg-ta-tertiary-container text-ta-on-tertiary-container px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ta-on-tertiary-container/10 flex items-center justify-center">
                    <Icon icon={data.about.badges[0].icon ?? 'lucide:landmark'} className="w-5 h-5" data-edit-icon="about.badges.0.icon" />
                  </div>
                  <div>
                    <div className="font-bold text-sm" data-edit="about.badges.0.label">{data.about.badges[0].label}</div>
                    {data.about.badges[0].sublabel && (
                      <div className="text-xs opacity-80" data-edit="about.badges.0.sublabel">{data.about.badges[0].sublabel}</div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Floating Badge (second) */}
            {data.about.badges?.[1] && (
              <ScrollReveal direction="right" delay={0.4} className="absolute bottom-4 -right-2 md:bottom-8 md:-right-8 z-20">
                <div className="bg-ta-secondary-container text-ta-on-secondary-container px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ta-on-secondary-container/10 flex items-center justify-center">
                    <Icon icon={data.about.badges[1].icon ?? 'lucide:shield-check'} className="w-5 h-5" data-edit-icon="about.badges.1.icon" />
                  </div>
                  <div>
                    <div className="font-bold text-sm" data-edit="about.badges.1.label">{data.about.badges[1].label}</div>
                    {data.about.badges[1].sublabel && (
                      <div className="text-xs opacity-80" data-edit="about.badges.1.sublabel">{data.about.badges[1].sublabel}</div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col items-start gap-6 md:gap-8 relative z-10 px-4 md:px-0">
            <div className="flex items-center gap-2">
              <span data-edit="about.title" className="bg-ta-primary/10 text-ta-primary font-bold text-ta-label-md px-4 py-1 rounded-full uppercase tracking-wider">
                {data.about.title || 'About Us'}
              </span>
              <Icon icon="lucide:stars" className="text-ta-primary text-xl" />
            </div>

            <h2 data-edit="about.subtitle" className="font-(family-name:--font-ta-h2) text-3xl md:text-ta-h2 text-ta-on-surface m-0 leading-tight">
              {data.about.subtitle || 'Nurturing Excellence in Education'}
            </h2>

            <p data-edit="about.description" className="font-(family-name:--font-ta-body-lg) text-ta-body-lg text-ta-on-surface-variant leading-relaxed">
              {data.about.description}
            </p>

            {/* Mission Points */}
            {data.about.mission && (
              <StaggerChildren stagger={0.1} className="flex flex-col gap-4 w-full">
                {data.about.mission.map((point) => (
                  <div
                    key={point.title}
                    className="flex gap-4 p-4 rounded-2xl bg-ta-surface-container-low border border-ta-outline-variant/30 hover:border-ta-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-ta-primary/10 flex items-center justify-center shrink-0">
                      <Icon icon="lucide:check" className="w-5 h-5 text-ta-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-ta-on-surface text-sm mb-1">{point.title}</h4>
                      <p className="text-ta-on-surface-variant text-sm">{point.description}</p>
                    </div>
                  </div>
                ))}
              </StaggerChildren>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <Link href="/about">
                <button className="inline-flex items-center justify-center gap-2 cursor-pointer bg-ta-primary-container text-ta-on-primary font-(family-name:--font-ta-label-md) rounded-full shadow-lg hover:shadow-ta-primary/20 hover:scale-105 active:scale-95 transition-all duration-200 px-6 py-3 font-bold">
                  Learn More About Us
                  <Icon icon="lucide:arrow-right" className="text-lg" />
                </button>
              </Link>

              {data.contact?.phone?.[0] && (
                <div className="flex items-center gap-3 text-ta-on-surface-variant group cursor-pointer">
                  <div className="bg-ta-surface-container-high p-3 rounded-full group-hover:bg-ta-primary/10 transition-colors">
                    <Icon icon="lucide:phone" className="text-ta-primary" />
                  </div>
                  <a
                    href={`tel:${data.contact?.phone?.[0]}`}
                    className="font-(family-name:--font-ta-label-md) text-ta-label-md font-bold text-ta-on-surface hover:text-ta-primary transition-colors"
                  >
                    {data.contact?.phone?.[0]}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
