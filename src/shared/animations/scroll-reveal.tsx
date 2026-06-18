'use client'

import { Children, isValidElement, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/shared/utils/cn'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Animation direction: 'up' | 'down' | 'left' | 'right' */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Duration in seconds */
  duration?: number
  /** Delay in seconds */
  delay?: number
  /** Distance to travel in px */
  distance?: number
  /** Stagger delay for multiple children (seconds) */
  stagger?: number
}

function offset(direction: ScrollRevealProps['direction'], distance: number) {
  switch (direction) {
    case 'up': return { y: distance }
    case 'down': return { y: -distance }
    case 'left': return { x: distance }
    case 'right': return { x: -distance }
    default: return { y: distance }
  }
}

/**
 * Reveal animation — fades + slides elements into view when they enter the viewport.
 * Framer Motion implementation.
 */
export default function ScrollReveal({
  children,
  className,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance = 40,
  stagger = 0,
}: ScrollRevealProps) {
  const hidden = { opacity: 0, ...offset(direction, distance) }
  const visible = { opacity: 1, x: 0, y: 0 }
  const viewport = { once: true, margin: '0px 0px -10% 0px' } as const

  if (stagger) {
    const container: Variants = {
      hidden: {},
      visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }
    const item: Variants = {
      hidden,
      visible: { ...visible, transition: { duration, ease: 'easeOut' } },
    }

    return (
      <motion.div
        className={cn(className)}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
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

  return (
    <motion.div
      className={cn(className)}
      initial={hidden}
      whileInView={visible}
      viewport={viewport}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
