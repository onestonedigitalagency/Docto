"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2, FileText, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PrescriptionTable } from "@/components/doctor/prescription-table"

export default function SessionReviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/doctor/dashboard"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-headline-md font-bold text-on-surface">Review & Diagnosis</h1>
            <p className="text-body-sm text-on-surface-variant flex items-center gap-2">
              Patient: <span className="font-semibold text-primary">Rahul Kumar</span>
              <span>•</span>
              Session Completed
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button variant="success" className="gap-2">
            <CheckCircle2 className="h-4 w-4" /> Send to Patient
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: AI Diagnosis & Summary */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="elevation-1">
            <CardHeader className="border-b border-outline-variant bg-surface-container-lowest">
              <CardTitle className="text-lg">AI Session Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-on-surface leading-relaxed">
                Patient reports reduction in chest pain but experiences shortness of breath during mild exertion (climbing stairs). Currently taking Telmisartan 40mg and Atorvastatin 10mg, though reports occasional non-compliance with the evening statin dose.
              </p>
            </CardContent>
          </Card>

          <Card className="elevation-1">
            <CardHeader className="border-b border-outline-variant bg-surface-container-lowest flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Diagnosis Details</CardTitle>
              <Badge variant="success">Auto-Extracted</Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase text-on-surface-variant mb-2">Primary Diagnosis</h4>
                <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-md">
                  <span className="font-medium">Essential (primary) hypertension</span>
                  <Badge variant="outline">I10</Badge>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase text-on-surface-variant mb-2">Secondary Issues</h4>
                <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-md">
                  <span className="font-medium">Shortness of breath</span>
                  <Badge variant="outline">R06.0</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="elevation-1">
            <CardHeader className="border-b border-outline-variant bg-surface-container-lowest">
              <CardTitle className="text-lg">Advice & Referrals</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <ul className="list-disc pl-5 text-sm space-y-2 text-on-surface">
                 <li>Strict adherence to evening Atorvastatin dose.</li>
                 <li>Scheduled for an ECG today.</li>
                 <li>Limit sodium intake and engage in light walking.</li>
               </ul>
            </CardContent>
          </Card>
        </div>

        {/* Middle/Right Column: Prescriptions */}
        <div className="xl:col-span-2 space-y-6">
          <PrescriptionTable />
          
          {/* Prescription Preview (Stub) */}
          <Card className="elevation-1 overflow-hidden">
            <CardHeader className="border-b border-outline-variant bg-surface flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Prescription Preview</CardTitle>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Printer className="h-4 w-4" /> Print
              </Button>
            </CardHeader>
            <CardContent className="bg-surface-container-lowest p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center text-on-surface-variant">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>PDF Preview will be rendered here using @react-pdf/renderer</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
