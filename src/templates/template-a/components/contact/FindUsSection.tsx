'use client'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import type { SchoolData } from '@/types/school.types'

export default function FindUsSection({ data }: { data: SchoolData }) {
  const { contact } = data
  const landmarks = contact.landmarks ?? []
  const reachInfo = contact.transport ?? []
  const visitingHours = contact.visitingHours ?? []

  return (
    <section className="bg-ta-surface-container-lowest mb-24 py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-(family-name:--font-ta-h2) text-3xl md:text-[40px] text-ta-on-surface mb-12 text-center md:text-left tracking-tight"
        >
          Find Us Easily
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] items-stretch rounded-3xl overflow-hidden border border-ta-outline-variant shadow-sm">
          {/* Map */}
          <div className="w-full h-[400px] lg:h-auto min-h-[480px] bg-ta-surface-container">
            {contact.mapEmbedUrl && (
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${data.name} location`}
              />
            )}
          </div>

          {/* Info panel */}
          <div className="bg-ta-surface-container-low p-8 lg:p-12 flex flex-col gap-10">
            {/* Address */}
            <div>
              <h3 className="font-(family-name:--font-ta-h3) text-xl font-bold text-ta-primary flex items-center mb-4">
                <Icon icon="lucide:map-pin" className="mr-3 text-2xl" />
                School Address
              </h3>
              <p className="font-(family-name:--font-ta-body-md) text-ta-on-surface-variant leading-relaxed">
                {contact.address}
              </p>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-ta-primary font-bold hover:underline inline-flex items-center text-ta-label-md"
              >
                Open in Google Maps
                <Icon icon="lucide:external-link" className="ml-2 text-sm" />
              </a>
            </div>

            {/* Landmarks & How To Reach */}
            {(landmarks.length > 0 || reachInfo.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
                {landmarks.length > 0 && (
                  <div>
                    <h3 className="font-(family-name:--font-ta-h3) text-lg font-bold text-ta-primary mb-4">Nearby Landmarks</h3>
                    <div className="space-y-3">
                      {landmarks.map((item) => (
                        <div key={item.label} className="flex items-center gap-3 text-ta-on-surface-variant">
                          <Icon icon={item.icon ?? 'lucide:map-pin'} className="text-ta-outline" />
                          <span className="font-(family-name:--font-ta-body-md)">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {reachInfo.length > 0 && (
                  <div>
                    <h3 className="font-(family-name:--font-ta-h3) text-lg font-bold text-ta-primary mb-4">How To Reach</h3>
                    <div className="space-y-3">
                      {reachInfo.map((item) => (
                        <div key={item.type} className="flex items-center">
                          <span className="bg-ta-secondary-container text-ta-on-secondary-container px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mr-3 min-w-[60px] text-center">
                            {item.type}
                          </span>
                          <span className="text-ta-body-md text-ta-on-surface-variant">{item.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Visiting Hours */}
            {visitingHours.length > 0 && (
              <div>
                <h3 className="font-(family-name:--font-ta-h3) text-lg font-bold text-ta-primary mb-4">Visiting Hours</h3>
                <div className="space-y-3">
                  {visitingHours.map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-ta-outline-variant/30">
                      <span className="text-ta-body-md text-ta-on-surface-variant">{item.label}</span>
                      <span className="text-ta-body-md font-bold text-ta-on-surface">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
