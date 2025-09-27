"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

const pageNames: Record<string, string> = {
  "/": "Home",
  "/face-swap": "Face Swap",
  "/create": "Create with Prompts",
  "/style-transfer": "Style Transfer",
  "/background-replace": "Background Replace",
  "/enhance": "AI Enhancement",
  "/try-on": "Virtual Try-On",
}

export function NavigationBreadcrumb() {
  const router = useRouter()
  const pathname = usePathname()

  const handleBack = () => {
    router.back()
  }

  const handleHome = () => {
    router.push("/")
  }

  const currentPageName = pageNames[pathname] || "Editor"

  return (
    <div className="flex items-center gap-4 mb-6">
      <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={handleHome} className="p-0 h-auto font-normal hover:text-foreground">
          <Home className="h-4 w-4 mr-1" />
          Home
        </Button>
        <span>/</span>
        <span className="text-foreground font-medium">{currentPageName}</span>
      </div>
    </div>
  )
}
