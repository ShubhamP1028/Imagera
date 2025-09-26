"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { BeforeAfterSlider } from "./before-after-slider"
import {
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Undo2,
  Grid3X3,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

interface PreviewSectionProps {
  originalImage: string | null
  editedImage: string | null
  isProcessing: boolean
}

export function PreviewSection({ originalImage, editedImage, isProcessing }: PreviewSectionProps) {
  const [viewMode, setViewMode] = useState<"side-by-side" | "slider" | "fullscreen">("side-by-side")
  const [zoom, setZoom] = useState(100)
  const [identitySimilarity, setIdentitySimilarity] = useState<number | null>(null)
  const [showVariants, setShowVariants] = useState(false)

  // Simulate identity similarity calculation
  useEffect(() => {
    if (editedImage && originalImage) {
      setTimeout(() => {
        setIdentitySimilarity(0.93 + Math.random() * 0.06) // 93-99% similarity
      }, 1000)
    } else {
      setIdentitySimilarity(null)
    }
  }, [editedImage, originalImage])

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))
  const handleResetZoom = () => setZoom(100)

  const getSimilarityStatus = (similarity: number) => {
    if (similarity >= 0.9) return { status: "excellent", color: "text-green-600", icon: CheckCircle }
    if (similarity >= 0.8) return { status: "good", color: "text-yellow-600", icon: AlertTriangle }
    return { status: "poor", color: "text-red-600", icon: AlertTriangle }
  }

  const mockVariants = [
    "/ai-edited-portrait-with-preserved-face.jpg",
    "/ai-edited-portrait-variant-with-preserved-identity.jpg",
    "/portrait-variant-3.jpg",
    "/portrait-variant-4.jpg",
  ]

  if (!originalImage && !isProcessing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Preview & Output</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Upload an image to see the preview</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Preview & Output</span>
          </CardTitle>

          {/* View Mode Controls */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "side-by-side" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("side-by-side")}
                className="text-xs px-2 py-1 h-7"
              >
                Side by Side
              </Button>
              <Button
                variant={viewMode === "slider" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("slider")}
                className="text-xs px-2 py-1 h-7"
              >
                Slider
              </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-[3rem] text-center">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleResetZoom}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Preview Area */}
        <div className="space-y-4">
          {isProcessing ? (
            <div className="flex items-center justify-center py-24 bg-muted rounded-lg">
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <div>
                  <p className="font-medium">Processing your image...</p>
                  <p className="text-sm text-muted-foreground">This may take a few moments</p>
                </div>
              </div>
            </div>
          ) : viewMode === "side-by-side" ? (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Original Image */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Original</Label>
                <div className="relative bg-muted rounded-lg overflow-hidden">
                  <img
                    src={originalImage || "/placeholder.svg"}
                    alt="Original image"
                    className="w-full h-auto object-cover"
                    style={{ transform: `scale(${zoom / 100})` }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Original
                  </div>
                </div>
              </div>

              {/* Edited Image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Edited</Label>
                  {identitySimilarity && (
                    <Badge variant="secondary" className={`text-xs ${getSimilarityStatus(identitySimilarity).color}`}>
                      {(() => {
                        const IconComponent = getSimilarityStatus(identitySimilarity).icon
                        return <IconComponent className="h-3 w-3 mr-1" />
                      })()}
                      {(identitySimilarity * 100).toFixed(0)}% similarity
                    </Badge>
                  )}
                </div>
                <div className="relative bg-muted rounded-lg overflow-hidden">
                  {editedImage ? (
                    <>
                      <img
                        src={editedImage || "/placeholder.svg"}
                        alt="Edited image"
                        className="w-full h-auto object-cover"
                        style={{ transform: `scale(${zoom / 100})` }}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        Edited
                      </div>
                    </>
                  ) : (
                    <div className="aspect-square flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Edited image will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Before / After Comparison</Label>
              <BeforeAfterSlider
                beforeImage={originalImage || "/placeholder.svg"}
                afterImage={editedImage || "/placeholder.svg"}
                zoom={zoom}
              />
            </div>
          )}
        </div>

        {/* Identity Similarity Meter */}
        {identitySimilarity && editedImage && (
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Identity Preservation</Label>
              <Badge variant="secondary" className={getSimilarityStatus(identitySimilarity).color}>
                {(() => {
                  const IconComponent = getSimilarityStatus(identitySimilarity).icon
                  return <IconComponent className="h-3 w-3 mr-1" />
                })()}
                {identitySimilarity >= 0.9
                  ? "Identity preserved"
                  : identitySimilarity >= 0.8
                    ? "Good preservation"
                    : "Possible face change"}
              </Badge>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  identitySimilarity >= 0.9
                    ? "bg-green-500"
                    : identitySimilarity >= 0.8
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${identitySimilarity * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {identitySimilarity >= 0.9
                ? "Excellent face preservation - identity maintained"
                : identitySimilarity >= 0.8
                  ? "Good preservation - minor changes detected"
                  : "Low similarity - consider retrying with stronger preservation"}
            </p>
          </div>
        )}

        {/* Result Feedback Row */}
        {editedImage && (
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Good
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsDown className="h-4 w-4 mr-1" />
                Poor
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-1" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm">
                <Undo2 className="h-4 w-4 mr-1" />
                Undo
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowVariants(!showVariants)}>
                <Grid3X3 className="h-4 w-4 mr-1" />
                Variants
              </Button>
            </div>
          </div>
        )}

        {/* Variants Grid */}
        {showVariants && editedImage && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Alternative Results</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockVariants.map((variant, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={variant || "/placeholder.svg"}
                    alt={`Variant ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg border border-border hover:border-primary transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                  <div className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
