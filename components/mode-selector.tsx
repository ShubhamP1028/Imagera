"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Camera, Palette, Sparkles, Users, Wand2, ImageIcon } from "lucide-react"

const editingModes = [
  {
    id: "face-swap",
    title: "Face Swap",
    description: "Swap faces between two images while preserving identity and expressions",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    features: ["Identity preservation", "Expression matching", "High-quality output"],
    route: "/face-swap",
  },
  {
    id: "prompt-creation",
    title: "Create with Prompts",
    description: "Generate and edit images using AI prompts and natural language",
    icon: Wand2,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    features: ["Text-to-image", "Image editing", "Style control"],
    route: "/create",
  },
  {
    id: "style-transfer",
    title: "Style Transfer",
    description: "Apply artistic styles and filters while preserving facial features",
    icon: Palette,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    features: ["Artistic styles", "Face preservation", "Custom filters"],
    route: "/style-transfer",
  },
  {
    id: "background-replace",
    title: "Background Replace",
    description: "Change backgrounds while keeping subjects perfectly intact",
    icon: ImageIcon,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    features: ["Smart masking", "Realistic blending", "Multiple backgrounds"],
    route: "/background-replace",
  },
  {
    id: "enhancement",
    title: "AI Enhancement",
    description: "Enhance photo quality, lighting, and details with AI",
    icon: Sparkles,
    color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    features: ["Quality boost", "Lighting fix", "Detail enhancement"],
    route: "/enhance",
  },
  {
    id: "virtual-try-on",
    title: "Virtual Try-On",
    description: "Try on clothes, accessories, and makeup virtually",
    icon: Camera,
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    features: ["Clothing try-on", "Makeup simulation", "Accessory fitting"],
    route: "/try-on",
  },
]

export function ModeSelector() {
  const router = useRouter()
  const [hoveredMode, setHoveredMode] = useState<string | null>(null)

  const handleModeSelect = (route: string) => {
    router.push(route)
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            AI-Powered Image Editing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 ml-3">
              Creative Mode
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Select the perfect editing tool for your needs. Each mode is optimized for specific tasks while preserving
            facial identity and delivering professional results.
          </p>
        </div>
      </div>

      {/* Mode Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editingModes.map((mode) => {
          const IconComponent = mode.icon
          return (
            <Card
              key={mode.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 ${
                hoveredMode === mode.id ? "border-primary" : "border-border"
              }`}
              onMouseEnter={() => setHoveredMode(mode.id)}
              onMouseLeave={() => setHoveredMode(null)}
              onClick={() => handleModeSelect(mode.route)}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${mode.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl">{mode.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{mode.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Key Features:</h4>
                  <ul className="space-y-1">
                    {mode.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  variant="outline"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pt-8 border-t border-border">
        <h3 className="text-2xl font-semibold">Not sure which mode to choose?</h3>
        <p className="text-muted-foreground">
          Start with "Create with Prompts" for the most versatile editing experience.
        </p>
        <Button
          size="lg"
          onClick={() => handleModeSelect("/create")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Try Prompt Creation
          <Sparkles className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
