'use client'

import { useEffect, useState } from 'react'
import { useBotStore } from '@/stores/bot-store'

export function SelectionPopup() {
  const { sendMessage } = useBotStore()
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resultPos, setResultPos] = useState({ top: 0, left: 0 })
  const [showResult, setShowResult] = useState(false)

  // React states for popups
  const [showTerm, setShowTerm] = useState(false)
  const [termPos, setTermPos] = useState({ top: 0, left: 0 })

  const [showBlock, setShowBlock] = useState(false)
  const [blockPos, setBlockPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const termEl = document.getElementById('term-neuroplasticity')
    const blockEl = document.getElementById('block-selection-target')

    if (!termEl || !blockEl) return

    // Show term popup on hover
    const handleTermEnter = (e: MouseEvent) => {
      const rect = termEl.getBoundingClientRect()
      setTermPos({
        top: rect.top - 65 + window.scrollY,
        left: rect.left + (rect.width / 2) - 75
      })
      setShowTerm(true)
      setShowBlock(false)
    }
    termEl.addEventListener('mouseenter', handleTermEnter)

    // Hide on leave
    const handleTermLeave = () => {
      setTimeout(() => {
        const popup = document.getElementById('popup-term')
        if (popup && !popup.matches(':hover')) {
          setShowTerm(false)
        }
      }, 100)
    }
    termEl.addEventListener('mouseleave', handleTermLeave)

    // Show block popup on click
    const handleBlockClick = (e: MouseEvent) => {
      setBlockPos({
        top: e.clientY + window.scrollY + 10,
        left: e.clientX + 10
      })
      setShowBlock(true)
      setShowTerm(false)
      e.stopPropagation()
    }
    blockEl.addEventListener('click', handleBlockClick)

    // Hide block popup when clicking outside
    const handleDocClick = (e: MouseEvent) => {
      const popupBlock = document.getElementById('popup-block')
      if (popupBlock && !popupBlock.contains(e.target as Node) && e.target !== blockEl) {
        setShowBlock(false)
      }
    }
    document.addEventListener('click', handleDocClick)

    return () => {
      termEl.removeEventListener('mouseenter', handleTermEnter)
      termEl.removeEventListener('mouseleave', handleTermLeave)
      blockEl.removeEventListener('click', handleBlockClick)
      document.removeEventListener('click', handleDocClick)
    }
  }, [])

  const triggerGeminiAction = async (text: string, action: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Hide menus
    setShowTerm(false)
    setShowBlock(false)

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
      setResult('Failed to load insight. Make sure GEMINI_API_KEY is defined and working.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* 1. Single Term Selection (Neuroplasticity) */}
      <div 
        className={`selection-popup p-1.5 gap-1 w-max absolute bg-white shadow-xl rounded-xl border z-50 ${showTerm ? 'flex' : 'hidden'}`} 
        id="popup-term"
        style={{ top: termPos.top, left: termPos.left }}
        onMouseEnter={() => setShowTerm(true)}
        onMouseLeave={() => setShowTerm(false)}
      >
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
            sendMessage("Explain the medical concept and clinical context of 'neuroplasticity'.")
            setShowTerm(false)
          }}
          className="flex flex-col items-center justify-center px-3 py-2 rounded-md hover:bg-surface-container transition-colors min-w-[70px] group text-black cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant mb-1 group-hover:scale-110 transition-transform">smart_toy</span>
          <span className="text-[10px] font-medium text-on-surface">Ask Bot</span>
        </button>
      </div>

      {/* 2. Block Selection (Paragraph) */}
      <div 
        className={`selection-popup w-72 flex flex-col absolute bg-white shadow-xl rounded-xl border z-50 text-black ${showBlock ? 'flex' : 'hidden'}`} 
        id="popup-block"
        style={{ top: blockPos.top, left: blockPos.left }}
      >
        <div className="px-3 py-2 border-b border-border-subtle bg-surface-container-lowest/50">
          <span className="text-[10px] font-label-md text-outline font-bold uppercase tracking-wider text-gray-400">Paragraph Actions</span>
        </div>
        <div className="p-1 flex flex-col">
          <button 
            onClick={(e) => triggerGeminiAction('penumbra, the region immediately surrounding the ischemic core, is particularly susceptible to therapeutic intervention during the acute and sub-acute phases of recovery. Enhanced synaptic plasticity in this region is often mediated by an upregulation of brain-derived neurotrophic factor (BDNF) and an alteration in the balance between excitatory and inhibitory neurotransmission.', 'simplify', e)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group cursor-pointer"
          >
            <div className="w-6 h-6 rounded bg-secondary-container/50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-on-surface">Simplify</span>
              <span className="text-[10px] text-on-surface-variant break-words">Rewrite in plain English</span>
            </div>
          </button>
          <button 
            onClick={(e) => triggerGeminiAction('penumbra, the region immediately surrounding the ischemic core, is particularly susceptible to therapeutic intervention during the acute and sub-acute phases of recovery. Enhanced synaptic plasticity in this region is often mediated by an upregulation of brain-derived neurotrophic factor (BDNF) and an alteration in the balance between excitatory and inhibitory neurotransmission.', 'summarize', e)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group cursor-pointer"
          >
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">short_text</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-on-surface">Summarize</span>
              <span className="text-[10px] text-on-surface-variant break-words">Condense to main idea</span>
            </div>
          </button>
          <div className="w-full h-px bg-border-subtle my-1"></div>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              sendMessage("Explain the implications of this findings in patients: 'penumbra, the region immediately surrounding the ischemic core, is particularly susceptible to therapeutic intervention during the acute and sub-acute phases of recovery. Enhanced synaptic plasticity in this region is often mediated by an upregulation of brain-derived neurotrophic factor (BDNF) and an alteration in the balance between excitatory and inhibitory neurotransmission.'")
              setShowBlock(false)
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group cursor-pointer"
          >
            <div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center text-on-primary-container flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-primary">Ask Docto Bot</span>
              <span className="text-[10px] text-on-surface-variant break-words">Open in chat pane</span>
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
