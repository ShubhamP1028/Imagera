"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { InputSection } from "@/components/input-section"
import { EditingControls } from "@/components/editing-controls"
import { PreviewSection } from "@/components/preview-section"
import { OutputSection } from "@/components/output-section"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function NanoPreserveEditor() {
  const [inputImage, setInputImage] = useState<string | null>(null)
  const [editedImage, setEditedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [editPrompt, setEditPrompt] = useState("")
  const [editSettings, setEditSettings] = useState({
    strength: 75,
    preserveFaces: true,
    highRes: false,
    multiface: false,
    style: "realistic",
  })

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-7xl">
            <InputSection inputImage={inputImage} setInputImage={setInputImage} />

            <EditingControls
              prompt={editPrompt}
              setPrompt={setEditPrompt}
              settings={editSettings}
              setSettings={setEditSettings}
              onGenerate={() => {
                setIsProcessing(true)
                // Simulate processing
                setTimeout(() => {
                  setEditedImage("/ai-edited-portrait-with-preserved-face.jpg")
                  setIsProcessing(false)
                }, 3000)
              }}
              disabled={!inputImage || !editPrompt}
              isProcessing={isProcessing}
            />

            <PreviewSection originalImage={inputImage} editedImage={editedImage} isProcessing={isProcessing} />

            <OutputSection
              editedImage={editedImage}
              onRegenerate={() => {
                setIsProcessing(true)
                setTimeout(() => {
                  setEditedImage("/ai-edited-portrait-variant-with-preserved-identity.jpg")
                  setIsProcessing(false)
                }, 2000)
              }}
            />
          </main>

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
