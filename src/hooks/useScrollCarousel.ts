import { useState, useRef, useCallback, useEffect } from 'react'

export function useScrollCarousel<T extends HTMLElement>(itemCount: number) {
  const scrollRef = useRef<T>(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollTo = useCallback((idx: number) => {
    const container = scrollRef.current
    if (!container) return
    const slide = container.querySelector('[data-slide]') as HTMLElement
    if (!slide) return
    
    // gap-6 is 24px in Tailwind
    const itemWidth = slide.offsetWidth + 24
    container.scrollTo({ left: idx * itemWidth, behavior: 'smooth' })
  }, [])

  const prev = useCallback(() => scrollTo(Math.max(0, currentIdx - 1)), [currentIdx, scrollTo])
  const next = useCallback(() => scrollTo(currentIdx + 1), [currentIdx, scrollTo])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const slide = container.querySelector('[data-slide]') as HTMLElement
      if (!slide) return

      const itemWidth = slide.offsetWidth + 24 // 24px is gap-6
      const newIdx = Math.round(container.scrollLeft / itemWidth)
      
      setCurrentIdx(newIdx)

      // Calculate if we can scroll further
      const isAtStart = container.scrollLeft <= 5
      const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 5
      
      setCanScrollPrev(!isAtStart)
      setCanScrollNext(!isAtEnd && itemCount > 0)
    }

    // Use passive listener for performance
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    
    // Initial calculation
    // Timeout ensures DOM has painted before calculation
    const initTimer = setTimeout(handleScroll, 50)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      clearTimeout(initTimer)
    }
  }, [itemCount])

  return { scrollRef, currentIdx, scrollTo, prev, next, canScrollPrev, canScrollNext }
}
