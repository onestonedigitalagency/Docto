"use client"

import * as React from "react"
import { Pill, Plus, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSessionStore } from "@/stores/session-store"

export function PrescriptionTable() {
  const { prescriptions, isExtracting, removePrescription } = useSessionStore()

  return (
    <Card className="rounded-[14px] overflow-hidden bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <CardHeader className="bg-white border-b border-black/5 pb-4 pt-5 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#1D1D1F]">
            <div className="p-1 rounded-md bg-blue-50 text-[#0050cb]">
              <Pill className="h-3.5 w-3.5" />
            </div>
            AI Extracted Prescriptions
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-1 text-primary">
            <Plus className="h-4 w-4" /> Add Medicine
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F5F5F7] text-[#8E8E93] text-[11px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Medicine Name</th>
                <th className="px-6 py-4">Dosage</th>
                <th className="px-6 py-4">Frequency</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {prescriptions.map((med, index) => (
                <tr key={index} className="hover:bg-[#F5F5F7]/50 transition-colors animate-fade-in-up">
                  <td className="px-6 py-4 font-semibold text-[#1D1D1F]">{med.name}</td>
                  <td className="px-6 py-4 text-[#3C3C43]">{med.dosage}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="bg-[#0050cb]/10 text-[#0050cb] border-none font-medium">{med.frequency}</Badge>
                  </td>
                  <td className="px-6 py-4 text-[#3C3C43]">{med.duration}</td>
                  <td className="px-6 py-4 text-[#3C3C43]">{med.notes}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-error" onClick={() => removePrescription(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {prescriptions.length === 0 && !isExtracting && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    No medications added yet. Stop the session recording to let AI extract prescriptions.
                  </td>
                </tr>
              )}
              {isExtracting && (
                <tr>
                  <td colSpan={6} className="px-6 py-12">
                    <div className="flex flex-col items-center justify-center text-primary animate-pulse">
                      <div className="skeleton h-10 w-full mb-2"></div>
                      <div className="skeleton h-10 w-full mb-2"></div>
                      <span className="text-sm mt-4">AI is extracting medications...</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-[#F5F5F7] p-4 flex items-center justify-between border-t border-black/5">
          <div className="text-xs font-medium text-[#8E8E93] flex items-center gap-2">
            {isExtracting ? (
              <>
                <span className="flex h-2 w-2 rounded-full bg-[#0050cb] animate-ping"></span>
                Extracting data from audio...
              </>
            ) : (
              <>
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#34C759] shadow-[0_0_8px_rgba(52,199,89,0.5)]"></span>
                AI synced with transcript
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
