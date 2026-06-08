'use client'

import { useEffect, useState } from 'react'
import { DoctorTopBar } from '@/components/doctor/top-bar'
import { usePlannerStore, PlannerTask } from '@/stores/planner-store'

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function PlannerPage() {
  const { tasks, isLoading, fetchTasks, addTask, toggleTask, deleteTask } = usePlannerStore()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)) // Defaults to June 2026 to match current time
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDateStr, setSelectedDateStr] = useState('')

  // Form states for new task
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<'appointment' | 'follow-up' | 'research' | 'personal' | 'general'>('general')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [newDescription, setNewDescription] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Get date information
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() // 0-indexed
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  // Find start day of the month (Mon=0, Tue=1, ..., Sun=6)
  // JS day: Sun=0, Mon=1, ..., Sat=6
  const getStartDayOfMonth = (y: number, m: number) => {
    const firstDay = new Date(y, m, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1
  }

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate()
  }

  const startDayIdx = getStartDayOfMonth(year, month)
  const daysInMonth = getDaysInMonth(year, month)

  // Generate calendar grid
  const calendarCells = []
  // Lead-in empty days
  for (let i = 0; i < startDayIdx; i++) {
    calendarCells.push(null)
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(new Date(year, month, i))
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleOpenAddModal = (dateObj: Date | null) => {
    const dateStr = dateObj
      ? dateObj.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
    setSelectedDateStr(dateStr)
    setNewTitle('')
    setNewDescription('')
    setNewCategory('general')
    setNewPriority('medium')
    setIsModalOpen(true)
  }

  const handleAddTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    await addTask({
      title: newTitle,
      description: newDescription,
      due_date: selectedDateStr,
      category: newCategory,
      priority: newPriority,
    })

    setIsModalOpen(false)
  }

  // Get category colors
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'appointment':
        return { bg: '#FF3B301A', dot: '#FF3B30', text: '#FF3B30' }
      case 'follow-up':
        return { bg: '#34C7591A', dot: '#34C759', text: '#34C759' }
      case 'research':
        return { bg: '#FF95001A', dot: '#FF9500', text: '#FF9500' }
      case 'personal':
        return { bg: '#AF52DE1A', dot: '#AF52DE', text: '#AF52DE' }
      default:
        return { bg: '#007AFF1A', dot: '#007AFF', text: '#007AFF' }
    }
  }

  const isToday = (d: Date) => {
    const today = new Date()
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <DoctorTopBar
        title="Clinical Planner"
        subtitle={monthName}
        actions={
          <>
            <button
              onClick={() => setCurrentDate(new Date(2026, 5, 9))} // Today is June 9th 2026
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.1)',
                background: '#fff',
                color: '#1D1D1F',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: '-apple-system, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              Today
            </button>
            <button
              onClick={() => handleOpenAddModal(null)}
              style={{
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                background: '#0050cb',
                color: '#fff',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: '-apple-system, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Task
            </button>
          </>
        }
      />

      {/* View controls */}
      <div
        style={{
          padding: '12px 28px',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            background: 'rgba(142,142,147,0.12)',
            borderRadius: 8,
            padding: 2,
            gap: 2,
          }}
        >
          {['Milestone', 'Planner'].map((v) => (
            <button
              key={v}
              style={{
                padding: '4px 14px',
                borderRadius: 6,
                border: 'none',
                background: v === 'Planner' ? '#fff' : 'transparent',
                color: v === 'Planner' ? '#1D1D1F' : '#86868B',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: '-apple-system, sans-serif',
                boxShadow: v === 'Planner' ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Month nav */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handlePrevMonth}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868B', display: 'flex', alignItems: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1D1D1F', fontFamily: '-apple-system, sans-serif', minWidth: 120, textAlign: 'center' }}>
            {monthName}
          </span>
          <button
            onClick={handleNextMonth}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868B', display: 'flex', alignItems: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ flex: 1, overflow: 'auto', background: '#F5F5F7', padding: 20 }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* Day headers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                background: '#FAFAFA',
              }}
            >
              {DAYS_OF_WEEK.map((d) => (
                <div
                  key={d}
                  style={{
                    padding: '10px 0',
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#86868B',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridAutoRows: 120,
              }}
            >
              {calendarCells.map((dateObj, idx) => {
                if (!dateObj) {
                  return (
                    <div
                      key={`empty-${idx}`}
                      style={{
                        background: '#FAFAFA',
                        borderRight: '1px solid rgba(0,0,0,0.04)',
                        borderBottom: '1px solid rgba(0,0,0,0.04)',
                      }}
                    />
                  )
                }

                const dateStr = dateObj.toISOString().split('T')[0]
                const dayTasks = tasks.filter((t) => t.due_date === dateStr)
                const todayFlag = isToday(dateObj)

                return (
                  <div
                    key={dateStr}
                    onClick={() => handleOpenAddModal(dateObj)}
                    style={{
                      padding: '8px 10px',
                      borderRight: '1px solid rgba(0,0,0,0.04)',
                      borderBottom: '1px solid rgba(0,0,0,0.04)',
                      background: todayFlag ? 'rgba(0,80,203,0.03)' : 'transparent',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      transition: 'background 100ms ease',
                      overflowY: 'auto',
                    }}
                  >
                    {/* Date number */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span
                        style={{
                          width: todayFlag ? 24 : 'auto',
                          height: todayFlag ? 24 : 'auto',
                          borderRadius: todayFlag ? '50%' : 0,
                          background: todayFlag ? '#0050cb' : 'transparent',
                          color: todayFlag ? '#fff' : '#1D1D1F',
                          fontSize: 13,
                          fontWeight: todayFlag ? 600 : 400,
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {dateObj.getDate()}
                      </span>
                      {todayFlag && (
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: '#0050cb',
                            fontFamily: '-apple-system, sans-serif',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Today
                        </span>
                      )}
                    </div>

                    {/* Task pills */}
                    {dayTasks.map((t) => {
                      const colors = getCategoryColor(t.category)
                      return (
                        <div
                          key={t.id}
                          onClick={(e) => {
                            e.stopPropagation() // Don't trigger cell click (add task)
                            toggleTask(t.id, t.is_completed)
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            background: colors.bg,
                            borderRadius: 6,
                            padding: '2px 6px',
                            textDecoration: t.is_completed ? 'line-through' : 'none',
                            opacity: t.is_completed ? 0.5 : 1,
                          }}
                          title={`Click to toggle: ${t.title}`}
                        >
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: colors.dot,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: colors.text,
                              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {t.title}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              width: '100%',
              maxWidth: 450,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1D1D1F' }}>Add Clinical Task</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868B' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <form onSubmit={handleAddTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#86868B', marginBottom: 6 }}>Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. OPD Ward Round, Surgery Consult"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-black"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#86868B', marginBottom: 6 }}>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-black"
                  >
                    <option value="general">General</option>
                    <option value="appointment">Appointment</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="research">Research</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#86868B', marginBottom: 6 }}>Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-black"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#86868B', marginBottom: 6 }}>Due Date</label>
                <input
                  type="date"
                  required
                  value={selectedDateStr}
                  onChange={(e) => setSelectedDateStr(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-black"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#86868B', marginBottom: 6 }}>Notes</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Optional details..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-black resize-none"
                />
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.1)',
                    background: '#fff',
                    color: '#1D1D1F',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#0050cb',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
