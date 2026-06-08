import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'

export interface PlannerTask {
  id: string
  title: string
  description?: string
  due_date: string // YYYY-MM-DD
  is_completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: 'appointment' | 'follow-up' | 'research' | 'personal' | 'general'
}

interface PlannerState {
  tasks: PlannerTask[]
  isLoading: boolean
  fetchTasks: () => Promise<void>
  addTask: (task: Omit<PlannerTask, 'id' | 'is_completed'>) => Promise<void>
  toggleTask: (id: string, currentStatus: boolean) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const usePlannerStore = create<PlannerState>((set, get) => {
  const supabase = createClient()

  return {
    tasks: [],
    isLoading: false,

    fetchTasks: async () => {
      set({ isLoading: true })
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          set({ isLoading: false })
          return
        }

        const { data, error } = await (supabase as any)
          .from('planner_tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('due_date', { ascending: true })

        if (error) throw error
        // alert('Fetched ' + (data?.length || 0) + ' tasks from DB')
        set({ tasks: data || [], isLoading: false })
      } catch (err: any) {
        console.error('Error fetching planner tasks:', err)
        alert('Failed to fetch tasks: ' + (err.message || 'Unknown error'))
        set({ isLoading: false })
      }
    },

    addTask: async (task) => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await (supabase as any)
          .from('planner_tasks')
          .insert({
            user_id: user.id,
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            priority: task.priority,
            category: task.category,
            is_completed: false,
          })
          .select()
          .single()

        if (error) throw error
        if (data) {
          alert('Successfully inserted task: ' + JSON.stringify(data))
          set((state) => ({
            tasks: [...state.tasks, data],
          }))
        } else {
          alert('Insert returned null data.')
        }
      } catch (err: any) {
        console.error('Error adding planner task:', err)
        alert('Failed to add task: ' + (err.message || 'Unknown error'))
      }
    },

    toggleTask: async (id, currentStatus) => {
      // Optimistic update
      const originalTasks = get().tasks
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, is_completed: !currentStatus } : t
        ),
      }))

      try {
        const { error } = await (supabase as any)
          .from('planner_tasks')
          .update({ is_completed: !currentStatus })
          .eq('id', id)

        if (error) throw error
      } catch (err) {
        console.error('Error toggling planner task:', err)
        // Rollback on error
        set({ tasks: originalTasks })
      }
    },

    deleteTask: async (id) => {
      // Optimistic update
      const originalTasks = get().tasks
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }))

      try {
        const { error } = await (supabase as any)
          .from('planner_tasks')
          .delete()
          .eq('id', id)

        if (error) throw error
      } catch (err) {
        console.error('Error deleting planner task:', err)
        // Rollback on error
        set({ tasks: originalTasks })
      }
    },
  }
})
