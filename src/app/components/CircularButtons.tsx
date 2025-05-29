// Nouveau composant HTML/CSS propre, inspiré du design SVG gourmand

import React from 'react'
import { useScrollToSection } from '../hooks/useScrollToSection'

const buttons = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' }
]

const CircularButtons = () => {
  const scrollToSection = useScrollToSection()

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2 p-2 sm:p-6 max-w-xl">
      {buttons.map(({ id, label }) => (
        <button
          key={id}
          className="group relative w-24 sm:w-40 p-1 sm:px-4 py-2 rounded-xl border border-[#12DD88] bg-gradient-to-br from-[#0e372c] to-[#1a3f2f] text-[#12DD88] shadow-md hover:shadow-[#12DD88]/60 hover:scale-110 transition-transform duration-300 ease-out overflow-hidden"
          onClick={() => scrollToSection(id)} 
        >
          {/* Texte */}
          <span className="relative z-10 text-xs sm:text-md font-bold tracking-wide group-hover:text-white">
            {label}
          </span>

          {/* Pulsation magique */}
          <span className="absolute inset-0 z-0 animate-pulse bg-[#12DD88]/10 blur-xl rounded-xl pointer-events-none" />

          {/* Particules */}
          <span className="absolute -top-1/2 left-1/2 w-72 h-72 bg-[radial-gradient(circle,rgba(18,221,136,0.4)_0%,transparent_70%)] animate-[spin_8s_linear_infinite]" />

          {/* Éclats lumineux */}
          <span className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#12DD88_0deg,transparent_360deg)] opacity-0 group-hover:opacity-10 animate-[spin_6s_linear_infinite]" />
        </button>
      ))}
    </div>
  )
}

export default CircularButtons
