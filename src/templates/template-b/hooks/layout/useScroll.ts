'use client'

import { useState, useEffect } from 'react'

/**
 * Hook for generic scroll tracking — Template B (Kashmir-Cambridge).
 * Returns current scroll position and direction.
 */
export function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const current = window.scrollY
      setDirection(current > lastScroll ? 'down' : 'up')
      setScrollY(current)
      lastScroll = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, direction }
}
