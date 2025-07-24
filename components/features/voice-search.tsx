"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, XCircle } from "lucide-react"
import { toast } from "sonner"
import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "web-speech-api-types"

interface VoiceSearchProps {
  onVoiceResult: (transcript: string) => void
  onListeningChange?: (isListening: boolean) => void
}

export function VoiceSearch({ onVoiceResult, onListeningChange }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const isBrowserSupported =
    (typeof window !== "undefined" && "SpeechRecognition" in window) || "webkitSpeechRecognition" in window

  useEffect(() => {
    if (!isBrowserSupported) {
      toast.error("Speech Recognition not supported", {
        description: "Your browser does not support the Web Speech API. Please try Chrome, Safari, or Edge.",
      })
      return
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    const recognition = recognitionRef.current

    recognition.continuous = false // Listen for a single utterance
    recognition.interimResults = true // Get interim results
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      onListeningChange?.(true)
      setTranscript("")
      toast.info("Voice Search", { description: "Listening for your command..." })
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interimTranscript += result[0].transcript
        }
      }
      setTranscript(finalTranscript || interimTranscript)
      if (finalTranscript) {
        onVoiceResult(finalTranscript)
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      onListeningChange?.(false)
      if (!transcript) {
        toast.warning("Voice Search", { description: "No speech detected or recognized." })
      } else {
        toast.success("Voice Search", { description: "Processing your command." })
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false)
      onListeningChange?.(false)
      console.error("Speech recognition error:", event.error)
      let errorMessage = "An unknown error occurred."
      switch (event.error) {
        case "no-speech":
          errorMessage = "No speech detected. Please try again."
          break
        case "audio-capture":
          errorMessage = "No microphone found or access denied. Please check your microphone settings."
          break
        case "not-allowed":
          errorMessage = "Microphone access denied. Please allow microphone access in your browser settings."
          break
        case "network":
          errorMessage = "Network error during speech recognition."
          break
        case "bad-grammar":
          errorMessage = "Speech recognition failed due to bad grammar."
          break
        case "language-not-supported":
          errorMessage = "The requested language is not supported."
          break
        default:
          errorMessage = `Speech recognition error: ${event.error}`
      }
      toast.error("Voice Search Error", { description: errorMessage })
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onVoiceResult, onListeningChange, isBrowserSupported, transcript])

  const toggleListening = () => {
    if (!isBrowserSupported) {
      toast.error("Speech Recognition not supported", {
        description: "Your browser does not support the Web Speech API. Please try Chrome, Safari, or Edge.",
      })
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      setTranscript("") // Clear previous transcript before starting
      recognitionRef.current?.start()
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={toggleListening}
        variant="outline"
        size="icon"
        className={`rounded-full w-16 h-16 transition-colors ${isListening ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"}`}
        aria-label={isListening ? "Stop listening" : "Start voice search"}
        disabled={!isBrowserSupported}
      >
        {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
      </Button>
      {transcript && (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
          <span>{transcript}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setTranscript("")}
            aria-label="Clear transcript"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!isBrowserSupported && (
        <p className="text-sm text-red-500 text-center">Voice search not supported in this browser.</p>
      )}
    </div>
  )
}
