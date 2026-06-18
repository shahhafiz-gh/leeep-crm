import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { SchoolData } from '@/types/school.types'

/** Universal LeeeP mobile app — same product across every school. */
const APP_LINKS = [
  {
    icon: 'ri:apple-fill',
    caption: 'Download on the',
    label: 'App Store',
    href: 'https://apps.apple.com/in/app/leeep/id6741331464',
  },
  {
    icon: 'ri:android-fill',
    caption: 'GET IT ON',
    label: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=in.leeep.app',
  },
]

const STEPS = [
  "Install the LeeeP App from your device's app store.",
  'Open the app and select “Institutional Login”.',
  'Enter your school email address to receive an OTP.',
  'Input the 6-digit code to access your academic dashboard.',
]

/** Template B — Login Page View (Kashmir-Cambridge style, Gold / Navy) */
export default function LoginView({ data }: { data: SchoolData }) {
  const portalLinks = data.portalLinks ?? []

  return (
    <div className="font-(family-name:--font-inter) bg-tb-light-white text-tb-foreground min-h-screen">
      <div className="w-full max-w-[1100px] mx-auto px-4 pt-32 md:pt-44 pb-12 md:pb-16">
        {/* Page heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-tb-secondary uppercase tracking-tight">Sign In</h1>
          <p className="mt-3 text-tb-body text-base">Access the {data.name} student &amp; faculty portal</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left — Main Login Card (62%) */}
          <div className="w-full md:w-[62%]">
            <div className="bg-white rounded-[28px] overflow-hidden border border-tb-border shadow-sm flex flex-col h-full">
              {/* Header */}
              <div className="bg-tb-primary-400 p-6 md:p-8 border-b border-tb-border">
                <div className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                  LOGIN WITH MOBILE APP
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                  Download the LeeeP App &amp; Sign In With Your School Details
                </h3>
                <p className="text-base text-white/95 font-(family-name:--font-inter)">
                  We have moved our primary student portal to the mobile application for enhanced security. Please
                  download the app and use the one-time passcode (OTP) sent to your registered email to log in.
                </p>
              </div>

              {/* App download */}
              <div className="p-6 md:p-8">
                <h2 className="text-sm font-bold text-tb-body mb-4 tracking-wider uppercase font-(family-name:--font-inter)">
                  STEP 1 — CHOOSE YOUR DEVICE
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  {APP_LINKS.map((app) => (
                    <Link
                      key={app.label}
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-tb-foreground text-white rounded-xl p-4 flex items-center gap-3 hover:bg-tb-primary-400 transition-colors duration-300"
                    >
                      <Icon icon={app.icon} className="text-[32px]" />
                      <div className="flex flex-col">
                        <span className="text-xs opacity-80">{app.caption}</span>
                        <span className="text-[18px] leading-tight font-bold">{app.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="mx-6 md:mx-8 mb-6 md:mb-8 bg-tb-primary-400/5 border-2 border-dashed border-tb-primary-400/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5 border-b border-tb-primary-400/20 pb-3">
                  <Icon icon="lucide:sparkles" className="text-tb-primary-400 text-xl" />
                  <h3 className="text-xl font-bold text-tb-heading">Follow These Steps</h3>
                </div>
                <ul className="space-y-4">
                  {STEPS.map((step, i) => (
                    <li key={step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-tb-primary-400 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-base text-tb-body pt-1 font-(family-name:--font-inter)">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right — Sidebar (35%) */}
          <aside className="w-full md:w-[35%] flex flex-col gap-6">
            {portalLinks.length > 0 && (
              <div className="bg-white border border-tb-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Icon icon="lucide:shield-check" className="text-tb-primary-400 text-xl" />
                  <h3 className="text-xl font-bold text-tb-heading">Administrator Portal</h3>
                </div>
                <p className="text-base text-tb-body mb-5 font-(family-name:--font-inter)">
                  Are you a school administrator or faculty member? Access the backend system to manage institutional
                  data.
                </p>
                <div className="flex flex-col gap-3">
                  {portalLinks.map((link) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between px-4 py-3 font-semibold text-sm rounded-lg transition-colors duration-300 group font-(family-name:--font-inter) ${
                        link.variant === 'dark'
                          ? 'bg-tb-foreground text-white hover:bg-tb-foreground/90'
                          : 'bg-tb-primary-400 text-white hover:bg-tb-primary-500'
                      }`}
                    >
                      <span>{link.label}</span>
                      <Icon icon="lucide:arrow-right" className="text-lg group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white border border-tb-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Icon icon="lucide:info" className="text-tb-primary-400 text-xl" />
                <h3 className="text-xl font-bold text-tb-heading">Why the move?</h3>
              </div>
              <p className="text-base text-tb-body leading-relaxed font-(family-name:--font-inter)">
                The transition to our mobile application ensures a more secure, streamlined, and integrated experience
                for all {data.name} students and faculty, leveraging modern security features.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 text-tb-body hover:text-tb-primary-400 text-sm font-semibold transition-colors font-(family-name:--font-inter)"
            >
              <Icon icon="lucide:arrow-left" className="text-base" />
              Back to {data.name.split(' ')[0]} website
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
