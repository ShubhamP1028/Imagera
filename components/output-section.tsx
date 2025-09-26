"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Download, Share2, Copy, ChevronDown, FileImage, RotateCcw, Check, ExternalLink, Settings } from "lucide-react"

interface OutputSectionProps {
  editedImage: string | null
  onRegenerate: () => void
}

export function OutputSection({ editedImage, onRegenerate }: OutputSectionProps) {
  const [downloadFormat, setDownloadFormat] = useState<"jpg" | "png">("jpg")
  const [downloadQuality, setDownloadQuality] = useState(90)
  const [shareUrl, setShareUrl] = useState("")
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showDownloadOptions, setShowDownloadOptions] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDownload = async (format: "jpg" | "png" = downloadFormat) => {
    if (!editedImage) return

    try {
      // Create a temporary link element
      const link = document.createElement("a")
      link.href = editedImage
      link.download = `nanopreserve-edit-${Date.now()}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const handleCopyToClipboard = async () => {
    if (!editedImage) return

    try {
      // Convert image to blob and copy to clipboard
      const response = await fetch(editedImage)
      const blob = await response.blob()
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Copy failed:", error)
    }
  }

  const handleShare = () => {
    // Generate a mock share URL
    const mockUrl = `https://nanopreserve.app/share/${Math.random().toString(36).substr(2, 9)}`
    setShareUrl(mockUrl)
    setShowShareDialog(true)
  }

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Copy URL failed:", error)
    }
  }

  if (!editedImage) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Output & Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Generate an edit to access download options</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Output & Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          {/* Download Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => handleDownload("jpg")}>
                <FileImage className="h-4 w-4 mr-2" />
                Download as JPG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("png")}>
                <FileImage className="h-4 w-4 mr-2" />
                Download as PNG
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowDownloadOptions(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Download Options
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Share Button */}
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          {/* Copy to Clipboard */}
          <Button variant="outline" onClick={handleCopyToClipboard}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy"}
          </Button>

          {/* Regenerate */}
          <Button variant="outline" onClick={onRegenerate}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
        </div>

        {/* Image Info */}
        <div className="bg-muted p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Output Information</span>
            <Badge variant="secondary">Ready</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Format:</span>
              <span className="ml-2 font-medium">JPEG</span>
            </div>
            <div>
              <span className="text-muted-foreground">Quality:</span>
              <span className="ml-2 font-medium">High</span>
            </div>
            <div>
              <span className="text-muted-foreground">Resolution:</span>
              <span className="ml-2 font-medium">1024×1024</span>
            </div>
            <div>
              <span className="text-muted-foreground">Size:</span>
              <span className="ml-2 font-medium">~2.1 MB</span>
            </div>
          </div>
        </div>

        {/* Privacy & Safety */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Privacy & Safety</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span>Auto-delete after 30 minutes</span>
                <p className="text-xs text-muted-foreground">Automatically remove from our servers</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span>Embed AI watermark</span>
                <p className="text-xs text-muted-foreground">Add transparent watermark for transparency</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Download Options Dialog */}
        <Dialog open={showDownloadOptions} onOpenChange={setShowDownloadOptions}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Download Options</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Format</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={downloadFormat === "jpg" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDownloadFormat("jpg")}
                  >
                    JPG
                  </Button>
                  <Button
                    variant={downloadFormat === "png" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDownloadFormat("png")}
                  >
                    PNG
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">JPG for smaller files, PNG for transparency support</p>
              </div>

              {downloadFormat === "jpg" && (
                <div className="space-y-3">
                  <Label>Quality: {downloadQuality}%</Label>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={downloadQuality}
                    onChange={(e) => setDownloadQuality(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Higher quality = larger file size</p>
                </div>
              )}

              <Button
                onClick={() => {
                  handleDownload()
                  setShowDownloadOptions(false)
                }}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download {downloadFormat.toUpperCase()}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share Dialog */}
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Your Edit</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Share Link</Label>
                <div className="flex space-x-2">
                  <Input value={shareUrl} readOnly className="flex-1" />
                  <Button variant="outline" size="icon" onClick={copyShareUrl}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Link expires in 24 hours</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out my AI-edited photo!`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Facebook
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
