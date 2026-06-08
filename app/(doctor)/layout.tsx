import React from 'react'
import { DoctorSidebar } from '@/components/doctor/sidebar'

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-bright text-on-surface font-body-md antialiased overflow-hidden flex h-screen">
      <DoctorSidebar />
      {children}
    </div>
  )
}
