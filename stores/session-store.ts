import { create } from 'zustand'

export interface TranscriptEntry {
  id: number
  speaker: string
  time: string
  text: string
}

export interface ExtractedDiagnosis {
  condition: string
  icd10: string
}

export interface ExtractedPrescription {
  name: string
  dosage: string
  frequency: string
  duration: string
  notes: string
}

export interface SessionState {
  isRecording: boolean
  transcript: TranscriptEntry[]
  summary: string
  issues: string[]
  diagnosis: ExtractedDiagnosis[]
  prescriptions: ExtractedPrescription[]
  referrals: string[]
  isExtracting: boolean
  
  setIsRecording: (isRecording: boolean) => void
  addTranscript: (entry: Omit<TranscriptEntry, 'id'>) => void
  setExtractionResults: (data: Partial<SessionState>) => void
  setIsExtracting: (isExtracting: boolean) => void
  addPrescription: (med: ExtractedPrescription) => void
  removePrescription: (index: number) => void
  updatePrescription: (index: number, med: ExtractedPrescription) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  isRecording: false,
  transcript: [],
  summary: '',
  issues: [],
  diagnosis: [],
  prescriptions: [],
  referrals: [],
  isExtracting: false,

  setIsRecording: (isRecording) => set({ isRecording }),
  
  addTranscript: (entry) => set((state) => ({ 
    transcript: [...state.transcript, { ...entry, id: Date.now() }] 
  })),
  
  setExtractionResults: (data) => set((state) => ({ ...state, ...data })),
  
  setIsExtracting: (isExtracting) => set({ isExtracting }),

  addPrescription: (med) => set((state) => ({
    prescriptions: [...state.prescriptions, med]
  })),

  removePrescription: (index) => set((state) => ({
    prescriptions: state.prescriptions.filter((_, i) => i !== index)
  })),

  updatePrescription: (index, med) => set((state) => {
    const newMeds = [...state.prescriptions]
    newMeds[index] = med
    return { prescriptions: newMeds }
  }),

  clearSession: () => set({
    isRecording: false,
    transcript: [],
    summary: '',
    issues: [],
    diagnosis: [],
    prescriptions: [],
    referrals: [],
    isExtracting: false
  })
}))
