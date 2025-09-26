"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  zoom?: number
}

export function BeforeAfterSlider({ beforeImage, afterImage, zoom = 100 }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img
          src={beforeImage || "/placeholder.svg"}
          alt="Before"
          className="w-full h-full object-cover"
          style={{ transform: `scale(${zoom / 100})` }}
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-2 py-1 rounded">Before</div>
      </div>

      {/* After Image */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <img
          src={afterImage || "/placeholder.svg"}
          alt="After"
          className="w-full h-full object-cover"
          style={{ transform: `scale(${zoom / 100})` }}
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded">After</div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize"
          onMouseDown={handleMouseDown}
          onTouchStart={() => (isDragging.current = true)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => (isDragging.current = false)}
        >
          <div className="w-1 h-4 bg-gray-400 rounded-full mr-0.5" />
          <div className="w-1 h-4 bg-gray-400 rounded-full" />
        </div>
      </div>
    </div>
  )
}
