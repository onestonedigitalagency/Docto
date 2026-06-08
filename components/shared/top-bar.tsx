import Link from "next/link"
import { Bell, Search, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopBar({ userRole }: { userRole: 'doctor' | 'patient' }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-outline-variant bg-surface px-6 sm:gap-x-6 elevation-1">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-on-surface-variant"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-on-surface placeholder:text-on-surface-variant focus:ring-0 sm:text-sm"
            placeholder={userRole === 'doctor' ? "Search patients, files, or sessions..." : "Search doctors, reports, or medications..."}
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-on-surface-variant hover:text-on-surface">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-outline-variant" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative">
            <button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <Avatar className="h-8 w-8 bg-surface-container-high">
                <AvatarFallback>{userRole === 'doctor' ? 'DR' : 'PT'}</AvatarFallback>
              </Avatar>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-on-surface" aria-hidden="true">
                  {userRole === 'doctor' ? 'Dr. Sharma' : 'Rahul K.'}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
