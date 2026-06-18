'use client'

import { useState, useEffect, useRef } from 'react'

export function useHeader(pathname: string) {
  const [isSticky, setIsSticky] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsSticky(currentScrollY > 100)

      if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true)
      }

      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  return { isSticky, isVisible, isMobileMenuOpen, setIsMobileMenuOpen, toggleMobileMenu }
}
