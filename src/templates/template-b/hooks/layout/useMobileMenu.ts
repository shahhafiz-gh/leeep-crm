'use client'

import { useUIStore } from '@/store/ui-store'

/**
 * Hook for mobile menu logic — Template B (Kashmir-Cambridge).
 * Delegates to shared Zustand store.
 */
export function useMobileMenu() {
  const isOpen = useUIStore((s) => s.isMobileMenuOpen)
  const toggle = useUIStore((s) => s.toggleMobileMenu)
  const close = useUIStore((s) => s.closeMobileMenu)
  const open = useUIStore((s) => s.openMobileMenu)

  return { isOpen, toggle, close, open }
}
