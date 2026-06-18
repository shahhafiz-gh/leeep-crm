import { create } from 'zustand'

interface UIState {
  /* ── Mobile Menu ── */
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void

  /* ── Generic Modal ── */
  activeModal: string | null
  openModal: (id: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  // Mobile menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Modal
  activeModal: null,
  openModal: (id: string) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}))
