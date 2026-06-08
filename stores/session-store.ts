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
  seedDemoTranscript: () => void
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
  }),

  seedDemoTranscript: () => set({
    transcript: [
      { id: 1, speaker: "Doctor", time: "00:02", text: "Good morning. What brings you in today?" },
      { id: 2, speaker: "Patient", time: "00:06", text: "Hello Doctor, I've had a bad cough for about 5 days, and I'm also running a mild fever since yesterday." },
      { id: 3, speaker: "Doctor", time: "00:15", text: "Okay. Are you having any shortness of breath or chest pain when you cough?" },
      { id: 4, speaker: "Patient", time: "00:21", text: "No shortness of breath, but my chest feels a bit tight and sore from coughing so much. It's a dry cough mostly." },
      { id: 5, speaker: "Doctor", time: "00:30", text: "Got it. Let me listen to your lungs. Please take a deep breath... Lungs sound clear, but your throat is quite red. I suspect it's acute bronchitis." },
      { id: 6, speaker: "Patient", time: "00:45", text: "Is it serious? Do I need antibiotics?" },
      { id: 7, speaker: "Doctor", time: "00:52", text: "No, it's likely viral so antibiotics won't help. I will prescribe some cough syrup to soothe your chest, and paracetamol for the fever. Take Paracetamol 650mg twice daily for 3 days, and the Cough Syrup 10ml three times daily for 5 days. Drink plenty of warm fluids." },
      { id: 8, speaker: "Patient", time: "01:12", text: "Okay, I can do that. Thank you doctor." },
      { id: 9, speaker: "Doctor", time: "01:18", text: "No problem. If the fever persists past 4 days or you feel short of breath, come back immediately. Get some rest." }
    ]
  })
}))
