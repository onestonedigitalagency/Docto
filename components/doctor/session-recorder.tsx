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
    <Card className="elevation-1 border-doc-surface-elevated bg-doc-surface text-doc-text">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <FileAudio className="h-5 w-5 text-doc-accent-cyan" />
            Session Audio
          </CardTitle>
          <div className="flex items-center gap-2">
            {isRecording && (
              <span className="flex h-3 w-3 rounded-full bg-doc-accent-red animate-pulse"></span>
            )}
            <span className="font-mono text-lg font-bold text-doc-text-secondary">
              {formatTime(timer)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-doc-surface-overlay bg-doc-surface-elevated p-8 text-center">
          <Button
            size="icon"
            className={`h-20 w-20 rounded-full transition-all ${
              isRecording 
                ? "bg-doc-accent-red hover:bg-doc-accent-red/90 animate-pulse-recording" 
                : "bg-doc-primary hover:bg-doc-primary-light"
            }`}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <Square className="h-8 w-8 text-white fill-white" />
            ) : (
              <Mic className="h-8 w-8 text-white" />
            )}
          </Button>
          <p className="mt-4 text-sm text-doc-text-secondary">
            {isRecording 
              ? "Recording in progress... Docto is listening." 
              : "Tap to start recording the clinical session"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
