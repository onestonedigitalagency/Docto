'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Activity, 
  Calendar, 
  Clock, 
  Flame, 
  FileText, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react'

export default function PatientDashboard() {
  const [streak, setStreak] = useState(5) // Mock streak
  const [medsTaken, setMedsTaken] = useState<{ [key: string]: boolean }>({
    'med-1': true,
    'med-2': false,
    'med-3': false,
  })

  const toggleMed = (id: string) => {
    setMedsTaken(prev => ({ ...prev, [id]: !prev[id] }))
    if (!medsTaken[id]) {
      // If taking a new med, maybe increment streak for mock playfulness
      setStreak(prev => prev + 1)
    } else {
      setStreak(prev => Math.max(0, prev - 1))
    }
  }

  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Jane Smith',
      specialty: 'Cardiologist',
      time: 'Tomorrow, 10:30 AM',
      type: 'Teleconsultation',
    }
  ]

  const healthReports = [
    {
      id: 'report-123',
      name: 'Complete Blood Count (CBC)',
      date: 'June 5, 2026',
      status: 'Analyzed',
      flaggedCount: 2,
    }
  ]

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Welcome & Streak Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-primary-container/40 via-surface-container-low to-surface-container-low p-6 rounded-2xl border border-primary-container/20">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-primary mb-2 flex items-center gap-2">
            Namaste, Alex <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Your health dashboard is up to date. You have 2 medications left for today.
          </p>
        </div>
        
        {/* Streak Counter */}
        <div className="flex items-center gap-3 bg-surface-container-lowest border border-border-subtle p-3.5 rounded-xl self-start md:self-auto shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center text-error">
            <Flame className="h-6 w-6 fill-current animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-title-lg font-bold text-on-surface">{streak} Days</span>
              <span className="text-xs bg-success-container text-on-success-container px-2 py-0.5 rounded-full font-medium">Active Streak</span>
            </div>
            <p className="text-xs text-on-surface-variant">Take meds on time to earn 10% off next booking!</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column: Meds Tracker & Appointments */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Daily Meds Checklist */}
          <div className="bg-surface-container-low border border-border-subtle rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" /> Today's Medications
                </h2>
                <p className="text-xs text-on-surface-variant">Log your dosage to keep your streak going</p>
              </div>
              <Link href="/patient/medications" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                View Schedule <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-container-lowest hover:border-primary-container/50 transition-all">
                <div className="flex items-start gap-3.5">
                  <button 
                    onClick={() => toggleMed('med-1')}
                    className={`mt-0.5 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                      medsTaken['med-1'] 
                        ? 'bg-success text-on-success border-success' 
                        : 'border-border-subtle hover:border-primary'
                    }`}
                  >
                    {medsTaken['med-1'] && <CheckCircle2 className="h-4.5 w-4.5 fill-current" />}
                  </button>
                  <div>
                    <h3 className={`font-semibold text-sm ${medsTaken['med-1'] ? 'line-through text-on-surface-variant/50' : 'text-on-surface'}`}>
                      Amoxicillin 500mg
                    </h3>
                    <p className="text-xs text-on-surface-variant">1 Capsule • After breakfast</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md">
                  <Clock className="h-3.5 w-3.5" /> 8:00 AM
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-container-lowest hover:border-primary-container/50 transition-all">
                <div className="flex items-start gap-3.5">
                  <button 
                    onClick={() => toggleMed('med-2')}
                    className={`mt-0.5 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                      medsTaken['med-2'] 
                        ? 'bg-success text-on-success border-success' 
                        : 'border-border-subtle hover:border-primary'
                    }`}
                  >
                    {medsTaken['med-2'] && <CheckCircle2 className="h-4.5 w-4.5 fill-current" />}
                  </button>
                  <div>
                    <h3 className={`font-semibold text-sm ${medsTaken['med-2'] ? 'line-through text-on-surface-variant/50' : 'text-on-surface'}`}>
                      Paracetamol 650mg
                    </h3>
                    <p className="text-xs text-on-surface-variant">1 Tablet • As needed (Fever/Pain)</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md">
                  <Clock className="h-3.5 w-3.5" /> 2:00 PM
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-container-lowest hover:border-primary-container/50 transition-all">
                <div className="flex items-start gap-3.5">
                  <button 
                    onClick={() => toggleMed('med-3')}
                    className={`mt-0.5 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                      medsTaken['med-3'] 
                        ? 'bg-success text-on-success border-success' 
                        : 'border-border-subtle hover:border-primary'
                    }`}
                  >
                    {medsTaken['med-3'] && <CheckCircle2 className="h-4.5 w-4.5 fill-current" />}
                  </button>
                  <div>
                    <h3 className={`font-semibold text-sm ${medsTaken['med-3'] ? 'line-through text-on-surface-variant/50' : 'text-on-surface'}`}>
                      Atorvastatin 10mg
                    </h3>
                    <p className="text-xs text-on-surface-variant">1 Tablet • Night, before sleep</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md">
                  <Clock className="h-3.5 w-3.5" /> 9:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Consultations */}
          <div className="bg-surface-container-low border border-border-subtle rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Upcoming Appointments
                </h2>
                <p className="text-xs text-on-surface-variant">Manage your booked slots and video sessions</p>
              </div>
              <Link href="/patient/appointments" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                Book Appointment <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 rounded-xl border border-border-subtle bg-surface-container-lowest flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">health_and_safety</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-on-surface">{appointment.doctorName}</h3>
                    <p className="text-xs text-on-surface-variant">{appointment.specialty} • {appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-on-surface">{appointment.time}</p>
                    <span className="text-[10px] bg-primary-container/30 text-primary px-2 py-0.5 rounded-full font-medium">Confirmed</span>
                  </div>
                  <button className="p-2 bg-primary text-on-primary hover:bg-primary/95 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors">
                    Join Call <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: AI Reports & Quick Chat */}
        <div className="space-y-8">
          
          {/* Health Report Analysis */}
          <div className="bg-surface-container-low border border-border-subtle rounded-2xl p-6 shadow-sm">
            <h2 className="text-title-lg font-bold text-on-surface flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" /> AI Report Analysis
            </h2>
            <p className="text-xs text-on-surface-variant mb-6">
              Upload blood reports or diagnostic tests to view AI insights instantly
            </p>

            <div className="border-2 border-dashed border-border-subtle rounded-xl p-5 text-center bg-surface-container-lowest hover:border-primary/50 transition-all cursor-pointer mb-6">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2 block">cloud_upload</span>
              <span className="text-sm font-semibold text-on-surface block mb-1">Upload New Report</span>
              <span className="text-xs text-on-surface-variant block">Supports PDF, PNG, JPEG</span>
            </div>

            {healthReports.map((report) => (
              <div key={report.id} className="p-4 rounded-xl border border-border-subtle bg-surface-container-lowest flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                    <FileText className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-on-surface">{report.name}</h3>
                    <p className="text-[10px] text-on-surface-variant">{report.date} • {report.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-error font-semibold bg-error-container/10 px-2 py-0.5 rounded-full mb-1">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    {report.flaggedCount} Flagged
                  </div>
                  <Link href={`/patient/reports/${report.id}`} className="text-[10px] font-semibold text-primary hover:underline flex items-center gap-0.5 justify-end">
                    View <ArrowRight className="h-2.5 w-2.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Docto Bot AI Assistant */}
          <div className="bg-gradient-to-br from-primary/10 via-surface-container-low to-surface-container-low border border-primary-container/20 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-title-lg font-bold text-on-surface">Docto Bot AI</h2>
                <p className="text-xs text-on-surface-variant">Answers derived strictly from doctor's notes</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant mb-6">
              "What did the doctor mean by taking Atorvastatin before sleep?" or "Explain my lab report findings in simple language."
            </p>
            <Link 
              href="/patient/chat" 
              className="w-full py-2.5 px-4 bg-primary text-on-primary hover:bg-primary/95 text-center font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
            >
              Start Conversation <MessageSquare className="h-4.5 w-4.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
