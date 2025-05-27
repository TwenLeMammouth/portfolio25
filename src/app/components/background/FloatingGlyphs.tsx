"use client"

import React, { useEffect, useState } from "react"

const glyphSet = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᛞ", "ᚱ", "ᛉ", "✶", "⚛", "⟁", "⧫"]

type Glyph = {
  id: number
  x: number
  y: number
  size: number
  glyph: string
  delay: number
  animationName: string
}

export default function FloatingGlyphs() {
  const [glyphs, setGlyphs] = useState<Glyph[]>([])

  useEffect(() => {
    const newGlyphs = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 16 + Math.random() * 10,
      glyph: glyphSet[Math.floor(Math.random() * glyphSet.length)],
      delay: Math.random() * 4,
      animationName: `lightnessPulse${i}`,
    }))
    setGlyphs(newGlyphs)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {glyphs.map((g) => (
        <span
          key={g.id}
          className={`absolute animate-${g.animationName}`}
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            fontSize: `${g.size}px`,
            color: "oklch(65% 0.1866 156.76)",
            animation: `fadeFloat 8s ease-in-out ${g.delay}s infinite, ${g.animationName} 6s ease-in-out 0s infinite`,
          }}
        >
          {g.glyph}
        </span>
      ))}
    </div>
  )
}
