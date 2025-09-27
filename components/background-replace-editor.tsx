"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { FileUpload } from "@/components/file-upload"
import { CameraCapture } from "@/components/camera-capture"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ImageIcon, Upload, Camera, Wand2, Download, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"

const backgroundPresets = [
  "Professional office environment",
  "Beautiful sunset beach",
  "Modern minimalist studio",
  "Cozy coffee shop interior",
  "Urban city skyline",
  "Natural forest setting",
  "Elegant marble background",
  "Abstract gradient backdrop",
]

export function BackgroundReplaceEditor() {
  const [inputImage, setInputImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [backgroundPrompt, setBackgroundPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [inputMethod, setInputMethod] = useState<"upload" | "camera">("upload")

  const handleGenerate = async () => {
    if (!inputImage || !backgroundPrompt) return

    setIsProcessing(true)

    setTimeout(() => {
      setResultImage("/ai-edited-portrait-with-preserved-face.jpg")
      setIsProcessing(false)
    }, 3000)
  }

  return (
    <div className="space-y-8">
      <NavigationBreadcrumb />

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
            <ImageIcon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Background Replace</h1>
            <p className="text-muted-foreground">Change backgrounds while keeping subjects perfectly intact</p>
          </div>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          Smart Masking • Realistic Blending • Multiple Backgrounds
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Image
              </CardTitle>
              <CardDescription>Upload the image where you want to replace the background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={inputMethod === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMethod("upload")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button
                  variant={inputMethod === "camera" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMethod("camera")}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              </div>

              {inputMethod === "upload" ? (
                <FileUpload
                  onImageSelect={setInputImage}
                  selectedImage={inputImage}
                  placeholder="Drop your image here or click to browse"
                />
              ) : (
                <CameraCapture onCapture={setInputImage} capturedImage={inputImage} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Describe New Background</CardTitle>
              <CardDescription>Describe the background you want to add to your image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g., Professional office with modern furniture and large windows..."
                value={backgroundPrompt}
                onChange={(e) => setBackgroundPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={300}
              />

              <div className="text-sm text-muted-foreground">{backgroundPrompt.length}/300 characters</div>

              {/* Background Presets */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Quick Presets</h4>
                <div className="grid grid-cols-1 gap-2">
                  {backgroundPresets.slice(0, 4).map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto py-2 px-3 bg-transparent"
                      onClick={() => setBackgroundPrompt(preset)}
                    >
                      <span className="text-xs">{preset}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={handleGenerate}
                disabled={!inputImage || !backgroundPrompt || isProcessing}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Replacing Background...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-2" />
                    Replace Background
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview & Results</CardTitle>
              <CardDescription>Compare the original image with the new background</CardDescription>
            </CardHeader>
            <CardContent>
              {resultImage ? (
                <div className="space-y-4">
                  <BeforeAfterSlider
                    beforeImage={inputImage}
                    afterImage={resultImage}
                    beforeLabel="Original"
                    afterLabel="New Background"
                  />

                  <div className="flex gap-2">
                    <Button onClick={handleGenerate} variant="outline" className="flex-1 bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button variant="outline" size="icon">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download Result
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Upload an image and describe the background to get started</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
