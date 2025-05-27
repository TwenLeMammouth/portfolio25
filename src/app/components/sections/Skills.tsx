"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { motion } from "framer-motion"
import { Skill as SkillType, SoftSkill } from "@/app/types/typings"
import Skill from "../Skill"
import SoftSkillCard from "../SoftSkillCard"
import { iconMap } from "@/app/utils/iconMap"

type Props = {
  skills: SkillType[]
  softSkills: SoftSkill[]
}

export default function Skills({ skills, softSkills }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlideHard, setCurrentSlideHard] = useState(0)
  const [currentSlideSoft, setCurrentSlideSoft] = useState(0)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const hardPerPage = isMobile ? 4 : 8
  const softPerPage = isMobile ? 2 : 6

  const chunkArray = <T,>(array: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    )

  const hardSkillChunks = useMemo(() => chunkArray(skills, hardPerPage), [skills, hardPerPage])
  const softSkillChunks = useMemo(() => chunkArray(softSkills, softPerPage), [softSkills, softPerPage])

  const [sliderRefHard] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
    slideChanged: (s) => setCurrentSlideHard(s.track.details.rel),
  })

  const [sliderRefSoft] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
    slideChanged: (s) => setCurrentSlideSoft(s.track.details.rel),
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      // className="h-[100dvh] flex flex-col justify-evenly items-center text-center max-w-[2000px] px-4 sm:px-6 mx-auto"
      className="h-[100dvh] flex flex-col justify-between items-center text-center max-w-[2000px] px-4 sm:px-6 mx-auto pb-4 pt-12 md:pt-20"
    >
      {/* Hard Skills */}
      <section className="w-full md:w-3/4 h-[47vh] flex flex-col justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white md:mb-2">Hard Skills</h3>
        <div ref={sliderRefHard} className="keen-slider w-full mx-auto h-full">
          {hardSkillChunks.map((chunk, idx) => (
            <div
              key={idx}
              className="keen-slider__slide grid grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-2 gap-2 sm:gap-4 justify-items-center"
            >
              {chunk.map((skill, i) => (
                <Skill key={skill._id || `h-${idx}-${i}`} skill={skill} />
              ))}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-1 mb-1 gap-1 sm:gap-2">
          {hardSkillChunks.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlideHard ? "bg-[#12DD88]" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Soft Skills */}
      <section className="w-full md:w-3/4 h-[47vh] flex flex-col justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white md:mb-2">Soft Skills (self-assessed)</h3>
        <div ref={sliderRefSoft} className="keen-slider w-full mx-auto h-full">
          {softSkillChunks.map((chunk, idx) => (
            <div
              key={idx}
              className="keen-slider__slide grid grid-cols-1 grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 gap-2 sm:gap-4 p-2 justify-items-center content-start"
            >
              {chunk.map((soft, i) => (
                <SoftSkillCard
                  key={soft._id || `s-${idx}-${i}`}
                  title={soft.title}
                  level={soft.level}
                  description={soft.description}
                  icon={iconMap[soft.icon] || iconMap.default}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1 sm:gap-2">
          {softSkillChunks.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlideSoft ? "bg-[#12DD88]" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </section>
    </motion.div>

  )
}
