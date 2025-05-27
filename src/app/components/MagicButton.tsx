// components/ui/MagicButton.tsx
"use client"
import React from 'react'
import { cn } from '../utils/cn'

type Props = {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function MagicButton({ text, onClick, type = 'button', className }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        `relative px-6 py-3 rounded-full font-bold text-black 
         bg-[#12DD88] border-2 border-white shadow-md
         hover:shadow-lg hover:translate-y-[-2px] hover:brightness-110
         active:translate-y-0 active:scale-95
         transition-all duration-200 ease-out
         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`,
        className
      )}
    >
      {text}
      <span
        className="absolute inset-0 rounded-full animate-pulse bg-white opacity-0 pointer-events-none"
        style={{
          boxShadow: "0 0 8px 2px #12DD88",
          mixBlendMode: "soft-light"
        }}
      ></span>
    </button>
  )
}
