"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CameraCapture } from "./camera-capture"
import { FileUpload } from "./file-upload"
import { Camera, Upload, ImageIcon, X, Eye } from "lucide-react"

type InputMethod = "camera" | "upload" | "gallery"

interface InputSectionProps {
  inputImage: string | null
  setInputImage: (image: string | null) => void
}

export function InputSection({ inputImage, setInputImage }: InputSectionProps) {
  const [inputMethod, setInputMethod] = useState<InputMethod>("upload")
  const [autoDetectFaces, setAutoDetectFaces] = useState(true)
  const [detectedFaces, setDetectedFaces] = useState<number>(0)
  const [isProcessingFaces, setIsProcessingFaces] = useState(false)

  const handleImageCapture = useCallback(
    (imageData: string) => {
      setInputImage(imageData)
      if (autoDetectFaces) {
        setIsProcessingFaces(true)
        // Simulate face detection
        setTimeout(() => {
          setDetectedFaces(Math.floor(Math.random() * 3) + 1)
          setIsProcessingFaces(false)
        }, 1500)
      }
    },
    [setInputImage, autoDetectFaces],
  )

  const handleClearInput = () => {
    setInputImage(null)
    setDetectedFaces(0)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5" />
          <span>Image Input</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Method Selector */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Input Method</Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={inputMethod === "camera" ? "default" : "outline"}
              size="sm"
              onClick={() => setInputMethod("camera")}
              className="flex items-center space-x-2"
            >
              <Camera className="h-4 w-4" />
              <span>Camera</span>
            </Button>
            <Button
              variant={inputMethod === "upload" ? "default" : "outline"}
              size="sm"
              onClick={() => setInputMethod("upload")}
              className="flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
            <Button
              variant={inputMethod === "gallery" ? "default" : "outline"}
              size="sm"
              onClick={() => setInputMethod("gallery")}
              className="flex items-center space-x-2"
              disabled
            >
              <ImageIcon className="h-4 w-4" />
              <span>Gallery</span>
              <Badge variant="secondary" className="text-xs">
                Soon
              </Badge>
            </Button>
          </div>
        </div>

        {/* Input Interface */}
        <div className="space-y-4">
          {inputMethod === "camera" && <CameraCapture onCapture={handleImageCapture} />}

          {inputMethod === "upload" && <FileUpload onUpload={handleImageCapture} />}

          {inputMethod === "gallery" && (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Gallery feature coming soon</p>
            </div>
          )}
        </div>

        {/* Image Preview */}
        {inputImage && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Preview</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearInput}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>

            <div className="relative">
              <img
                src={inputImage || "/placeholder.svg"}
                alt="Input preview"
                className="w-full max-w-md mx-auto rounded-lg border border-border"
              />

              {/* Face Detection Overlay */}
              {autoDetectFaces && detectedFaces > 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: detectedFaces }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute border-2 border-green-500 rounded"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${25 + i * 10}%`,
                        width: "25%",
                        height: "35%",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Face Detection Status */}
            {autoDetectFaces && (
              <div className="flex items-center justify-center space-x-2 text-sm">
                {isProcessingFaces ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    <span className="text-muted-foreground">Detecting faces...</span>
                  </>
                ) : detectedFaces > 0 ? (
                  <>
                    <Eye className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">
                      {detectedFaces} face{detectedFaces > 1 ? "s" : ""} detected
                    </span>
                  </>
                ) : (
                  <span className="text-yellow-600">No faces detected</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Preprocessing Options */}
        <div className="space-y-4 pt-4 border-t border-border">
          <Label className="text-sm font-medium">Preprocessing</Label>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Auto-detect face(s)</Label>
              <p className="text-xs text-muted-foreground">Automatically identify and protect faces in the image</p>
            </div>
            <Switch checked={autoDetectFaces} onCheckedChange={setAutoDetectFaces} />
          </div>
        </div>

        {/* File Info */}
        {inputImage && (
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
            <p>Supported formats: JPG, PNG (max 10MB)</p>
            <p>For best results, use high-quality images with clear faces</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
