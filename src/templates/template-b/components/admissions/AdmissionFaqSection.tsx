import { Icon } from '@iconify/react'
import type { SchoolData } from '@/types/school.types'
import ScrollReveal from '@/shared/animations/scroll-reveal'

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-tb-border rounded-xl bg-white [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-5 text-tb-heading font-bold">
        {question}
        <span className="shrink-0 text-tb-primary-400 transition duration-300 group-open:-rotate-180">
          <Icon icon="lucide:chevron-down" className="text-xl" />
        </span>
      </summary>
      <p className="px-5 pb-5 text-tb-body leading-relaxed">{answer}</p>
    </details>
  )
}

export default function AdmissionFaqSection({ data }: { data: SchoolData }) {
  const faqs = data.admissions.faqs ?? []
  if (faqs.length === 0) return null

  const mid = Math.ceil(faqs.length / 2)
  const left = faqs.slice(0, mid)
  const right = faqs.slice(mid)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-tb-primary-400 text-sm font-bold uppercase tracking-widest mb-3">Got Questions?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-tb-heading mb-4">Frequently Asked Questions</h2>
          <p className="text-tb-body text-lg max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our admission process.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            {left.map((faq) => <FaqItem key={faq.question} {...faq} />)}
          </div>
          <div className="space-y-4">
            {right.map((faq) => <FaqItem key={faq.question} {...faq} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
