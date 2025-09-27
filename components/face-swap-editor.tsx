"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { FileUpload } from "@/components/file-upload"
import { CameraCapture } from "@/components/camera-capture"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { Users, Upload, Camera, Wand2, Download, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"

export function FaceSwapEditor() {
  const [sourceImage, setSourceImage] = useState<string | null>(null)
  const [targetImage, setTargetImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [inputMethod, setInputMethod] = useState<"upload" | "camera">("upload")

  const handleSwap = async () => {
    if (!sourceImage || !targetImage) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setResultImage("/ai-edited-portrait-with-preserved-face.jpg")
          setIsProcessing(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleRegenerate = () => {
    setResultImage("/ai-edited-portrait-variant-with-preserved-identity.jpg")
  }

  return (
    <div className="space-y-8">
      <NavigationBreadcrumb />

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Face Swap</h1>
            <p className="text-muted-foreground">Swap faces between two images while preserving identity</p>
          </div>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          AI-Powered • Identity Preserving • High Quality
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Step 1: Source Face
              </CardTitle>
              <CardDescription>Upload or capture the face you want to use as the source</CardDescription>
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
                  onImageSelect={setSourceImage}
                  selectedImage={sourceImage}
                  placeholder="Drop source face image here or click to browse"
                />
              ) : (
                <CameraCapture onCapture={setSourceImage} capturedImage={sourceImage} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Step 2: Target Image
              </CardTitle>
              <CardDescription>Upload the image where you want to place the source face</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onImageSelect={setTargetImage}
                selectedImage={targetImage}
                placeholder="Drop target image here or click to browse"
              />
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={handleSwap}
                disabled={!sourceImage || !targetImage || isProcessing}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Processing Face Swap...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-2" />
                    Generate Face Swap
                  </>
                )}
              </Button>

              {isProcessing && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-muted-foreground text-center">
                    Analyzing faces and preserving identity...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview & Results</CardTitle>
              <CardDescription>Compare the original target image with the face-swapped result</CardDescription>
            </CardHeader>
            <CardContent>
              {resultImage ? (
                <div className="space-y-4">
                  <BeforeAfterSlider
                    beforeImage={targetImage}
                    afterImage={resultImage}
                    beforeLabel="Original"
                    afterLabel="Face Swapped"
                  />

                  {/* Identity Similarity */}
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">Identity Preserved</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                      94% Similarity
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button onClick={handleRegenerate} variant="outline" className="flex-1 bg-transparent">
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

                  <Separator />

                  {/* Download Options */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Download Options</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        High Quality
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Web Optimized
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Upload both images and click "Generate Face Swap" to see results
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Source Face</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Clear, well-lit face</li>
                <li>• Front-facing angle</li>
                <li>• High resolution</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Target Image</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Similar face angle</li>
                <li>• Good lighting</li>
                <li>• Unobstructed face</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Privacy</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Images auto-deleted</li>
                <li>• No data stored</li>
                <li>• Secure processing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
