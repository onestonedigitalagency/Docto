'use client'

import { useState, ReactNode } from 'react'

function ToolbarButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 8,
        border: 'none',
        background: 'transparent',
        color: '#3C3C43',
        fontSize: 13,
        fontWeight: 500,
        fontFamily: '-apple-system, sans-serif',
        cursor: 'pointer',
        transition: 'background 150ms ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {icon}
      {label}
    </button>
  )
}

interface DocumentViewerProps {
  title?: string
  author?: string
  published?: string
  journal?: string
  content?: string
  isLoading?: boolean
  onSave?: () => void
  isSaved?: boolean
}

export function DocumentViewer({
  title = "Cortical Remapping Following Ischemic Events",
  author = "Dr. Elena Rostova",
  published = "Oct 2023",
  journal = "Journal of Neurological Rehabilitation",
  content = "",
  isLoading = false,
  onSave,
  isSaved = false
}: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100)

  // Default content if none provided
  const defaultContent = `
    <p>
      The phenomenon of <span class="highlight-blue relative inline-block cursor-help group" id="term-neuroplasticity">neuroplasticity</span> represents the brain's innate ability to reorganize itself by forming new neural connections throughout life. This capability is acutely critical following focal ischemic strokes, where neuronal death in the infarcted core requires adjacent, surviving cortical areas to assume lost functional roles.
    </p>
    <p>
      Current literature suggests that the <span class="highlight-blue relative inline-block cursor-pointer" id="block-selection-target">penumbra, the region immediately surrounding the ischemic core, is particularly susceptible to therapeutic intervention during the acute and sub-acute phases of recovery. Enhanced synaptic plasticity in this region is often mediated by an upregulation of brain-derived neurotrophic factor (BDNF) and an alteration in the balance between excitatory and inhibitory neurotransmission.</span>
    </p>
    <p>
      However, maladaptive plasticity can also occur. The unmasking of latent horizontal connections might sometimes lead to spasticity or neuropathic pain if not properly guided by targeted rehabilitation protocols. The challenge lies in distinguishing between compensatory strategies that merely bypass the deficit and true restitution of function where the original neural networks are repaired or precisely replicated in function by parallel circuits.
    </p>
  `

  const renderContent = content || defaultContent

  return (
    <>
      {/* Document Toolbar */}
      <div
        style={{
          height: 48,
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 20,
          flexShrink: 0,
        }}
      >
        {/* Left: Zoom controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            title="Zoom Out"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B7280',
              transition: 'background 120ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button
            title="Zoom In"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B7280',
              transition: 'background 120ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <span style={{ fontSize: 11, color: '#86868B', marginLeft: 4 }}>{zoom}%</span>
        </div>

        {/* Right: Save + Share */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ToolbarButton
            onClick={onSave}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={isSaved ? "text-primary" : ""}>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            }
            label={isSaved ? "Saved" : "Save"}
          />
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 overflow-y-auto p-12 relative bg-white" id="document-content">
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <span style={{ fontSize: 13, color: '#86868B', fontFamily: '-apple-system, sans-serif' }}>Analyzing document with Gemini...</span>
          </div>
        ) : (
          <div 
            className="max-w-3xl mx-auto transition-transform origin-top text-black" 
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <h2 className="text-display-lg font-display-lg mb-6 text-deep-navy font-bold leading-tight" style={{ fontSize: 24 }}>{title}</h2>
            <div className="flex items-center gap-4 mb-10 text-on-surface-variant border-b border-border-subtle pb-6 text-sm text-gray-500">
              <span>{author}</span>
              <span>•</span>
              <span>Published: {published}</span>
              <span>•</span>
              <span>{journal}</span>
            </div>

            <div 
              className="prose prose-slate max-w-none text-body-lg text-on-surface/90 leading-relaxed space-y-6 text-base text-gray-800"
              dangerouslySetInnerHTML={{ __html: renderContent }}
            />
          </div>
        )}
      </div>
    </>
  )
}
