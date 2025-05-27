import React from "react"
import { FaBug, FaLightbulb } from "react-icons/fa"
import { Lesson } from "@/app/types/typings"
import LessonCard from "../LessonCard"

interface Props {
  lessons: Lesson[]
}

export default function Lessons({ lessons }: Props) {
  if (!lessons || lessons.length === 0) return null

  return (
    <section id="lessons" className="h-screen snap-start px-8 py-24 max-w-8xl mx-auto">
      <div className="flex flex-row flex-wrap justify-center gap-4 mt-4">
        {lessons.map((lesson, i) => (
          <LessonCard key={i} lesson={lesson}/>
        ))}
        
      </div>
    </section>
  )
}
