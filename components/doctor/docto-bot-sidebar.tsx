'use client'

import { ChatInterface } from '../bot/chat-interface'
import { ToneSelector } from '../bot/tone-selector'
import { useState } from 'react'
import { useBotStore } from '@/stores/bot-store'

export function DoctoBotSidebar() {
  const [input, setInput] = useState('')
  const { addMessage } = useBotStore()

  const handleSend = () => {
    if (!input.trim()) return
    addMessage({ role: 'user', content: input })
    setInput('')
    // Simulate bot response
    setTimeout(() => {
      addMessage({ role: 'assistant', content: 'I am processing your request regarding: ' + input })
    }, 1000)
  }

  return (
    <div className="glass-panel rounded-2xl flex-1 flex flex-col overflow-hidden bg-surface-bright shadow-sm border border-border-subtle relative">
      {/* Header */}
      <div className="p-4 border-b border-border-subtle bg-surface-container-lowest/50 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary-container">
          <span className="material-symbols-outlined text-[20px]">smart_toy</span>
        </div>
        <div>
          <h3 className="font-headline-md text-base font-semibold leading-tight">Docto Bot</h3>
          <p className="text-xs text-on-surface-variant">AI Clinical Assistant</p>
        </div>
      </div>

      {/* Chat Area & Tone */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <div className="px-4 pt-4 shrink-0 flex justify-end">
           <ToneSelector />
        </div>
        <ChatInterface />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-border-subtle bg-surface-container-lowest shrink-0">
        <div className="relative flex items-center">
          <button className="absolute left-2 w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
          </button>
          <input 
            className="w-full pl-11 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
            placeholder="Ask about this research..." 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 w-8 h-8 flex items-center justify-center text-primary hover:bg-primary-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] filled">send</span>
          </button>
        </div>
      </div>
    </div>
  )
}
