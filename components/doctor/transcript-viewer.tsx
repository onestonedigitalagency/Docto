'use client'

import * as React from 'react'
import { MessageSquareText, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useSessionStore } from '@/stores/session-store'

export function TranscriptViewer() {
  const { 
    isRecording, 
    transcript, 
    seedDemoTranscript, 
    isExtracting, 
    setIsExtracting, 
    setExtractionResults 
  } = useSessionStore()
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [transcript])

  const triggerAIExtraction = async () => {
    if (transcript.length === 0) return
    
    setIsExtracting(true)
    try {
      const fullTranscript = transcript.map(t => `${t.speaker}: ${t.text}`).join("\n")
      
      const response = await fetch('/api/session/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: fullTranscript })
      })

      if (!response.ok) throw new Error("Failed to extract")
      
      const resData = await response.json()
      if (resData.success && resData.data) {
        setExtractionResults(resData.data)
      }
    } catch (error) {
      console.error("Extraction error:", error)
      alert("Failed to extract clinical data. Ensure GEMINI_API_KEY is configured.")
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <Card className="flex h-[500px] flex-col elevation-1">
      <CardHeader className="border-b border-outline-variant bg-surface pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquareText className="h-5 w-5 text-primary" />
            Live Transcript
          </CardTitle>
          <div className="flex items-center gap-3">
            {transcript.length > 0 && !isRecording && (
              <Button 
                onClick={triggerAIExtraction} 
                disabled={isExtracting}
                size="sm" 
                className="gap-1.5 h-8 text-xs bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {isExtracting ? "Extracting..." : "Extract AI Insights"}
              </Button>
            )}
            <Badge variant={isRecording ? "success" : "secondary"}>
              {isRecording ? "Live Transcribing" : "Paused"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0" ref={scrollRef}>
        <div className="flex flex-col gap-4 p-6">
          {transcript.length === 0 && !isRecording && (
            <div className="text-center text-on-surface-variant text-sm mt-10 flex flex-col items-center gap-4">
              <span>Start recording to see live transcription here, or use a demo transcript.</span>
              <Button variant="outline" size="sm" onClick={seedDemoTranscript}>
                Seed Demo Transcript
              </Button>
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
