"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  paused?: boolean
}

type Ring = {
  size: number
  lightness: number
  chroma?: number
  hue?: number
}

// const rings: Ring[] = [
//   { size: 1100, lightness: 0.4 },
//   { size: 800, lightness: 0.6 },
//   { size: 500, lightness: 0.8 },
//   { size: 200, lightness: 1 },
// ]

export default function BackgroundCircles({ paused }: Props) {
  const [rings, setRings] = useState<Ring[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 640
    const newRings = isMobile
      ? [
          { size: 400, lightness: 0.4 },
          { size: 320, lightness: 0.6 },
          { size: 240, lightness: 0.8 },
          { size: 160, lightness: 1 },
        ]
      : [
          { size: 1100, lightness: 0.4 },
          { size: 800, lightness: 0.6 },
          { size: 500, lightness: 0.8 },
          { size: 200, lightness: 1 },
        ]
    setRings(newRings)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="inset-0 flex items-center justify-center z-0 pointer-events-none"
    >
      {rings.map((ring, i) => {
        const white = i % 2 != 0 

        return (
          <motion.div
            key={i}
            className="absolute rounded-full border animate-pulse"
            style={{
              width: ring.size,
              height: ring.size,
              borderColor: white
                ? `oklch(${ring.lightness} 0 0)`
                : `oklch(${ring.lightness} 0.1866 156.76)`,
            }}
            animate={
              paused
                ? { scale: 1, opacity: 0.3 }
                : { scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }
            }
            transition={
              paused
                ? { duration: 0 }
                : {
                    duration: 4 + i,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }
            }
          />
        )
      })}
    </motion.div>
  )
}
