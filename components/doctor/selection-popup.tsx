'use client'

import { useEffect } from 'react'

export function SelectionPopup() {
  useEffect(() => {
    const termEl = document.getElementById('term-neuroplasticity')
    const blockEl = document.getElementById('block-selection-target')
    const termPopup = document.getElementById('popup-term')
    const blockPopup = document.getElementById('popup-block')

    if (!termEl || !blockEl || !termPopup || !blockPopup) return

    // Show term popup on hover
    const handleTermEnter = (e: MouseEvent) => {
      const rect = termEl.getBoundingClientRect()
      termPopup.style.top = `${rect.top - 60}px`
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
      blockPopup.style.top = `${e.clientY + 10}px`
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

  return (
    <>
      {/* 1. Single Term Selection (Neuroplasticity) */}
      <div className="selection-popup p-1.5 flex gap-1 w-max absolute top-[30%] left-[25%] hidden" id="popup-term">
        <button className="flex flex-col items-center justify-center px-3 py-2 rounded-md hover:bg-surface-container transition-colors min-w-[70px] group">
          <span className="material-symbols-outlined text-[20px] text-primary mb-1 group-hover:scale-110 transition-transform">menu_book</span>
          <span className="text-[10px] font-medium text-on-surface">Meaning</span>
        </button>
        <div className="w-px bg-border-subtle my-2"></div>
        <button className="flex flex-col items-center justify-center px-3 py-2 rounded-md hover:bg-surface-container transition-colors min-w-[70px] group">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant mb-1 group-hover:scale-110 transition-transform">manage_search</span>
          <span className="text-[10px] font-medium text-on-surface">Context</span>
        </button>
        <div className="w-px bg-border-subtle my-2"></div>
        <button className="flex flex-col items-center justify-center px-3 py-2 rounded-md hover:bg-surface-container transition-colors min-w-[70px] group">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant mb-1 group-hover:scale-110 transition-transform">account_tree</span>
          <span className="text-[10px] font-medium text-on-surface">Root</span>
        </button>
        <div className="w-px bg-border-subtle my-2"></div>
        <button className="flex flex-col items-center justify-center px-3 py-2 rounded-md hover:bg-surface-container transition-colors min-w-[70px] group">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant mb-1 group-hover:scale-110 transition-transform">volume_up</span>
          <span className="text-[10px] font-medium text-on-surface">Pronounce</span>
        </button>
      </div>

      {/* 2. Block Selection (Paragraph) */}
      <div className="selection-popup w-64 flex flex-col absolute top-[40%] left-[30%] hidden" id="popup-block">
        <div className="px-3 py-2 border-b border-border-subtle bg-surface-container-lowest/50">
          <span className="text-[10px] font-label-md text-outline font-bold uppercase tracking-wider">Paragraph Actions</span>
        </div>
        <div className="p-1 flex flex-col">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">short_text</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-on-surface">Summarize</span>
              <span className="text-[10px] text-on-surface-variant">Condense to main idea</span>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group">
            <div className="w-6 h-6 rounded bg-secondary-container/50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-on-surface">Simplify</span>
              <span className="text-[10px] text-on-surface-variant">Rewrite in plain English</span>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group">
            <div className="w-6 h-6 rounded bg-tertiary-container/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-on-surface">Key Takeaways</span>
              <span className="text-[10px] text-on-surface-variant">Extract bullet points</span>
            </div>
          </button>
          <div className="w-full h-px bg-border-subtle my-1"></div>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-left group">
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
    </>
  )
}
