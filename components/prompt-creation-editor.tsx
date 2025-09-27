"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { FileUpload } from "@/components/file-upload"
import { CameraCapture } from "@/components/camera-capture"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import {
  Wand2,
  Upload,
  Camera,
  Sparkles,
  Settings,
  Download,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Grid3X3,
  Lightbulb,
} from "lucide-react"

const promptTemplates = [
  "Change the background to a beautiful sunset beach",
  "Transform into a professional business portrait",
  "Add elegant formal clothing while keeping the face unchanged",
  "Change the setting to a cozy coffee shop",
  "Apply vintage film photography style",
  "Transform into a fantasy character with magical elements",
  "Change outfit to casual streetwear",
  "Add artistic lighting and dramatic shadows",
]

const stylePresets = [
  { value: "realistic", label: "Realistic" },
  { value: "artistic", label: "Artistic" },
  { value: "vintage", label: "Vintage" },
  { value: "cinematic", label: "Cinematic" },
  { value: "anime", label: "Anime" },
  { value: "cartoon", label: "Cartoon" },
]

export function PromptCreationEditor() {
  const [inputImage, setInputImage] = useState<string | null>(null)
  const [editedImage, setEditedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [inputMethod, setInputMethod] = useState<"upload" | "camera">("upload")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [variants, setVariants] = useState<string[]>([])
  const [showVariants, setShowVariants] = useState(false)

  // Advanced settings
  const [editStrength, setEditStrength] = useState([75])
  const [preserveFaces, setPreserveFaces] = useState(true)
  const [highRes, setHighRes] = useState(false)
  const [style, setStyle] = useState("realistic")

  const handleGenerate = async () => {
    if (!inputImage || !prompt) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setEditedImage("/ai-edited-portrait-with-preserved-face.jpg")
      setIsProcessing(false)
    }, 3000)
  }

  const handleGenerateVariants = () => {
    setVariants([
      "/ai-edited-portrait-variant-with-preserved-identity.jpg",
      "/portrait-variant-3.jpg",
      "/portrait-variant-4.jpg",
    ])
    setShowVariants(true)
  }

  const handleTemplateSelect = (template: string) => {
    setPrompt(template)
  }

  return (
    <div className="space-y-8">
      <NavigationBreadcrumb />

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
            <Wand2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Create with Prompts</h1>
            <p className="text-muted-foreground">Generate and edit images using AI prompts and natural language</p>
          </div>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          Most Versatile • Text-to-Image • Advanced Controls
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Input Image (Optional)
              </CardTitle>
              <CardDescription>Upload an image to edit, or leave empty to generate from scratch</CardDescription>
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
                  placeholder="Drop image here or click to browse (optional)"
                />
              ) : (
                <CameraCapture onCapture={setInputImage} capturedImage={inputImage} />
              )}
            </CardContent>
          </Card>

          {/* Prompt Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Describe Your Vision
              </CardTitle>
              <CardDescription>Describe what you want to create or how you want to edit the image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g., Transform into a professional headshot with a modern office background, keeping the face unchanged..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={500}
              />

              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{prompt.length}/500 characters</span>
                <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                  <Settings className="h-4 w-4 mr-2" />
                  {showAdvanced ? "Hide" : "Show"} Advanced
                </Button>
              </div>

              {/* Prompt Templates */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Quick Templates</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {promptTemplates.slice(0, 4).map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto py-2 px-3 bg-transparent"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <span className="text-xs leading-relaxed">{template}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Advanced Settings */}
              {showAdvanced && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>Edit Strength: {editStrength[0]}%</Label>
                      <Slider
                        value={editStrength}
                        onValueChange={setEditStrength}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Style Preset</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {stylePresets.map((preset) => (
                            <SelectItem key={preset.value} value={preset.value}>
                              {preset.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Preserve Faces</Label>
                      <p className="text-xs text-muted-foreground">Keep facial features unchanged</p>
                    </div>
                    <Switch checked={preserveFaces} onCheckedChange={setPreserveFaces} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>High Resolution Output</Label>
                      <p className="text-xs text-muted-foreground">Generate larger, higher quality images</p>
                    </div>
                    <Switch checked={highRes} onCheckedChange={setHighRes} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt || isProcessing}
                  className="flex-1 h-12 text-lg"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>

                {editedImage && (
                  <Button onClick={handleGenerateVariants} variant="outline" size="lg" className="h-12 bg-transparent">
                    <Grid3X3 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview & Results</CardTitle>
              <CardDescription>
                {inputImage ? "Compare original with generated result" : "Generated image will appear here"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editedImage ? (
                <div className="space-y-4">
                  {inputImage ? (
                    <BeforeAfterSlider
                      beforeImage={inputImage}
                      afterImage={editedImage}
                      beforeLabel="Original"
                      afterLabel="Generated"
                    />
                  ) : (
                    <div className="space-y-2">
                      <img
                        src={editedImage || "/placeholder.svg"}
                        alt="Generated result"
                        className="w-full rounded-lg"
                      />
                      <p className="text-sm text-center text-muted-foreground">Generated from prompt</p>
                    </div>
                  )}

                  {/* Action Buttons */}
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

                  <Separator />

                  {/* Download & Share */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Sparkles className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {prompt ? "Click 'Generate Image' to create" : "Enter a prompt to get started"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Variants */}
          {showVariants && variants.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid3X3 className="h-5 w-5" />
                  Variants
                </CardTitle>
                <CardDescription>Different interpretations of your prompt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {variants.map((variant, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={variant || "/placeholder.svg"}
                        alt={`Variant ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button size="sm" variant="secondary">
                          Select
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
