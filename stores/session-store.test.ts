import { describe, it, expect, beforeEach } from 'vitest'
import { useSessionStore } from './session-store'

describe('useSessionStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useSessionStore.getState().clearSession()
  })

  it('should initialize with default states', () => {
    const state = useSessionStore.getState()
    expect(state.isRecording).toBe(false)
    expect(state.transcript).toEqual([])
    expect(state.summary).toBe('')
    expect(state.prescriptions).toEqual([])
  })

  it('should update recording state', () => {
    useSessionStore.getState().setIsRecording(true)
    expect(useSessionStore.getState().isRecording).toBe(true)
  })

  it('should add transcript entries with unique IDs', () => {
    const store = useSessionStore.getState()
    store.addTranscript({ speaker: 'Doctor', time: '00:01', text: 'Hello' })
    
    const updatedState = useSessionStore.getState()
    expect(updatedState.transcript.length).toBe(1)
    expect(updatedState.transcript[0].speaker).toBe('Doctor')
    expect(updatedState.transcript[0].text).toBe('Hello')
    expect(updatedState.transcript[0].id).toBeDefined()
  })

  it('should manage prescriptions correctly', () => {
    const store = useSessionStore.getState()
    const mockMed = {
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times a day',
      duration: '7 Days',
      notes: 'Take after meals'
    }

    // Add prescription
    store.addPrescription(mockMed)
    expect(useSessionStore.getState().prescriptions.length).toBe(1)
    expect(useSessionStore.getState().prescriptions[0]).toEqual(mockMed)

    // Update prescription
    const updatedMed = { ...mockMed, dosage: '250mg' }
    useSessionStore.getState().updatePrescription(0, updatedMed)
    expect(useSessionStore.getState().prescriptions[0].dosage).toBe('250mg')

    // Remove prescription
    useSessionStore.getState().removePrescription(0)
    expect(useSessionStore.getState().prescriptions.length).toBe(0)
  })

  it('should seed demo transcript', () => {
    useSessionStore.getState().seedDemoTranscript()
    const state = useSessionStore.getState()
    expect(state.transcript.length).toBeGreaterThan(0)
    expect(state.transcript[0].speaker).toBe('Doctor')
  })
})
