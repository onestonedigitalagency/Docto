'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { setSession } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // TODO: Implement actual Supabase auth
    // const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    // Mock login logic
    setTimeout(() => {
      if (email.includes('doctor')) {
        setSession({ role: 'doctor', email, fullName: 'Dr. Jane Smith' })
        router.push('/doctor/planner')
      } else if (email.includes('patient')) {
        setSession({ role: 'patient', email, fullName: 'Alex Johnson' })
        router.push('/patient/dashboard')
      } else {
        setError('Use an email containing "doctor" or "patient" to test routing.')
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-2">Welcome Back</h2>
        <p className="text-body-md text-on-surface-variant">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {error && (
          <div className="p-3 bg-error-container text-on-error-container text-sm rounded-lg border border-error/20">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-on-surface mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="doctor@example.com"
            className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-on-surface">Password</label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
          ) : (
             'Sign In'
          )}
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-border-subtle"></div>
          <span className="flex-shrink-0 mx-4 text-xs text-on-surface-variant">or continue with</span>
          <div className="flex-grow border-t border-border-subtle"></div>
        </div>

        <button
          type="button"
          className="w-full py-2.5 px-4 bg-surface-container-lowest border border-border-subtle text-on-surface font-medium rounded-lg hover:bg-surface-container-low transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-on-surface-variant">
        Don't have an account?{' '}
        <Link href="/register/patient" className="text-primary font-medium hover:underline">
          Register as Patient
        </Link>
        {' '}or{' '}
        <Link href="/register/doctor" className="text-primary font-medium hover:underline">
          Doctor
        </Link>
      </div>
    </div>
  )
}
