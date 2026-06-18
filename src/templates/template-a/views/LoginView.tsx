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

/** Template A — Login Page View (IEIskp style, MD3 Green) */
export default function LoginView({ data }: { data: SchoolData }) {
  const portalLinks = data.portalLinks ?? []

  return (
    <div className="font-(family-name:--font-ta-body-md) bg-ta-background text-ta-on-background min-h-screen">
      <div className="w-full max-w-[1100px] mx-auto px-4 mt-20 py-12 md:py-16">
        {/* Page heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="font-(family-name:--font-ta-h2) text-3xl md:text-4xl font-bold text-ta-primary tracking-tight">
            Sign In
          </h1>
          <p className="mt-3 text-ta-on-surface-variant text-base">
            Access the {data.name} student &amp; faculty portal
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left — Main Login Card (62%) */}
          <div className="w-full md:w-[62%]">
            <div className="bg-ta-surface-container-lowest rounded-[28px] overflow-hidden border border-ta-outline-variant shadow-sm flex flex-col h-full">
              {/* Header */}
              <div className="bg-ta-primary-container p-6 md:p-8 border-b border-ta-outline-variant">
                <div className="inline-block bg-ta-primary-fixed text-ta-on-primary-fixed px-4 py-1.5 rounded-full font-(family-name:--font-ta-label-md) text-(length:--text-ta-label-md) font-bold mb-4">
                  LOGIN WITH MOBILE APP
                </div>
                <h1 className="font-(family-name:--font-ta-h2) text-2xl md:text-3xl font-bold text-ta-on-primary mb-3 leading-tight">
                  Download the LeeeP App &amp; Sign In With Your School Details
                </h1>
                <p className="text-ta-on-primary/90 text-base">
                  We have moved our primary student portal to the mobile application for enhanced security. Please
                  download the app and use the one-time passcode (OTP) sent to your registered email to log in.
                </p>
              </div>

              {/* App download */}
              <div className="p-6 md:p-8">
                <h2 className="font-(family-name:--font-ta-label-md) text-(length:--text-ta-label-md) font-bold text-ta-on-surface-variant mb-4 tracking-wider">
                  STEP 1 — CHOOSE YOUR DEVICE
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  {APP_LINKS.map((app) => (
                    <Link
                      key={app.label}
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-ta-on-surface text-ta-surface-container-lowest rounded-xl p-4 flex items-center gap-3 hover:bg-ta-primary transition-colors duration-300"
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
              <div className="mx-6 md:mx-8 mb-6 md:mb-8 bg-ta-primary/5 border-2 border-dashed border-ta-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5 border-b border-ta-primary/20 pb-3">
                  <Icon icon="lucide:sparkles" className="text-ta-primary text-xl" />
                  <h3 className="font-(family-name:--font-ta-h3) text-xl font-bold text-ta-on-surface">
                    Follow These Steps
                  </h3>
                </div>
                <ul className="space-y-4">
                  {STEPS.map((step, i) => (
                    <li key={step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-ta-primary text-ta-on-primary flex items-center justify-center font-bold text-sm shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-base text-ta-on-surface-variant pt-1">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right — Sidebar (35%) */}
          <aside className="w-full md:w-[35%] flex flex-col gap-6">
            {portalLinks.length > 0 && (
              <div className="bg-ta-surface-container-lowest border border-ta-outline-variant rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Icon icon="lucide:shield-check" className="text-ta-primary text-xl" />
                  <h3 className="font-(family-name:--font-ta-h3) text-xl font-bold text-ta-on-surface">
                    Administrator Portal
                  </h3>
                </div>
                <p className="text-base text-ta-on-surface-variant mb-5">
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
                      className={`flex items-center justify-between px-4 py-3 font-(family-name:--font-ta-label-md) text-(length:--text-ta-label-md) font-bold rounded-lg transition-colors duration-300 group ${
                        link.variant === 'primary'
                          ? 'bg-ta-primary text-ta-on-primary hover:bg-ta-primary-container'
                          : 'bg-ta-on-surface text-ta-surface-container-lowest hover:bg-ta-primary'
                      }`}
                    >
                      <span>{link.label}</span>
                      <Icon icon="lucide:arrow-right" className="text-lg group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-ta-surface-container-lowest border border-ta-outline-variant rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Icon icon="lucide:info" className="text-ta-primary text-xl" />
                <h3 className="font-(family-name:--font-ta-h3) text-xl font-bold text-ta-on-surface">Why the move?</h3>
              </div>
              <p className="text-base text-ta-on-surface-variant">
                The transition to our mobile application ensures a more secure, streamlined, and integrated experience
                for all {data.name} students and faculty, leveraging modern security features.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 text-ta-on-surface-variant hover:text-ta-primary text-sm font-(family-name:--font-ta-label-md) transition-colors"
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
