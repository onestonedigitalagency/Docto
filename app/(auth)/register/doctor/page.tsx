'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DoctorRegisterPage() {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) setStep(step + 1)
    else router.push('/login')
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-2">Join as a Doctor</h2>
        <p className="text-body-md text-on-surface-variant">Step {step} of 3: {step === 1 ? 'Personal Details' : step === 2 ? 'Professional Info' : 'Clinic Setup'}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-surface-container-high rounded-full mb-8 overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      <form onSubmit={handleNext} className="space-y-5">
        {step === 1 && (
          <div className="space-y-5 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Full Name</label>
              <input required type="text" placeholder="Dr. Jane Smith" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Email</label>
              <input required type="email" placeholder="jane.smith@hospital.com" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Medical License Number</label>
              <input required type="text" placeholder="LIC-123456" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Specialization</label>
              <select className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>General Practice</option>
                <option>Pediatrics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Years of Experience</label>
              <input required type="number" min="0" placeholder="10" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Clinic/Hospital Name</label>
              <input required type="text" placeholder="City Medical Center" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Consultation Fee (USD)</label>
              <input required type="number" min="0" placeholder="150" className="w-full px-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div className="flex gap-4">
               <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                 <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary" />
                 Teleconsultation
               </label>
               <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                 <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary" />
                 In-Person Visit
               </label>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 bg-surface-container-lowest border border-border-subtle text-on-surface font-medium rounded-lg hover:bg-surface-container-low transition-colors shadow-sm"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 py-2.5 px-4 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            {step === 3 ? 'Complete Registration' : 'Next Step'}
          </button>
        </div>
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
