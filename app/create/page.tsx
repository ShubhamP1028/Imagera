"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { PromptCreationEditor } from "@/components/prompt-creation-editor"

export default function CreatePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
            <PromptCreationEditor />
          </main>

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
