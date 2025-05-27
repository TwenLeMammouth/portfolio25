'use client'

import { useEffect, useState } from 'react'
import Lessons from '@/app/components/sections/Lessons'
import { Lesson } from '@/app/types/typings'
import { motion, AnimatePresence } from 'framer-motion'

export default function LessonsWrapper({ lessons }: { lessons: Lesson[] }) {
  const [show, setShow] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState(false)

  useEffect(() => {
    const handleUnlock = (e: CustomEvent) => {
      if (e.detail === 'twen') {
        setShow(true)
        setJustUnlocked(true)

        setTimeout(() => {
          setJustUnlocked(false)
        }, 6000)
      }
    }

    window.addEventListener('lessons:unlock', handleUnlock as EventListener)
    return () => window.removeEventListener('lessons:unlock', handleUnlock as EventListener)
  }, [])

  if (!show) return null

  return (
    <section id="lessons" className="snap-start relative min-h-screen" data-title="Lessons">
      <Lessons lessons={lessons} />

      <AnimatePresence>
        {justUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-10 left-3/4 -translate-x-1/2 bg-[#12DD88] text-black font-bold px-6 py-3 rounded-xl shadow-xl z-[9999]"
          >
            ✨ Section unlocked !
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
