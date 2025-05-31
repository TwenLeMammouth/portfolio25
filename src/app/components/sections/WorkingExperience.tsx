// File: src/app/components/WorkingExperience.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ExperienceCard from '@/app/components/ExperienceCard'
import dynamic from 'next/dynamic'
import { Experience, Location, Trip } from '@/app/types/typings'

// Chargement dynamique du composant 3D
const EarthCanvas = dynamic(
  () => import('@/app/components/background/Earth'),
  { ssr: false }
)

type Props = {
  experiences: Experience[]
  locations: Location[]
  trips: Trip[]
}

export default function WorkingExperience({ experiences, locations, trips }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.3,  // déclenche quand 30% de la section est visible
    triggerOnce: true, // n'observe qu'une fois
  })
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    if (inView && !hasBeenInView) {
      setHasBeenInView(true)
    }
  }, [inView, hasBeenInView])

  const lastIdx = experiences.length - 1
  const [currentIdx, setCurrentIdx] = useState(lastIdx)

  const goToNext = () => setCurrentIdx(idx => (idx + 1) % experiences.length)
  const goToPrev = () => setCurrentIdx(idx => (idx - 1 + experiences.length) % experiences.length)
  const reset = () => setCurrentIdx(0)

  return (
    <div ref={ref} className="relative h-[100dvh] w-full overflow-hidden flex flex-col md:block">
      {/* 2. Globe 3D à droite (75% de largeur) */}
      <div className="relative w-full h-[30dvh] md:absolute md:inset-y-0 md:right-0 md:w-3/4 md:h-full z-10">
        {hasBeenInView && (
          <EarthCanvas
            experiences={experiences}
            locations={locations}
            trips={trips}
            focusIdx={currentIdx}
            paused={!inView}
          />
        )}
      </div>

      {/* 🧠 Titre global centré en haut */}
      {/* <h3 className="pageTitle absolute top-10 left-1/2 -translate-x-1/2 z-30">Experience</h3> */}

      {/* 🪟 Panel gauche */}
      <div className="relative w-full h-[75dvh] sm:h-[100dvh] flex-grow px-2 pb-8 pt-0 md:absolute md:inset-y-0 md:left-0 md:w-2/5 md:px-6 md:py-24 flex items-center justify-center z-20">
        <div className="w-full max-w-2xl h-full rounded-2xl border border-white/30 bg-white/5 backdrop-blur-[1px] shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden">
          
          {/* EFFET DE LUMIÈRE */}
          <div className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[140%] before:h-[140%] before:rounded-full before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:blur-2xl" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full h-full p-2 md:p-8 flex flex-col justify-center items-center gap-2 md:gap-8"
          >
            {/* Carte */}
            <div className="w-full">
              <ExperienceCard experience={experiences[currentIdx]} />
            </div>

            {/* Boutons */}
            <div className="flex gap-2 md:gap-4 w-full justify-between">
              <button
                onClick={goToPrev}
                className="flex-1 py-1 md:py-2 text-sm md:text-lg bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20"
              >
                Previous
              </button>
              <button
                onClick={reset}
                className="flex-1 py-1 md:py-2 text-sm md:text-lg bg-[#12DD88]/80 hover:bg-[#12DD88] text-black font-bold rounded-md shadow-md"
              >
                Beggining
              </button>
              <button
                onClick={goToNext}
                className="flex-1 py-1 md:py-2 text-sm md:text-lg bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20"
              >
                Next
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
