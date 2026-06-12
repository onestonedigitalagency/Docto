"use client"

import * as React from "react"
import { Mic, Square, Loader2, FileAudio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSessionStore } from "@/stores/session-store"

export function SessionRecorder() {
  const { isRecording, setIsRecording, addTranscript, setIsExtracting, setExtractionResults, transcript } = useSessionStore()
  const [timer, setTimer] = React.useState(0)
  const recognitionRef = React.useRef<any>(null)

  React.useEffect(() => {
    // Initialize Web Speech API if available
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = false
        recognition.lang = 'en-IN'

        recognition.onresult = (event: any) => {
          const current = event.resultIndex
          const transcriptText = event.results[current][0].transcript
          
          // Basic speaker diarization mock (alternating or based on keywords)
          // In a real app, you'd use a diarization API (like Deepgram or Whisper)
          const isDoctor = transcriptText.toLowerCase().includes("how are") || Math.random() > 0.5
          
          const m = Math.floor(timer / 60).toString().padStart(2, "0")
          const s = (timer % 60).toString().padStart(2, "0")

          addTranscript({
            speaker: isDoctor ? "Doctor" : "Patient",
            time: `${m}:${s}`,
            text: transcriptText.trim()
          })
        }

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          setIsRecording(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [timer, addTranscript, setIsRecording])

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((t) => t + 1)
      }, 1000)
    } else {
      setTimer(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

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
      
      const { data } = await response.json()
      setExtractionResults(data)
    } catch (error) {
      console.error("Extraction error:", error)
    } finally {
      setIsExtracting(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop
      setIsRecording(false)
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      // Trigger AI extraction when session stops
      triggerAIExtraction()
    } else {
      // Start
      setIsRecording(true)
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
        } catch(e) {
          console.error("Could not start recognition", e)
        }
      }
    }
  }

  return (
    <Card className="rounded-[14px] border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] bg-white">
      <CardHeader className="pb-3 pt-5 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#1D1D1F]">
            <div className="p-1 rounded-md bg-blue-50 text-[#0050cb]">
              <FileAudio className="h-3.5 w-3.5" />
            </div>
            Session Audio
          </CardTitle>
          <div className="flex items-center gap-2">
            {isRecording && (
              <span className="flex h-2 w-2 rounded-full bg-[#FF3B30] animate-pulse"></span>
            )}
            <span className="font-mono text-sm font-semibold tracking-wide text-[#3C3C43]">
              {formatTime(timer)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex flex-col items-center justify-center rounded-xl bg-[#F5F5F7] p-6 text-center">
          <Button
            size="icon"
            className={`h-16 w-16 rounded-full transition-colors shadow-sm ${
              isRecording 
                ? "bg-[#FF3B30] hover:bg-[#D70015] animate-pulse" 
                : "bg-[#0050cb] hover:bg-[#0040a8]"
            }`}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <Square className="h-6 w-6 text-white fill-white" />
            ) : (
               <Mic className="h-6 w-6 text-white" />
            )}
          </Button>
          <p className="mt-4 text-xs font-medium text-[#3C3C43]">
            {isRecording 
              ? "Recording in progress... Docto is listening." 
              : "Tap to start recording the clinical session"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
