import type { SchoolData } from '@/types/school.types'
import ScrollReveal from '@/shared/animations/scroll-reveal'

/** Template B — Gallery Section (Kashmir-Cambridge style) */
export default function GallerySection({ data }: { data: SchoolData }) {
  const images = data.gallery?.images ?? []
  if (images.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-tb-primary-400 text-sm font-bold uppercase tracking-widest mb-3">Gallery</p>
          <h2 data-edit="gallery.title" className="text-3xl md:text-4xl font-bold text-tb-heading mb-4">
            {data.gallery?.title || 'Life at Our Campus'}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/3]'
              }`}
            >
              {image.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.src}
                  alt={image.alt}
                  data-edit-img={`gallery.images.${i}.src`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                  No image
                </div>
              )}
              {image.category && (
                <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.category}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
