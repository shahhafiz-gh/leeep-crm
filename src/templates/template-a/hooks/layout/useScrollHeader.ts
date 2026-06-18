'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to handle header scroll behavior — Template A (IEIskp).
 * Returns whether the header should be "scrolled" (shrunk/shadowed).
 */
export function useScrollHeader(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { isScrolled }
}
