'use client'

import { useEffect, useState } from 'react'
import { useBotStore } from '@/stores/bot-store'

export function SelectionPopup() {
  const { sendMessage } = useBotStore()
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resultPos, setResultPos] = useState({ top: 0, left: 0 })
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const termEl = document.getElementById('term-neuroplasticity')
    const blockEl = document.getElementById('block-selection-target')
    const termPopup = document.getElementById('popup-term')
    const blockPopup = document.getElementById('popup-block')

    if (!termEl || !blockEl || !termPopup || !blockPopup) return

    // Show term popup on hover
    const handleTermEnter = (e: MouseEvent) => {
      const rect = termEl.getBoundingClientRect()
      termPopup.style.top = `${rect.top - 60 + window.scrollY}px`
      termPopup.style.left = `${rect.left + (rect.width/2) - (termPopup.offsetWidth/2) || rect.left}px`
      termPopup.classList.remove('hidden')
      blockPopup.classList.add('hidden')
    }

    termEl.addEventListener('mouseenter', handleTermEnter)

    // Keep it visible while hovering popup
    const handlePopupEnter = () => {
      termPopup.classList.remove('hidden')
    }
    termPopup.addEventListener('mouseenter', handlePopupEnter)

    // Hide on leave
    const handleTermLeave = () => {
      setTimeout(() => {
        if(!termPopup.matches(':hover')) {
          termPopup.classList.add('hidden')
        }
      }, 100)
    }
    termEl.addEventListener('mouseleave', handleTermLeave)
    
    const handlePopupLeave = () => {
      termPopup.classList.add('hidden')
    }
    termPopup.addEventListener('mouseleave', handlePopupLeave)

    // Show block popup on click
    const handleBlockClick = (e: MouseEvent) => {
      blockPopup.style.top = `${e.clientY + window.scrollY + 10}px`
      blockPopup.style.left = `${e.clientX + 10}px`
      blockPopup.classList.remove('hidden')
      termPopup.classList.add('hidden')
      e.stopPropagation()
    }
    blockEl.addEventListener('click', handleBlockClick)

    // Hide block popup when clicking outside
    const handleDocClick = (e: MouseEvent) => {
      if (!blockPopup.contains(e.target as Node) && e.target !== blockEl) {
        blockPopup.classList.add('hidden')
      }
    }
    document.addEventListener('click', handleDocClick)

    return () => {
      termEl.removeEventListener('mouseenter', handleTermEnter)
      termPopup.removeEventListener('mouseenter', handlePopupEnter)
      termEl.removeEventListener('mouseleave', handleTermLeave)
      termPopup.removeEventListener('mouseleave', handlePopupLeave)
      blockEl.removeEventListener('click', handleBlockClick)
      document.removeEventListener('click', handleDocClick)
    }
  }, [])

  const triggerGeminiAction = async (text: string, action: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Hide menus
    document.getElementById('popup-term')?.classList.add('hidden')
    document.getElementById('popup-block')?.classList.add('hidden')

    // Position result popup
    setResultPos({
      top: e.clientY + window.scrollY + 15,
      left: Math.max(10, e.clientX - 150)
    })
    setShowResult(true)
    setIsLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/research/define', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, action })
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setResult(data.result)
    } catch (err: any) {
      setResult('Failed to load insight. Make sure GEMINI_API_KEY is defined.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* 1. Single Term Selection (Neuroplasticity) */}
      <div className="selection-popup p-1.5 flex gap-1 w-max absolute top-[30%] left-[25%] hidden bg-white shadow-xl rounded-xl border z-50" id="popup-term">
        <button 
          onClick={(e) => triggerGeminiAction('neuroplasticity', 'meaning', e)}
          className="flex flex-col items-center justify-center px-3 py-2 rounded-md hover:bg-surface-container transition-colors min-w-[70px] group text-black cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] text-primary mb-1 group-hover:scale-110 transition-transform">menu_book</span>
          <span className="text-[10px] font-medium text-on-surface">Meaning</span>
        </button>
        <div className="w-px bg-border-subtle my-2"></div>
        <button 
          onClick={(e) => {
            e.stopPropagation()
            // Send term to chat
            sendMessage("Explain the medical concept and clinical context of 'neuroplasticity'.")
            document.getElementById('popup-term')?.classList.add('hidden')
          }}
          className="flex flex-col items-center justify-center px-3 py-2 rounded-md hover:bg-surface-container transition-colors min-w-[70px] group text-black cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant mb-1 group-hover:scale-110 transition-transform">smart_toy</span>
          <span className="text-[10px] font-medium text-on-surface">Ask Bot</span>
        </button>
      </div>

      {/* 2. Block Selection (Paragraph) */}
      <div className="selection-popup w-64 flex flex-col absolute top-[40%] left-[30%] hidden bg-white shadow-xl rounded-xl border z-50 text-black" id="popup-block">
        <div className="px-3 py-2 border-b border-border-subtle bg-surface-container-lowest/50">
          <span className="text-[10px] font-label-md text-outline font-bold uppercase tracking-wider text-gray-400">Paragraph Actions</span>
        </div>
        <div className="p-1 flex flex-col">
          <button 
            onClick={(e) => triggerGeminiAction('penumbra, the region immediately surrounding the ischemic core, is particularly susceptible to therapeutic intervention during the acute and sub-acute phases of recovery. Enhanced synaptic plasticity in this region is often mediated by an upregulation of brain-derived neurotrophic factor (BDNF) and an alteration in the balance between excitatory and inhibitory neurotransmission.', 'simplify', e)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group cursor-pointer"
          >
            <div className="w-6 h-6 rounded bg-secondary-container/50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-on-surface">Simplify</span>
              <span className="text-[10px] text-on-surface-variant">Rewrite in plain English</span>
            </div>
          </button>
          <button 
            onClick={(e) => triggerGeminiAction('penumbra, the region immediately surrounding the ischemic core, is particularly susceptible to therapeutic intervention during the acute and sub-acute phases of recovery. Enhanced synaptic plasticity in this region is often mediated by an upregulation of brain-derived neurotrophic factor (BDNF) and an alteration in the balance between excitatory and inhibitory neurotransmission.', 'summarize', e)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group cursor-pointer"
          >
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">short_text</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-on-surface">Summarize</span>
              <span className="text-[10px] text-on-surface-variant">Condense to main idea</span>
            </div>
          </button>
          <div className="w-full h-px bg-border-subtle my-1"></div>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              sendMessage("Explain the implications of this findings in patients: 'penumbra, the region immediately surrounding the ischemic core, is particularly susceptible to therapeutic intervention during the acute and sub-acute phases of recovery. Enhanced synaptic plasticity in this region is often mediated by an upregulation of brain-derived neurotrophic factor (BDNF) and an alteration in the balance between excitatory and inhibitory neurotransmission.'")
              document.getElementById('popup-block')?.classList.add('hidden')
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group cursor-pointer"
          >
            <div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-primary">Ask Docto Bot</span>
              <span className="text-[10px] text-on-surface-variant">Open in chat pane</span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. AI Result Card */}
      {showResult && (
        <div 
          style={{
            position: 'absolute',
            top: resultPos.top,
            left: resultPos.left,
            width: 320,
            background: '#fff',
            borderRadius: 12,
            border: '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
            padding: 16,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            color: '#1D1D1F',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#0050cb', letterSpacing: '0.04em' }}>Docto AI Insights</span>
            <button 
              onClick={() => setShowResult(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868B', display: 'flex', padding: 2 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          
          <div style={{ fontSize: 13, lineHeight: 1.5, fontFamily: '-apple-system, sans-serif', color: '#3C3C43' }}>
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <span>Consulting Gemini...</span>
              </div>
            ) : (
              <p style={{ whiteSpace: 'pre-wrap' }}>{result}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
