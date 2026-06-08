'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export function DoctorSidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/doctor/research', icon: 'science', label: 'Research' },
    { href: '/doctor/planner', icon: 'calendar_today', label: 'Planner' },
    { href: '/doctor/appointments', icon: 'groups', label: 'Patients' },
  ]

  return (
    <nav className="fixed left-0 top-0 h-full z-40 bg-surface-glass backdrop-blur-xl w-20 flex-col items-center py-8 border-r border-border-subtle shadow-sm hidden md:flex">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md font-bold text-primary dark:text-primary-fixed">
          D
        </div>
        <span className="text-[10px] font-label-md text-on-surface-variant font-bold">Docto</span>
      </div>
      
      <div className="flex flex-col gap-4 w-full px-2">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={clsx(
                "flex flex-col items-center justify-center p-3 w-full rounded-xl transition-all duration-200 scale-95 active:scale-90 group",
                isActive 
                  ? "text-primary dark:text-primary-fixed bg-secondary-container/30" 
                  : "text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container-high"
              )}
            >
              <span 
                className={clsx("material-symbols-outlined mb-1 transition-colors", !isActive && "group-hover:text-primary")}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {link.icon}
              </span>
              <span className="text-label-md font-label-md">{link.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="mt-auto w-full px-2">
        <button className="flex flex-col items-center justify-center p-3 w-full text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container-high transition-all duration-200 rounded-xl scale-95 active:scale-90 group">
          <span className="material-symbols-outlined mb-1 group-hover:text-primary transition-colors">settings</span>
          <span className="text-label-md font-label-md">Settings</span>
        </button>
      </div>
    </nav>
  )
}
