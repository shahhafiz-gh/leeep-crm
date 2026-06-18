import type { Metadata } from 'next'
import { Nunito, DM_Sans, Hind, Geist, Inter, Rufina } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const hind = Hind({
  variable: '--font-hind',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const rufina = Rufina({
  variable: '--font-rufina',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'LEEEP CMS',
  description: 'Multi-tenant school website platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${dmSans.variable} ${hind.variable} ${inter.variable} ${rufina.variable} ${geist.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
