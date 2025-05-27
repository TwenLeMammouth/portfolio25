"use client"

import React, { useState, useCallback, useEffect, useMemo } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"
import { Achievement } from "@/app/types/typings"
import AchievementCard from "../AchievementCard"
import AchievementModal from "../AchievementModal"

interface Props {
  achievements: Achievement[]
}

export default function Achievements({ achievements }: Props) {
  const [selected, setSelected] = useState<Achievement | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: "auto",
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 6 },
    },
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  function chunkArray<T>(arr: T[], size: number): T[][] {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size))
      return acc
    }, [] as T[][])
  }

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const pageSize = isMobile ? 2 : 6
  const achievementGroups = useMemo(() => chunkArray(achievements, pageSize), [achievements, pageSize])

  return (
    <motion.section
      id="achievements"
      className="h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-10 py-12 sm:py-20 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Embla Carousel wrapper */}
      <div className="overflow-hidden w-full max-w-7xl" ref={emblaRef}>
        <div className="flex gap-6">
          {achievementGroups.map((group, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {group.map((a) => (
                  <AchievementCard key={a._id} achievement={a} onClick={() => setSelected(a)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {achievementGroups.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "bg-[#12DD88]" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <AchievementModal
            key={selected._id}
            achievement={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}
