import { TopBar } from '@/components/shared/top-bar'

export default function AppointmentsPage() {
  return (
    <div className="flex-1 flex flex-col md:ml-20 h-screen overflow-hidden bg-surface-bright text-on-surface">
      <TopBar 
        title="Appointments" 
        subtitle="Manage your schedule and patients" 
        showSearch={true} 
      />
      
      <main className="flex-1 overflow-y-auto p-10">
        <div className="max-w-container-max mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-headline-lg font-headline-lg text-deep-navy">Appointments</h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-surface-container-low border border-border-subtle rounded-lg text-body-sm font-medium hover:bg-surface-container-high transition-colors">
                Configure Slots
              </button>
              <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-body-sm font-medium hover:bg-primary/90 transition-colors">
                New Appointment
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface-glass border border-border-subtle rounded-xl p-6">
              <p className="text-label-md text-on-surface-variant mb-2">Today's Total</p>
              <p className="text-headline-lg text-primary">14</p>
            </div>
            <div className="bg-surface-glass border border-border-subtle rounded-xl p-6">
              <p className="text-label-md text-on-surface-variant mb-2">Pending Triage</p>
              <p className="text-headline-lg text-secondary">3</p>
            </div>
            <div className="bg-surface-glass border border-border-subtle rounded-xl p-6">
              <p className="text-label-md text-on-surface-variant mb-2">Completed</p>
              <p className="text-headline-lg text-medical-success">5</p>
            </div>
            <div className="bg-surface-glass border border-border-subtle rounded-xl p-6">
              <p className="text-label-md text-on-surface-variant mb-2">Cancellations</p>
              <p className="text-headline-lg text-medical-alert">1</p>
            </div>
          </div>

          {/* Appointment List / Queue */}
          <div className="bg-surface-glass border border-border-subtle rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border-subtle bg-surface-container-lowest/50 flex justify-between items-center">
              <h2 className="text-headline-md font-semibold">Live Queue</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-primary text-on-primary text-sm rounded-md">Today</button>
                <button className="px-3 py-1 text-on-surface-variant text-sm hover:bg-surface-container-low rounded-md transition-colors">Upcoming</button>
                <button className="px-3 py-1 text-on-surface-variant text-sm hover:bg-surface-container-low rounded-md transition-colors">Past</button>
              </div>
            </div>
            <div className="divide-y divide-border-subtle">
              {/* Example Appointment 1 */}
              <div className="p-4 hover:bg-surface-container-lowest transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center font-semibold text-lg">
                    AS
                  </div>
                  <div>
                    <h3 className="font-semibold text-on-surface">Alex Smith</h3>
                    <p className="text-sm text-on-surface-variant">Follow-up · Teleconsultation</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-semibold">09:30 AM</p>
                    <p className="text-sm text-on-surface-variant">In 15 mins</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors">
                      Review Triage
                    </button>
                    <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Start Session
                    </button>
                  </div>
                </div>
              </div>

              {/* Example Appointment 2 */}
              <div className="p-4 hover:bg-surface-container-lowest transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-high text-on-surface rounded-full flex items-center justify-center font-semibold text-lg">
                    MJ
                  </div>
                  <div>
                    <h3 className="font-semibold text-on-surface">Maria Johnson</h3>
                    <p className="text-sm text-on-surface-variant">Initial Consultation · Clinic Visit</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-semibold">10:15 AM</p>
                    <p className="text-sm text-on-surface-variant">Waiting</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors">
                      Review Triage
                    </button>
                    <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Start Session
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
