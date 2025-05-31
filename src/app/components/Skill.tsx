"use client"

import React from 'react'
import { Skill as SkillType } from '@/app/types/typings'
import Image from 'next/image'

type Props = {
  skill: SkillType
  directionLeft?: boolean
}

export default function Skill({ skill }: Props) {
  const isPlaceholder = !skill.title

  return (
    <div
      className={`relative flex flex-col items-center justify-center
        aspect-square w-3/4 md:w-1/2 p-1 
        border rounded-xl transition-all duration-300
        ${isPlaceholder
          ? 'bg-white/5 border-white/10 text-zinc-600 cursor-default'
          : 'bg-white/5 backdrop-blur-md border-white/10 hover:shadow-[0_0_15px_#12DD88]'}
      `}
    >
      {/* Logo */}
      <div className="relative w-3/5 h-3/5">
        {isPlaceholder ? (
          <div className="w-full h-full rounded-lg bg-zinc-800/30" />
        ) : (
          <Image
            src={skill.imageUrl}
            alt={skill.title}
            fill
            className="object-contain w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Titre */}
      <h3 className={`mt-2 text-xs sm:text-sm font-medium text-center ${isPlaceholder ? 'text-zinc-600' : 'text-white'}`}>
        {isPlaceholder ? '—' : skill.title}
      </h3>
    </div>
  )
}
