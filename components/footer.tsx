"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Github, ExternalLink, Zap, Users, Shield } from "lucide-react"

export function Footer() {
  const apiUsage = 12
  const apiLimit = 50
  const usagePercentage = (apiUsage / apiLimit) * 100

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Status Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-6">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">API Status:</span>
              <Badge variant="secondary" className="text-green-600">
                Online
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">Usage today:</span>
              <span className="font-medium">
                {apiUsage}/{apiLimit}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Daily limit:</span>
              <div className="w-24">
                <Progress value={usagePercentage} className="h-2" />
              </div>
              <span className="text-xs text-muted-foreground">{Math.round(usagePercentage)}%</span>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* About */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Nano Editor for Newbies</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI-powered image editing that preserves facial identity while enabling creative transformations. Built
              with cutting-edge face detection and preservation technology.
            </p>
            <div className="flex items-center space-x-2">
              <Shield className="h-3 w-3 text-green-500" />
              <span className="text-xs text-muted-foreground">Privacy-first design</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Features</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Real-time face detection</li>
              <li>• Identity preservation technology</li>
              <li>• Multiple style presets</li>
              <li>• High-resolution output</li>
              <li>• Privacy-focused processing</li>
              <li>• Batch editing support</li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Resources</h3>
            <div className="space-y-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-3 w-3" />
                <span>Source Code</span>
                <ExternalLink className="h-2 w-2" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Documentation</span>
                <ExternalLink className="h-2 w-2" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>API Reference</span>
                <ExternalLink className="h-2 w-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <span>© Author - Shubham Pandey</span>
            <span>•</span>
            <span>Built with Gemini Flask 2.5 Image</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>

        {/* Current Status */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Current job status:</span>
            <Badge variant="secondary" className="text-green-600">
              Ready for new edits
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  )
}
