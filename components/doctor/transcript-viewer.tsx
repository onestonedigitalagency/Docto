"use client"

import * as React from "react"
import { MessageSquareText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSessionStore } from "@/stores/session-store"

export function TranscriptViewer() {
  const { isRecording, transcript } = useSessionStore()
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [transcript])

  return (
    <Card className="flex h-[500px] flex-col elevation-1">
      <CardHeader className="border-b border-outline-variant bg-surface pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquareText className="h-5 w-5 text-primary" />
            Live Transcript
          </CardTitle>
          <Badge variant={isRecording ? "success" : "secondary"}>
            {isRecording ? "Live Transcribing" : "Paused"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0" ref={scrollRef}>
        <div className="flex flex-col gap-4 p-6">
          {transcript.length === 0 && !isRecording && (
            <div className="text-center text-on-surface-variant text-sm mt-10">
              Start recording to see live transcription here.
            </div>
          )}

          {transcript.map((entry) => (
            <div 
              key={entry.id} 
              className={`flex flex-col gap-1 max-w-[85%] ${entry.speaker === "Doctor" ? "self-end" : "self-start"}`}
            >
              <div className={`flex items-center gap-2 text-xs text-on-surface-variant ${entry.speaker === "Doctor" ? "flex-row-reverse" : "flex-row"}`}>
                <span className="font-semibold">{entry.speaker}</span>
                <span>{entry.time}</span>
              </div>
              <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${
                entry.speaker === "Doctor" 
                  ? "bg-primary text-on-primary rounded-tr-sm" 
                  : "bg-surface-container text-on-surface rounded-tl-sm"
              }`}>
                {entry.text}
              </div>
            </div>
          ))}

          {isRecording && (
            <div className="self-start text-on-surface-variant animate-pulse flex gap-1 items-center mt-2">
              <span className="h-2 w-2 bg-on-surface-variant rounded-full animate-bounce"></span>
              <span className="h-2 w-2 bg-on-surface-variant rounded-full animate-bounce delay-75"></span>
              <span className="h-2 w-2 bg-on-surface-variant rounded-full animate-bounce delay-150"></span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
