"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Square, RotateCcw, AlertCircle } from "lucide-react"

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (err) {
      console.error("Camera access error:", err)
      setError("Camera access denied. Please enable camera permissions and try again.")
    }
  }, [facingMode])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
    }
  }, [])

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)

    const imageData = canvas.toDataURL("image/jpeg", 0.8)
    onCapture(imageData)
    stopCamera()
  }, [onCapture, stopCamera])

  const switchCamera = useCallback(() => {
    stopCamera()
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }, [stopCamera])

  useEffect(() => {
    if (facingMode && !isStreaming) {
      startCamera()
    }
  }, [facingMode, startCamera, isStreaming])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  if (error) {
    return (
      <Alert className="border-destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden camera-preview">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-64 object-cover" />

        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <Camera className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Starting camera...</p>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex justify-center space-x-2">
        <Button
          onClick={captureImage}
          disabled={!isStreaming}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Square className="h-5 w-5 mr-2" />
          Capture
        </Button>

        <Button onClick={switchCamera} disabled={!isStreaming} variant="outline" size="lg">
          <RotateCcw className="h-5 w-5 mr-2" />
          Flip
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Position your face in the center of the frame for best results
      </p>
    </div>
  )
}
