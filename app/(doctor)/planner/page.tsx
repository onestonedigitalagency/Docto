import { TopBar } from '@/components/shared/top-bar'
import { PlannerView } from '@/components/doctor/planner-view'
import { DoctoBotSidebar } from '@/components/doctor/docto-bot-sidebar'

export default function PlannerPage() {
  return (
    <div className="flex-1 flex flex-col md:ml-20 h-screen overflow-hidden mr-[320px] bg-surface-bright text-on-surface">
      <TopBar 
        title="" 
        subtitle="" 
        showSearch={true} 
      />
      
      {/* Main Canvas */}
      <main className="flex-1 overflow-y-auto p-10">
        <PlannerView />
      </main>

      {/* NavigationDrawer (Docto Bot AI Interface) */}
      <aside className="fixed right-0 top-0 h-full w-80 z-50 flex flex-col bg-surface-container-lowest dark:bg-inverse-surface border-l border-border-subtle shadow-2xl transition-transform duration-300">
        <DoctoBotSidebar />
      </aside>
    </div>
  )
}
