import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimit = new Map<string, { count: number; lastReset: number }>()

const WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 20 // per minute

export function middleware(request: NextRequest) {
  // Only rate limit API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
    const now = Date.now()
    
    const record = rateLimit.get(ip)
    
    if (!record || now - record.lastReset > WINDOW) {
      rateLimit.set(ip, { count: 1, lastReset: now })
    } else {
      record.count++
      
      if (record.count > MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait a minute.' },
          { status: 429 }
        )
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}