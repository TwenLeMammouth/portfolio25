"use client"

import React from "react"
import { IconType } from "react-icons"

interface SoftSkillCardProps {
  title: string
  level: number
  icon: IconType
  description?: string
}

export default function SoftSkillCard({
  title,
  level,
  icon: Icon,
  description,
}: SoftSkillCardProps) {

  return (
    <div
      className={`
        flex flex-col justify-start gap-1.5
        w-full
        h-[17vh] sm:h-[150px] 
        p-3 sm:p-4 rounded-xl border transition-all duration-300
        bg-white/5 backdrop-blur-md border-white/10 hover:shadow-[0_0_10px_#12DD88]`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 md:mb-2">
        <div className="text-[#12DD88] text-lg">
          <Icon />
        </div>
        <h3 className="text-sm md:text-lg text-font-semibold text-white">
          {title}
        </h3>
      </div>

      {/* Level bar */}
      <div className="flex items-center gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = level > i
          const isMagic = i === 4 && level === 6
          return (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full border border-white/20
                ${isMagic 
                  ? "bg-[oklch(90%_0.2_160)] shadow-[0_0_8px_#12DD88] animate-pulse"
                  : filled 
                    ? "bg-[#12DD88]" 
                    : "bg-zinc-800"
                }`}
            />
          )
        })}
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-start leading-tight text-gray-400 line-clamp-4">
        {description}
      </p>
    </div>
  )
}
