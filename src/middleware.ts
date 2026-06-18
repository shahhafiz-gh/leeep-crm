import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''



  let subdomain = ''

  if (hostname.includes('localhost')) {
    const hostWithoutPort = hostname.split(':')[0]
    const parts = hostWithoutPort.split('.localhost')[0].split('.')
    subdomain = parts[parts.length - 1] === 'localhost'
      ? (process.env.NEXT_PUBLIC_DEV_SUBDOMAIN ?? 'iei')
      : parts[parts.length - 1]
  } else {
    const platformDomain = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN ?? 'schools.leeep.in'
    subdomain = hostname.replace(`.${platformDomain}`, '').split('.')[0]
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-school-subdomain', subdomain)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt).*)'],
}
