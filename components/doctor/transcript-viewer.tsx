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
    summary,
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
    <Card className="flex h-[400px] flex-col rounded-[14px] overflow-hidden bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <CardHeader className="bg-white border-b border-black/5 pb-4 pt-5 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#1D1D1F]">
            <div className="p-1 rounded-md bg-blue-50 text-[#0050cb]">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            Clinical Summary
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
        <div className="flex flex-col gap-4 p-6 h-full bg-white">
          {summary ? (
            <div className="prose max-w-none text-[15px] text-[#3C3C43]">
              <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
            </div>
          ) : isRecording ? (
            <div className="flex flex-col items-center justify-center text-[#8E8E93] h-full gap-4 opacity-80">
               <div className="flex gap-1.5 items-center">
                 <span className="h-2 w-2 bg-[#0050cb] rounded-full animate-bounce"></span>
                 <span className="h-2 w-2 bg-[#0050cb] rounded-full animate-bounce delay-75"></span>
                 <span className="h-2 w-2 bg-[#0050cb] rounded-full animate-bounce delay-150"></span>
               </div>
               <p className="text-sm font-medium">Recording session... Summary will be generated after extraction.</p>
            </div>
          ) : transcript.length > 0 ? (
            <div className="flex flex-col items-center justify-center text-[#8E8E93] h-full opacity-80">
              <p className="text-sm font-medium">Session recorded. Click 'Extract AI Insights' to generate summary.</p>
            </div>
          ) : (
            <div className="text-center text-[#8E8E93] text-sm h-full flex flex-col items-center justify-center gap-4">
              <span className="font-medium">Start recording to generate a clinical summary, or use a demo transcript.</span>
              <Button variant="outline" size="sm" onClick={seedDemoTranscript} className="text-[#0050cb] border-[#0050cb]/20 hover:bg-[#0050cb]/10">
                Seed Demo Session
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
