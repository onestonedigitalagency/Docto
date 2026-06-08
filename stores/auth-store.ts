import { create } from 'zustand'

interface UserSession {
  id: string | null
  role: 'doctor' | 'patient' | null
  email: string | null
  fullName: string | null
}

interface AuthState {
  session: UserSession
  isLoading: boolean
  setSession: (session: Partial<UserSession>) => void
  setLoading: (isLoading: boolean) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: {
    id: null,
    role: null,
    email: null,
    fullName: null,
  },
  isLoading: true,
  setSession: (newSession) => 
    set((state) => ({ session: { ...state.session, ...newSession } })),
  setLoading: (isLoading) => set({ isLoading }),
  clearSession: () => set({ 
    session: { id: null, role: null, email: null, fullName: null } 
  }),
}))
