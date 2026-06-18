'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import type { SchoolData } from '@/types/school.types'
import { useScrollHeader } from '@/templates/template-a/hooks/layout/useScrollHeader'
import ImagePlaceholder from '@/templates/template-a/components/common/ImagePlaceholder'

export default function Header({ data }: { data: SchoolData }) {
  const pathname = usePathname()
  const { isScrolled: scrolled } = useScrollHeader(20)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      className={`bg-ta-surface-bright/90 backdrop-blur-md text-ta-primary font-(family-name:--font-ta-label-md) text-(length:--text-ta-label-md) fixed top-0 w-full z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="flex justify-between container items-center mx-auto px-6 h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-(--spacing-ta-xs) font-(family-name:--font-ta-h3) text-(length:--text-ta-h3) text-ta-on-surface tracking-tighter"
        >
          {data.logo ? (
            <Image
              src={data.logo}
              alt={`${data.name} Logo`}
              width={60}
              height={60}
              className="rounded-full object-contain"
            />
          ) : (
            <ImagePlaceholder label="Logo" icon="lucide:image-plus" className="w-15 h-15 rounded-full shrink-0 gap-0.5" />
          )}
          <span className="hidden lg:block font-bold text-xl text-center tracking-tight text-ta-primary">
            {data.name.split(' ').slice(0, 2).join(' ')}
            <span className="block">{data.name.split(' ').slice(2).join(' ')}</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-(--spacing-ta-gutter)">
          {data.navigation.map((link) => {
            const isActive = pathname === link.href || (pathname === '/' && link.label === 'Home')
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative transition-all duration-300 ${
                    isActive
                      ? 'text-ta-primary-container border-b-2 border-ta-primary-container pb-1'
                      : 'text-ta-on-surface-variant hover:text-ta-primary-container hover:scale-105'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center gap-2 cursor-pointer bg-ta-primary-container text-ta-on-primary font-(family-name:--font-ta-label-md) text-(length:--text-ta-label-md) rounded-full shadow-[0_8px_16px_rgba(0,107,32,0.2)] hover:scale-105 active:scale-95 transition-all duration-200 px-6 py-3"
          >
            Apply Now
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 cursor-pointer bg-ta-primary-container text-ta-on-primary font-(family-name:--font-ta-label-md) text-(length:--text-ta-label-md) rounded-full shadow-[0_8px_16px_rgba(0,107,32,0.2)] hover:scale-105 active:scale-95 transition-all duration-200 px-6 py-3"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-ta-on-surface p-2"
          aria-label="Toggle menu"
        >
          <Icon icon={mobileMenuOpen ? 'lucide:x' : 'lucide:menu'} className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ta-surface-dim bg-ta-surface-bright/95 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col p-4 gap-2">
            {data.navigation.map((link) => {
              const isActive = pathname === link.href || (pathname === '/' && link.label === 'Home')
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-(family-name:--font-ta-label-md) text-(length:--text-ta-label-md) transition-colors ${
                      isActive
                        ? 'bg-ta-secondary-container text-ta-on-secondary-container'
                        : 'text-ta-on-surface-variant hover:bg-ta-surface-container-high'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-2">
              <Link
                href="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-ta-primary-container text-ta-on-primary rounded-full py-3 font-bold hover:scale-105 active:scale-95 transition-all"
              >
                Apply Now
              </Link>
            </li>
            <li className="pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-ta-primary-container text-ta-on-primary rounded-full py-3 font-bold hover:scale-105 active:scale-95 transition-all"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
