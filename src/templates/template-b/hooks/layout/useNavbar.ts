'use client'

import { useState, useEffect } from 'react'

/**
 * Hook for navbar scroll behavior — Template B (Kashmir-Cambridge).
 * Returns scroll state and active section for nav highlighting.
 */
export function useNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { isScrolled, activeSection, setActiveSection }
}
