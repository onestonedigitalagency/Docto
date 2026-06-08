'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PatientRegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-2">Create Patient Account</h2>
        <p className="text-body-md text-on-surface-variant">Join MedFlow to manage your health seamlessly.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5 animate-fade-in-up">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1.5">Full Name</label>
          <input required type="text" placeholder="Alex Johnson" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">Date of Birth</label>
            <input required type="date" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">Gender</label>
            <select className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-on-surface mb-1.5">Email</label>
          <input required type="email" placeholder="alex@example.com" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1.5">Password</label>
          <input required type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 py-2.5 px-4 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center h-11"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
          ) : (
            'Create Account'
          )}
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-border-subtle"></div>
          <span className="flex-shrink-0 mx-4 text-xs text-on-surface-variant">or</span>
          <div className="flex-grow border-t border-border-subtle"></div>
        </div>

        <button
          type="button"
          className="w-full py-2.5 px-4 bg-surface-container-lowest border border-border-subtle text-on-surface font-medium rounded-lg hover:bg-surface-container-low transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-on-surface-variant">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  )
}
