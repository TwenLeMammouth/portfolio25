"use client"

import React, { useEffect, useState } from 'react'
// import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from '@/app/components/background/BackgroundCircles'
import HeroMagicTagline from '@/app/components/background/Tagline'
import Image from 'next/image'
import { PageInfo } from '@/app/types/typings'
import { useInView } from 'react-intersection-observer'
import CircularButtons from '../CircularButtons'

type Props = {
    pageInfo: PageInfo;
}

export default function Hero({ pageInfo }: Props) {

  const { ref, inView } = useInView({ threshold: 0.3 })
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    if (inView && !hasBeenInView) {
      setHasBeenInView(true)
    }
  }, [inView, hasBeenInView])

  // On ne garde que la fonction setter, la valeur n'est jamais utilisée
  const [, setUnlocked] = useState(false)

  useEffect(() => {
  let buffer = ""

  const listener = (e: KeyboardEvent) => {
    buffer += e.key.toLowerCase()
    buffer = buffer.slice(-4)

    if (buffer === "twen") {
      setUnlocked(true)
      window.dispatchEvent(new CustomEvent('lessons:unlock', { detail: 'twen' }))
    }
  }

  window.addEventListener('keydown', listener)
  return () => window.removeEventListener('keydown', listener)
}, [])
    
  if(pageInfo === undefined ) {
      return null
  }
    
  return (
    <div ref={ref} className="relative h-[100dvh] flex flex-col justify-center items-center text-center overflow-hidden">
  
      {/* Background */}
      {hasBeenInView && 
        <div className="absolute top-[38%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <BackgroundCircles />
        </div>
      }
  
      {/* Texte haut */}
      <div className="z-10 w-3/4 text-center space-y-2 absolute top-20 sm:top-24 md:top-32 lg:top-40 left-1/2 -translate-x-1/2">

        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-[Cinzel_Decorative] font-bold tracking-wider text-white">
          {"Vincent Groslier".split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block drop-shadow-[0_0_4px_#12DD88] ${
                char === " " ? "w-[1rem]" : ""
              }`}
            >
              {char}
            </span>
          ))}
        </h1>

        <h2 className="font-geistMono text-base sm:text-lg md:text-xl text-gray-200 tracking-wider">{pageInfo.role}</h2>
      </div>
  
    
      {/* Image centrée */}
      <div className="absolute z-20 top-2/5 sm:top-1/2 left-1/2 w-90 h-42 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[oklch(80%_0.1866_156.76)] to-[oklch(70%_0.1_156.76)] p-1">
        <div className="mb-5 sm:mb-20 flex justify-center">
          <Image
            src={pageInfo.heroImageUrl}
            alt="Hero"
            width={170}
            height={170}
            className="rounded-full object-cover h-[140px] w-[140px] sm:h-[170px] sm:w-[170px]"
            loading="eager"
          />
        </div>
      </div>

      {/* Phrase "Code Mage" */}
      <HeroMagicTagline />

      <CircularButtons />
  
      {/* Menu circulaire */}
      {/* <CircularMenu /> */}

    </div>
  ) 
}