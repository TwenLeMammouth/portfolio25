"use client"

import React from "react"
import { motion } from "framer-motion"
import { Lesson } from "@/app/types/typings"

import { FaBug, FaLightbulb, FaWrench } from "react-icons/fa6"

function highlightCode(text: string) {
  return text.split(/(`[^`]+`)/g).map((segment, i) => {
    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code
          key={i}
          className="bg-zinc-700 text-gray-300 px-1 py-0.5 rounded text-sm"
        >
          {segment.slice(1, -1)}
        </code>
      )
    } else {
      return <span key={i}>{segment}</span>
    }
  })
}

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 rounded-lg p-6 shadow-lg border border-zinc-700 w-full max-w-md"
    >
      <p className="text-xs uppercase text-zinc-500 mb-2">
        {new Date(lesson.date).toLocaleDateString()}
      </p>

      <h3 className="text-xl font-semibold text-[#12DD88] mb-2">
        {highlightCode(lesson.context)}
      </h3>

      <div className="flex items-start gap-2 mb-2">
        <FaBug className="text-red-400 mt-1" />
        <p className="text-sm text-white leading-relaxed">
          {highlightCode(lesson.error)}
        </p>
      </div>

      <div className="flex items-start gap-2 mb-2">
        <FaLightbulb className="text-yellow-400 mt-1" />
        <p className="text-sm text-white leading-relaxed">
          {highlightCode(lesson.lesson)}
        </p>
      </div>

      <div className="flex items-start gap-2">
        <FaWrench className="text-blue-400 mt-1" />
        <p className="text-sm text-white leading-relaxed">
          {highlightCode(lesson.fix)}
        </p>
      </div>

      {lesson.tags && lesson.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {lesson.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[#12DD88]/10 text-[#12DD88] text-xs px-2 py-1 rounded-full border border-[#12DD88]/50"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}