'use client'

import { useState } from 'react'

export function DocumentViewer() {
  const [zoom, setZoom] = useState(100)

  return (
    <>
      {/* Document Toolbar */}
      <div className="h-12 border-b border-border-subtle bg-surface-container-lowest/80 backdrop-blur-sm flex items-center px-4 justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button 
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors" 
            title="Zoom Out"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
          <span className="text-sm font-medium text-on-surface-variant w-12 text-center">{zoom}%</span>
          <button 
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors" 
            title="Zoom In"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
            Save
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share
          </button>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 overflow-y-auto p-12 relative" id="document-content">
        <div 
          className="max-w-3xl mx-auto transition-transform origin-top" 
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <h2 className="text-display-lg font-display-lg mb-6 text-deep-navy">Cortical Remapping Following Ischemic Events</h2>
          <div className="flex items-center gap-4 mb-10 text-on-surface-variant border-b border-border-subtle pb-6">
            <span>Dr. Elena Rostova</span>
            <span>•</span>
            <span>Published: Oct 2023</span>
            <span>•</span>
            <span>Journal of Neurological Rehabilitation</span>
          </div>

          <div className="prose prose-slate max-w-none text-body-lg text-on-surface/90 leading-relaxed space-y-6">
            <p>
              The phenomenon of <span className="highlight-blue relative inline-block cursor-help group" id="term-neuroplasticity">neuroplasticity</span> represents the brain's innate ability to reorganize itself by forming new neural connections throughout life. This capability is acutely critical following focal ischemic strokes, where neuronal death in the infarcted core requires adjacent, surviving cortical areas to assume lost functional roles.
            </p>
            <p>
              Current literature suggests that the <span className="highlight-blue relative inline-block cursor-pointer" id="block-selection-target">penumbra, the region immediately surrounding the ischemic core, is particularly susceptible to therapeutic intervention during the acute and sub-acute phases of recovery. Enhanced synaptic plasticity in this region is often mediated by an upregulation of brain-derived neurotrophic factor (BDNF) and an alteration in the balance between excitatory and inhibitory neurotransmission.</span>
            </p>

            <figure className="my-10 border border-border-subtle rounded-xl overflow-hidden bg-surface-container-low p-4">
              <div className="aspect-video w-full rounded-lg bg-surface-dim mb-3 overflow-hidden relative group">
                <img 
                  alt="MRI scan showing ischemic regions" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkOmz6gzEJCP1-3L5POyc7d8Jj_TbbbGN1mV0dHVWqoRpq9UognkgkFO7Xy4-TjLV-hg6YueILgeH1gbSIf7YPo4aqCsdtFYyi5n9xHh3Ewp8Ictrcdmj1CyxNCOOZuz3Hm2z_hIj2Su8a95M_wQsJ88dVKN3x2iG2ftUk030kmhOlBaks40xVMkjokKkadfLEGfSdz2W9ta88YL7zJNeyKihnH086MBSRd6RlO_-gMVK2bQjzAXF4ioyKnC0ghfR1T4CkMcQjg2aY" 
                />
                <div className="absolute inset-0 bg-deep-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button className="px-4 py-2 bg-white text-primary rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                    <span className="material-symbols-outlined text-[18px]">analytics</span>
                    Analyze Image
                  </button>
                </div>
              </div>
              <figcaption className="text-sm text-on-surface-variant font-medium text-center">
                Figure 1. fMRI indicating heightened activation in contralesional hemisphere during motor tasks 4 weeks post-infarct.
              </figcaption>
            </figure>

            <p>
              However, maladaptive plasticity can also occur. The unmasking of latent horizontal connections might sometimes lead to spasticity or neuropathic pain if not properly guided by targeted rehabilitation protocols. The challenge lies in distinguishing between compensatory strategies that merely bypass the deficit and true restitution of function where the original neural networks are repaired or precisely replicated in function by parallel circuits.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
