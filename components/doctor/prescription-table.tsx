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
    <Card className="elevation-1 overflow-hidden">
      <CardHeader className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
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
            <thead className="bg-surface-container text-on-surface-variant text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Medicine Name</th>
                <th className="px-6 py-4">Dosage</th>
                <th className="px-6 py-4">Frequency</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {prescriptions.map((med, index) => (
                <tr key={index} className="hover:bg-surface-container-low/50 transition-colors animate-fade-in-up">
                  <td className="px-6 py-4 font-medium text-on-surface">{med.name}</td>
                  <td className="px-6 py-4">{med.dosage}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary">{med.frequency}</Badge>
                  </td>
                  <td className="px-6 py-4">{med.duration}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{med.notes}</td>
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
        <div className="bg-surface-container-low p-4 flex items-center justify-between border-t border-outline-variant">
          <div className="text-sm text-on-surface-variant flex items-center gap-2">
            {isExtracting ? (
              <>
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
                Extracting data from audio...
              </>
            ) : (
              <>
                <span className="flex h-2 w-2 rounded-full bg-success"></span>
                AI synced with transcript
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
