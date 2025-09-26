"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "./theme-provider"
import { HelpCircle, Settings, Info, Moon, Sun, Github, ExternalLink } from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [apiKey, setApiKey] = useState("")
  const [showHelp, setShowHelp] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  const helpTips = [
    "Try: 'Change outfit to formal suit, keep face unchanged'",
    "Try: 'Add sunglasses while preserving identity'",
    "Try: 'Change background to beach scene'",
    "Try: 'Apply vintage filter but keep face natural'",
    "Use specific descriptions for better results",
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">NanoPreserve Editor</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">AI-Powered Image Editing</p>
            </div>
          </div>
        </div>

        {/* Subtitle - Hidden on mobile */}
        <div className="hidden lg:block text-center">
          <p className="text-sm text-muted-foreground">
            Edit photos while preserving faces & identity. Powered by Gemini Nano.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          {/* Help Dialog */}
          <Dialog open={showHelp} onOpenChange={setShowHelp}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Help</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Quick Tips & Sample Prompts</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Sample Prompts:</h4>
                  <ul className="space-y-2">
                    {helpTips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground bg-muted p-2 rounded">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>• Enable "Auto-detect face(s)" for better preservation</p>
                  <p>• Use higher edit strength for dramatic changes</p>
                  <p>• Try different style presets for varied results</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Settings Dialog */}
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Toggle between light and dark themes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>

                {/* API Key */}
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key (Optional)</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your Gemini API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">For higher usage limits and priority processing</p>
                </div>

                {/* Language Selector */}
                <div className="space-y-2">
                  <Label>Language</Label>
                  <select className="w-full p-2 border border-input bg-background rounded-md text-sm">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* About Dialog */}
          <Dialog open={showAbout} onOpenChange={setShowAbout}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Info className="h-4 w-4" />
                <span className="sr-only">About</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>About NanoPreserve Editor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  An AI-powered image editing tool that preserves facial identity while allowing creative
                  transformations. Built with cutting-edge face detection and preservation technology.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium">Links</h4>
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start h-auto p-2" asChild>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View on GitHub
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="justify-start h-auto p-2" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Info className="h-4 w-4 mr-2" />
                        Documentation
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground pt-4 border-t">
                  <p>Version 1.0.0</p>
                  <p>© 2025 NanoPreserve Editor. Built with React, Next.js, and Gemini AI.</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
