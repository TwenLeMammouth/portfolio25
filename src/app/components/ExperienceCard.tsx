"use client"

import React from "react"
import { motion } from "framer-motion"
import { Experience } from "@/app/types/typings"
import Image from "next/image"

type Props = {
  experience: Experience
}

export default function ExperienceCard({ experience }: Props) {
  const startDate = new Date(experience.dateStarted).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
  const endDate = experience.isCurrentlyWorkingHere
    ? "Present"
    : new Date(experience.dateEnded).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-lg overflow-hidden"
    >
      {/* Header (logo + titre + dates) */}
      <div className="flex justify-start items-center gap-4 mb-2 md:mb-4">
        <div className="relative w-12 h-12 md:w-24 md:h-24 flex-shrink-0">
          <Image
            src={experience.companyImageUrl}
            alt={experience.company}
            fill
            sizes="96px"
            className="object-cover rounded-full border border-white/20 shadow-sm"
          />
        </div>
        <div className="flex flex-col w-full">
          <h3 className="text-md md:text-2xl font-bold text-white">{experience.jobTitle}</h3>

          <div className="flex flex-row justify-between text-sm text-white/60 mt-1 max-w-[360px]">
            <p className="text-sm md:text-md text-white/80">{experience.company}</p>
            <span>{experience.location?.city}</span>
          </div>

          <span className="text-sm text-white/60">{startDate} — {endDate}</span>
        </div>
      </div>

      {/* Techno (ou ligne si vide) */}
      {experience.technologies?.length > 0 ? (
        <div className="flex flex-wrap gap-3 pb-2 md:pb-4">
          {experience.technologies.map((tech) => (
            <Image
              key={tech._id}
              src={tech.imageUrl}
              alt={tech.title}
              width={32}
              height={32}
              className="rounded border border-white/20 p-1 bg-black/20"
            />
          ))}
        </div>
      ) : (
        <div className="border-t border-white/10 my-2" />
      )}

      {/* Texte (contexte + points) */}
      <div className="space-y-2 md:space-y-4 overflow-hidden">
        {experience.experienceSummary && (
          <p className="text-xs md:text-base italic text-white/70 leading-relaxed">
            {experience.experienceSummary}
          </p>
        )}

        <div className="relative">
          <ul className="flex-grow text-[0.7rem] sm:text-base list-disc list-inside text-white/90 space-y-1 overflow-y-auto h-[24dvh] pr-4 scrollbar-thin scrollbar-thumb-[#12DD88]/60">
            {experience.points?.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          {/* Ombre en bas */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black/10 to-transparent z-10 rounded-b-xs" />
        </div>
      </div>
    </motion.div>
  )
}
