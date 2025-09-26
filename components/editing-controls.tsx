"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit3, ChevronDown, ChevronUp, Sparkles, Loader2, Lightbulb, Palette } from "lucide-react"

interface EditingControlsProps {
  prompt: string
  setPrompt: (prompt: string) => void
  settings: {
    strength: number
    preserveFaces: boolean
    highRes: boolean
    multiface: boolean
    style: string
  }
  setSettings: (settings: any) => void
  onGenerate: () => void
  disabled: boolean
  isProcessing: boolean
}

const PROMPT_TEMPLATES = [
  "Change outfit to formal suit, keep face unchanged",
  "Add sunglasses while preserving identity",
  "Change background to beach scene",
  "Apply vintage filter but keep face natural",
  "Transform into professional headshot",
  "Add winter clothing and snowy background",
  "Change hairstyle while keeping facial features",
  "Apply artistic painting style to background only",
]

const STYLE_PRESETS = [
  { value: "realistic", label: "Realistic", description: "Natural, photorealistic results" },
  { value: "vintage", label: "Vintage", description: "Classic, retro aesthetic" },
  { value: "cartoon", label: "Cartoon", description: "Stylized, animated look" },
  { value: "anime", label: "Anime", description: "Japanese animation style" },
  { value: "cinematic", label: "Cinematic", description: "Movie-like dramatic lighting" },
  { value: "artistic", label: "Artistic", description: "Painterly, creative interpretation" },
]

export function EditingControls({
  prompt,
  setPrompt,
  settings,
  setSettings,
  onGenerate,
  disabled,
  isProcessing,
}: EditingControlsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [charCount, setCharCount] = useState(prompt.length)

  const handlePromptChange = (value: string) => {
    if (value.length <= 500) {
      setPrompt(value)
      setCharCount(value.length)
    }
  }

  const handleTemplateSelect = (template: string) => {
    setPrompt(template)
    setCharCount(template.length)
    setShowTemplates(false)
  }

  const updateSettings = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Edit3 className="h-5 w-5" />
          <span>Editing Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prompt Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="prompt" className="text-sm font-medium">
              Edit Prompt
            </Label>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowTemplates(!showTemplates)} className="text-xs">
                <Lightbulb className="h-3 w-3 mr-1" />
                Templates
              </Button>
              <span className="text-xs text-muted-foreground">{charCount}/500</span>
            </div>
          </div>

          <Textarea
            id="prompt"
            placeholder="e.g. Change outfit to formal suit, keep face unchanged."
            value={prompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            className="min-h-[100px] resize-none"
          />

          {/* Template Suggestions */}
          {showTemplates && (
            <div className="space-y-2 p-3 bg-muted rounded-lg">
              <Label className="text-xs font-medium">Quick Templates:</Label>
              <div className="grid gap-2">
                {PROMPT_TEMPLATES.map((template, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-left h-auto p-2 text-xs"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Style Preset */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Style Preset</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-transparent">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>{STYLE_PRESETS.find((s) => s.value === settings.style)?.label || "Realistic"}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {STYLE_PRESETS.map((preset) => (
                <DropdownMenuItem
                  key={preset.value}
                  onClick={() => updateSettings("style", preset.value)}
                  className="flex flex-col items-start space-y-1"
                >
                  <span className="font-medium">{preset.label}</span>
                  <span className="text-xs text-muted-foreground">{preset.description}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">Advanced Options</span>
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 pt-4">
            {/* Edit Strength */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Edit Strength</Label>
                <Badge variant="secondary" className="text-xs">
                  {settings.strength}%
                </Badge>
              </div>
              <Slider
                value={[settings.strength]}
                onValueChange={(value) => updateSettings("strength", value[0])}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Higher values create more dramatic changes</p>
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Post-Process Preservation</Label>
                  <p className="text-xs text-muted-foreground">Extra blending to maintain facial features</p>
                </div>
                <Switch
                  checked={settings.preserveFaces}
                  onCheckedChange={(checked) => updateSettings("preserveFaces", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">High Resolution Output</Label>
                  <p className="text-xs text-muted-foreground">Generate larger, more detailed images</p>
                </div>
                <Switch checked={settings.highRes} onCheckedChange={(checked) => updateSettings("highRes", checked)} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Multi-Face Protect Mode</Label>
                  <p className="text-xs text-muted-foreground">Enhanced protection for multiple faces</p>
                </div>
                <Switch
                  checked={settings.multiface}
                  onCheckedChange={(checked) => updateSettings("multiface", checked)}
                />
              </div>
            </div>

            {/* Protect Accessories */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Protect Accessories</Label>
              <div className="flex flex-wrap gap-2">
                {["Hair", "Glasses", "Hat", "Jewelry"].map((accessory) => (
                  <Button key={accessory} variant="outline" size="sm" className="text-xs bg-transparent">
                    {accessory}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Select accessories to preserve during editing</p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Generate Button */}
        <div className="pt-4 border-t border-border">
          <Button
            onClick={onGenerate}
            disabled={disabled || isProcessing}
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Edit
              </>
            )}
          </Button>

          {disabled && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Please upload an image and enter a prompt to continue
            </p>
          )}
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">Processing with AI...</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Analyzing facial features</p>
              <p>• Applying style transformations</p>
              <p>• Preserving identity markers</p>
              <p>• Finalizing output</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
