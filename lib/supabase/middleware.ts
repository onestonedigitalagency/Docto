import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the session — important for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect doctor and patient routes
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  const isDoctorRoute = request.nextUrl.pathname.startsWith('/doctor')
  const isPatientRoute = request.nextUrl.pathname.startsWith('/patient')

  if (!user && (isDoctorRoute || isPatientRoute)) {
    // TEMPORARY BYPASS: Allow access to doctor/patient routes without auth for Phase 3 dev
    // const url = request.nextUrl.clone()
    // url.pathname = '/login'
    // url.searchParams.set('redirect', request.nextUrl.pathname)
    // return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/doctor/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
