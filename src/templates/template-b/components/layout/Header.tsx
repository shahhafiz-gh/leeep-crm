'use client'

import type { SchoolData, PageType } from '@/types/school.types'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation'
import { useHeader } from '@/shared/hooks/useHeader'
import ImagePlaceholder from '@/templates/template-b/components/common/ImagePlaceholder'

/** Template B — Header (Kashmir-Cambridge style) */
export default function Header({ data, page }: { data: SchoolData; page: PageType }) {
  const pathname = usePathname()
  const isHomePage = page === 'home'

  const {
    isSticky,
    isVisible,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu
  } = useHeader(pathname)

  const isDark = !isHomePage || isSticky

  return (
    <>
      <header
        className={`left-0 w-full z-50 transition-all duration-300 ${isSticky
            ? `fixed top-0 bg-tb-background shadow-sm border-b border-tb-line ${isVisible ? 'translate-y-0' : '-translate-y-full'}`
            : 'absolute top-0 bg-transparent border-b border-transparent translate-y-0'
          }`}
      >
        <div className="w-full mx-auto px-4 lg:px-8 xl:px-24">
          <div className="flex justify-between items-center py-2 lg:py-0">

            <Link href="/" className="flex items-center shrink-0">
              <div className="flex items-center gap-3 py-4">
                {data.logo ? (
                  <Image
                    src={data.logo}
                    alt={data.name}
                    width={75}
                    height={75}
                    className="h-[55px] w-auto object-contain"
                  />
                ) : (
                  <ImagePlaceholder label="Logo" icon="lucide:image-plus" className="w-14 h-14 rounded-full shrink-0 gap-0.5" />
                )}
                <div className="flex flex-col ml-1 font-(family-name:--font-inter)">
                  <span className={`font-bold text-[19px] leading-tight uppercase tracking-normal ${isDark ? 'text-tb-heading' : 'text-tb-background'}`}>
                    {data.name.split(' ').slice(0, 2).join(' ')}
                  </span>
                  {data.name.split(' ').slice(2).join(' ') && (
                    <span className={`font-bold text-[13px] leading-tight uppercase tracking-wider ${isDark ? 'text-tb-heading' : 'text-tb-background'}`}>
                      {data.name.split(' ').slice(2).join(' ')}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-9">
              {data.navigation.map((item) => {
                const isActive = pathname === item.href || (pathname === '/' && item.href === '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-medium text-[15px] uppercase font-(family-name:--font-inter) transition-colors duration-300 py-[37px] ${isDark
                      ? isActive ? 'text-tb-primary-400' : 'text-tb-heading hover:text-tb-primary-400'
                      : isActive ? 'text-tb-primary-400' : 'text-tb-background hover:text-tb-primary-400'
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Login */}
            <Link
              href="/login"
              className="hidden lg:inline-flex px-10 py-[14px] rounded-full font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md bg-tb-primary-400 text-tb-background hover:bg-tb-primary-500 font-(family-name:--font-inter) tracking-wide"
            >
              Login
            </Link>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-3">
              <Link
                href="/login"
                className={`inline-flex px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isDark
                  ? 'bg-tb-primary-400 text-tb-background hover:bg-tb-primary-500'
                  : 'bg-tb-background text-tb-primary-400 hover:bg-tb-light-white'
                  }`}
              >
                Login
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-1.5 focus:outline-none"
                aria-label="Toggle Menu"
              >
                <Icon
                  icon={isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'}
                  className={`w-7 h-7 ${isDark ? 'text-tb-heading' : 'text-tb-background'}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-tb-background shadow-xl z-50 border-t border-tb-line">
            <nav className="flex flex-col py-4 px-6">
              <ul className="flex flex-col gap-2">
                {data.navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href} className="border-b border-tb-line last:border-none">
                      <Link
                        href={item.href}
                        className={`block py-4 text-[15px] uppercase font-(family-name:--font-inter) font-medium transition-colors ${isActive ? 'text-tb-primary-400' : 'text-tb-heading hover:text-tb-primary-400'
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
