"use client"

import React from "react"
import { motion } from "framer-motion"
import { Achievement } from "@/app/types/typings"
import { FaTimes } from "react-icons/fa"
import { format } from "date-fns"
import Image from "next/image"

type Props = {
  achievement: Achievement
  onClose: () => void
}

export default function AchievementModal({ achievement, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center px-2 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.3 }}
        className="relative bg-zinc-900 w-full max-w-3xl p-4 sm:p-8 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-[#12DD88] transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {achievement.title}
        </h2>

        {/* Image */}
        {achievement.illustrationUrl && (
          <Image
            src={achievement.illustrationUrl}
            alt={achievement.title}
            width={500}
            height={500}
            className="w-full max-h-60 object-cover rounded-lg mb-4"
          />
        )}

        {/* Date + Context */}
        {achievement.date && (
          <p className="text-xs sm:text-sm text-gray-400 mb-4">
            {format(new Date(achievement.date), "MMMM yyyy")} – {achievement.context}
          </p>
        )}

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-300 whitespace-pre-line mb-4">
          {achievement.description}
        </p>

        {/* Notion link */}
        {achievement.notionLink && (
          <a
            href={achievement.notionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-[#12DD88] underline"
          >
            View more on Notion →
          </a>
        )}

        {/* Tags */}
        {achievement.tags && achievement.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {achievement.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-[#12DD88]/10 text-[#12DD88] border border-[#12DD88]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
