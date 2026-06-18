'use client'

import { Children, isValidElement, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/shared/utils/cn'

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  /** Stagger delay between each child in seconds */
  stagger?: number
  /** Duration of each child's animation */
  duration?: number
  /** Initial delay before the stagger starts */
  delay?: number
}

/**
 * Stagger animation — children animate in sequentially when scrolled into view.
 * Framer Motion implementation (replaces the GSAP version).
 */
export default function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  duration = 0.5,
  delay = 0,
}: StaggerChildrenProps) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration, ease: 'easeOut' } },
  }

  return (
    <motion.div
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {Children.map(children, (child, i) =>
        isValidElement(child) ? (
          <motion.div key={i} variants={item}>
            {child}
          </motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  )
}
