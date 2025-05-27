"use client"

import React from "react"
import { motion } from "framer-motion"
import { Achievement } from "@/app/types/typings"
import { format } from "date-fns"
import Image from "next/image"

type Props = {
  achievement: Achievement
  onClick: (achievement: Achievement) => void
}

export default function AchievementCard({ achievement, onClick }: Props) {
  const mainTag = achievement.type || "tech"
  const dateStr = achievement.date
    ? format(new Date(achievement.date), "MMM yyyy")
    : "Date unknown"

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(achievement)}
      className={`relative cursor-pointer rounded-xl p-3 sm:p-5 flex flex-row sm:flex-col md:flex-col gap-1 sm:gap-4 transition-all duration-300 border shadow-sm
        sm:h-auto h-[160px] sm:min-h-[280px] sm:max-h-[360px] sm:flex-1 
        ${
          mainTag === "life"
            ? "bg-[oklch(20%_0.15_140)] border-[oklch(45%_0.2_140)] hover:shadow-[0_0_12px_oklch(75%_0.2_140)]"
            : "bg-[oklch(20%_0.2_200)] border-[oklch(50%_0.2_200)] hover:shadow-[0_0_12px_oklch(80%_0.3_200)]"
        }`}
    >
      {/* Badge */}
      <span
        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide
        ${
          mainTag === "life"
            ? "bg-[oklch(50%_0.2_140)] text-black"
            : "bg-[oklch(60%_0.3_200)] text-black"
        }`}
      >
        {mainTag.toUpperCase()}
      </span>

      {/* Image */}
      {achievement.illustrationUrl && (
        <Image
          src={achievement.illustrationUrl}
          alt={achievement.title}
          className="w-[40%] sm:w-full sm:max-h-40 object-cover rounded-md"
        />
      )}

      {/* Texte */}
      <div className="flex flex-col justify-between flex-grow overflow-hidden px-2 sm:px-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-1">{achievement.title}</h3>
          <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">{dateStr}</span>
        </div>

        <p className="text-[11px] sm:text-sm text-gray-300 line-clamp-3 sm:line-clamp-4">
          {achievement.description}
        </p>

        {achievement.tags && achievement.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
            {achievement.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-[#12DD88]/10 text-[#12DD88] border border-[#12DD88]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
