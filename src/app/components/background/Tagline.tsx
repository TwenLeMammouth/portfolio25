"use client"

import React, { useEffect, useState } from "react"

const magicLines = [
  "Handcrafted Modern Magic.",
  "Built with precision,",
  "powered by imagination.",
]

export default function HeroMagicTagline() {
  const [visibleLines, setVisibleLines] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= magicLines.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-70 mt-8 text-center space-y-1 text-white/50">
      {magicLines.map((line, index) => (
        <p
          key={index}
          className={`text-xl md:text-3xl font-underdog transition-all duration-700 ease-out ${
            visibleLines > index
              ? "opacity-100 translate-y-0 glow-text glow-text-animated"
              : "opacity-0 -translate-y-2"
          }`}
        >
          {line}
        </p>
      ))}
    </div>
  )
}
