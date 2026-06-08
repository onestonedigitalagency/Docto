import { DocumentViewer } from '@/components/doctor/document-viewer'
import { DoctoBotSidebar } from '@/components/doctor/docto-bot-sidebar'
import { SelectionPopup } from '@/components/doctor/selection-popup'
import { TopBar } from '@/components/shared/top-bar'

export default function ResearchHubPage() {
  return (
    <div className="flex-1 ml-0 md:ml-20 h-full flex flex-col relative z-10 overflow-hidden bg-background">
      <TopBar 
        title="Neuroplasticity in Post-Stroke Recovery" 
        subtitle="Vol. 42, Issue 3" 
        showSearch={true} 
      />

      {/* Two-Pane Layout */}
      <main className="flex-1 flex overflow-hidden p-6 gap-6 max-w-container-max mx-auto w-full">
        {/* Left Pane: Document View */}
        <section className="flex-[2] glass-panel rounded-2xl overflow-hidden flex flex-col relative shadow-sm border border-border-subtle bg-white">
          <DocumentViewer />
        </section>

        {/* Right Pane: Analysis & Chat */}
        <section className="flex-1 flex flex-col gap-6 min-w-[320px]">
          {/* Summary / Insights Card */}
          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4 bg-surface-bright flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-headline-md text-lg font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
                Smart Insights
              </h3>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-border-subtle shadow-sm">
                <h4 className="text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-2">Key Takeaways</h4>
                <ul className="text-sm space-y-2 text-on-surface">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-medical-success text-[16px] mt-0.5">check_circle</span>
                    <span>Penumbra region is highly responsive to therapy in sub-acute phases.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-medical-success text-[16px] mt-0.5">check_circle</span>
                    <span>BDNF upregulation plays a crucial role in synaptic repair.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Docto Bot Interface */}
          <DoctoBotSidebar />
        </section>
      </main>

      <SelectionPopup />
    </div>
  )
}
