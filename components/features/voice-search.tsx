"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2 } from "lucide-react"
import SpeechRecognition from "speech-recognition"

interface VoiceSearchProps {
  onSearch: (query: string) => void
}

export default function VoiceSearch({ onSearch }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any | null>(null)

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      setTranscript(transcript)

      if (event.results[current].isFinal) {
        onSearch(transcript)
        setTranscript("")
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  return (
    <div className="space-y-2">
      <Button
        variant={isListening ? "destructive" : "outline"}
        onClick={isListening ? stopListening : startListening}
        className="w-full"
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 mr-2" />
            Stop Listening
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-2" />
            Voice Search
          </>
        )}
      </Button>

      {isListening && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-sm font-medium">Listening...</span>
            </div>
            {transcript && <p className="text-sm text-muted-foreground">"{transcript}"</p>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
