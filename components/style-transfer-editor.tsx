"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { FileUpload } from "@/components/file-upload"
import { CameraCapture } from "@/components/camera-capture"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { Palette, Upload, Camera, Wand2, Download, RefreshCw, ThumbsUp, ThumbsDown, Check } from "lucide-react"

const artisticStyles = [
  {
    id: "van-gogh",
    name: "Van Gogh",
    description: "Swirling brushstrokes and vibrant colors",
    preview: "/van-gogh-starry-night-style.jpg",
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "picasso",
    name: "Picasso",
    description: "Cubist geometric forms and bold shapes",
    preview: "/picasso-cubist-style.jpg",
    color: "bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "monet",
    name: "Monet",
    description: "Impressionist light and soft brushwork",
    preview: "/monet-impressionist-style.jpg",
    color: "bg-green-500/10 border-green-500/20",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese animation style with clean lines",
    preview: "/anime-art-style.png",
    color: "bg-pink-500/10 border-pink-500/20",
  },
  {
    id: "watercolor",
    name: "Watercolor",
    description: "Soft, flowing watercolor painting effect",
    preview: "/watercolor-painting-style.png",
    color: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: "oil-painting",
    name: "Oil Painting",
    description: "Rich, textured oil painting technique",
    preview: "/oil-painting-style.png",
    color: "bg-orange-500/10 border-orange-500/20",
  },
  {
    id: "sketch",
    name: "Pencil Sketch",
    description: "Hand-drawn pencil sketch appearance",
    preview: "/pencil-sketch-style.png",
    color: "bg-gray-500/10 border-gray-500/20",
  },
  {
    id: "pop-art",
    name: "Pop Art",
    description: "Bold colors and high contrast like Warhol",
    preview: "/pop-art-style.png",
    color: "bg-red-500/10 border-red-500/20",
  },
]

export function StyleTransferEditor() {
  const [inputImage, setInputImage] = useState<string | null>(null)
  const [styledImage, setStyledImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [inputMethod, setInputMethod] = useState<"upload" | "camera">("upload")

  // Style settings
  const [styleStrength, setStyleStrength] = useState([80])
  const [preserveFaces, setPreserveFaces] = useState(true)
  const [preserveColors, setPreserveColors] = useState(false)

  const handleStyleTransfer = async () => {
    if (!inputImage || !selectedStyle) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setStyledImage("/ai-edited-portrait-with-preserved-face.jpg")
      setIsProcessing(false)
    }, 3000)
  }

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId)
  }

  const selectedStyleData = artisticStyles.find((style) => style.id === selectedStyle)

  return (
    <div className="space-y-8">
      <NavigationBreadcrumb />

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
            <Palette className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Style Transfer</h1>
            <p className="text-muted-foreground">Apply artistic styles and filters while preserving facial features</p>
          </div>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          Artistic Styles • Face Preservation • Custom Filters
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input & Style Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Step 1: Upload Your Image
              </CardTitle>
              <CardDescription>Upload the image you want to apply artistic style to</CardDescription>
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

          {/* Style Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Step 2: Choose Artistic Style
              </CardTitle>
              <CardDescription>Select from our collection of famous artistic styles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {artisticStyles.map((style) => (
                  <div
                    key={style.id}
                    className={`relative cursor-pointer rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedStyle === style.id ? "border-primary shadow-lg" : `border-transparent ${style.color}`
                    }`}
                    onClick={() => handleStyleSelect(style.id)}
                  >
                    <div className="p-3 space-y-2">
                      <div className="aspect-square rounded-md overflow-hidden">
                        <img
                          src={style.preview || "/placeholder.svg"}
                          alt={style.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{style.name}</h4>
                        <p className="text-xs text-muted-foreground leading-tight">{style.description}</p>
                      </div>
                    </div>

                    {selectedStyle === style.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Style Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Style Settings</CardTitle>
              <CardDescription>Fine-tune how the style is applied to your image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Style Strength: {styleStrength[0]}%</Label>
                <Slider value={styleStrength} onValueChange={setStyleStrength} max={100} step={5} className="w-full" />
                <p className="text-xs text-muted-foreground">Higher values apply the style more strongly</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Preserve Faces</Label>
                    <p className="text-xs text-muted-foreground">Keep facial features recognizable</p>
                  </div>
                  <Switch checked={preserveFaces} onCheckedChange={setPreserveFaces} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Preserve Original Colors</Label>
                    <p className="text-xs text-muted-foreground">Maintain original color palette</p>
                  </div>
                  <Switch checked={preserveColors} onCheckedChange={setPreserveColors} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={handleStyleTransfer}
                disabled={!inputImage || !selectedStyle || isProcessing}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Applying {selectedStyleData?.name} Style...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-2" />
                    Apply {selectedStyleData?.name || "Artistic"} Style
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
              <CardDescription>Compare your original image with the styled version</CardDescription>
            </CardHeader>
            <CardContent>
              {styledImage ? (
                <div className="space-y-4">
                  <BeforeAfterSlider
                    beforeImage={inputImage}
                    afterImage={styledImage}
                    beforeLabel="Original"
                    afterLabel={selectedStyleData?.name || "Styled"}
                  />

                  {/* Style Info */}
                  {selectedStyleData && (
                    <div className={`p-3 rounded-lg ${selectedStyleData.color}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Palette className="h-4 w-4" />
                        <span className="font-medium text-sm">{selectedStyleData.name} Style Applied</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{selectedStyleData.description}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button onClick={handleStyleTransfer} variant="outline" className="flex-1 bg-transparent">
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
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        High Quality ({selectedStyleData?.name})
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Web Optimized
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Palette className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                      {!inputImage
                        ? "Upload an image to get started"
                        : !selectedStyle
                          ? "Select an artistic style"
                          : "Click 'Apply Style' to see results"}
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
          <CardTitle>Tips for Best Style Transfer Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Image Quality</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Use high-resolution images</li>
                <li>• Ensure good lighting</li>
                <li>• Avoid heavily compressed images</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Style Selection</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Try different styles for variety</li>
                <li>• Adjust strength for subtlety</li>
                <li>• Use face preservation for portraits</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Best Subjects</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Portraits work excellently</li>
                <li>• Landscapes are great for painting styles</li>
                <li>• Clear subjects without clutter</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
