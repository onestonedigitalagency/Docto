import { create } from 'zustand'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface BotState {
  messages: Message[]
  isLoading: boolean
  tone: 'teacher' | 'professional' | 'concise'
  addMessage: (msg: Omit<Message, 'id'>) => void
  setTone: (tone: BotState['tone']) => void
  clearMessages: () => void
}

export const useBotStore = create<BotState>((set) => ({
  messages: [],
  isLoading: false,
  tone: 'professional',
  addMessage: (msg) => 
    set((state) => ({ 
      messages: [...state.messages, { ...msg, id: Math.random().toString(36).slice(2) }] 
    })),
  setTone: (tone) => set({ tone }),
  clearMessages: () => set({ messages: [] })
}))
