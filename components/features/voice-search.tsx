"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2 } from "lucide-react"

interface VoiceSearchProps {
  onResult: (transcript: string) => void
  onError?: (error: string) => void
}

export default function VoiceSearch({ onResult, onError }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()

      const recognition = recognitionRef.current
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)

        if (finalTranscript) {
          onResult(finalTranscript)
        }
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        if (onError) {
          onError(`Speech recognition error: ${event.error}`)
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onResult, onError])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  if (!isSupported) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center space-y-2">
            <Volume2 className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Voice search is not supported in your browser</p>
            <Badge variant="outline">Try Chrome, Safari, or Edge</Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="lg"
              onClick={isListening ? stopListening : startListening}
              className="rounded-full w-16 h-16"
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
          </div>

          <div className="text-center space-y-2">
            {isListening ? (
              <>
                <Badge variant="secondary" className="animate-pulse">
                  Listening...
                </Badge>
                <p className="text-sm text-muted-foreground">Speak now to search for movies</p>
              </>
            ) : (
              <>
                <Badge variant="outline">Ready</Badge>
                <p className="text-sm text-muted-foreground">Click the microphone to start voice search</p>
              </>
            )}
          </div>

          {transcript && (
            <div className="w-full p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <span className="font-medium">You said:</span> "{transcript}"
              </p>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center max-w-sm">
            Try saying: "Show me action movies from 2020" or "Find comedies with high ratings"
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
