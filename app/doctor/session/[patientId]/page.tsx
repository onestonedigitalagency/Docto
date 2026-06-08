"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, CheckCircle2, FileText, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SessionRecorder } from "@/components/doctor/session-recorder"
import { TranscriptViewer } from "@/components/doctor/transcript-viewer"
import { PrescriptionTable } from "@/components/doctor/prescription-table"

export default function ClinicalSessionPage() {
  const params = useParams()
  const patientId = params.patientId

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/doctor/dashboard"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-headline-md font-bold text-on-surface">Clinical Session</h1>
            <p className="text-body-sm text-on-surface-variant flex items-center gap-2">
              Patient: <span className="font-semibold text-primary">Rahul Kumar (ID: {patientId})</span>
              <span>•</span>
              Follow-up Visit
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> View History
          </Button>
          <Button variant="success" asChild className="gap-2">
            <Link href={`/doctor/session/${patientId}/review`}>
              <CheckCircle2 className="h-4 w-4" /> Finish & Review
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Recording & Extraction Panels */}
        <div className="xl:col-span-1 space-y-6">
          <SessionRecorder />
          
          <div className="glass-card p-6 bg-primary-container/10 border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">AI Extraction Engine</h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">
              Docto is analyzing the conversation to extract medical codes, prescriptions, and issues.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Symptoms & Issues</span>
                <span className="text-success flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/> Extracted</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Prescriptions</span>
                <span className="text-success flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/> Extracted</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>ICD-10 Codes</span>
                <span className="text-on-surface-variant flex items-center gap-1">Waiting...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle/Right Column: Transcripts & Prescriptions */}
        <div className="xl:col-span-2 space-y-6">
          <TranscriptViewer isRecording={true} />
          <PrescriptionTable />
        </div>
      </div>
    </div>
  )
}
