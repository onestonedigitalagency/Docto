import { create } from 'zustand'

export interface PlannerTask {
  id: string
  title: string
  category: 'work' | 'personal' | 'home'
  date: string // YYYY-MM-DD
  time?: string
  duration?: number
  isCompleted: boolean
}

interface PlannerState {
  tasks: PlannerTask[]
  addTask: (task: Omit<PlannerTask, 'id'>) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

export const usePlannerStore = create<PlannerState>((set) => ({
  tasks: [],
  addTask: (task) => 
    set((state) => ({ 
      tasks: [...state.tasks, { ...task, id: Math.random().toString(36).slice(2) }] 
    })),
  toggleTask: (id) => 
    set((state) => ({
      tasks: state.tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter(t => t.id !== id)
    }))
}))
