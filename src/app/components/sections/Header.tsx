"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Social } from '@/app/types/typings'
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaGlobe,
  FaEnvelope,
} from 'react-icons/fa'

const getIconFromPlatform = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return <FaGithub className="contactIcon text-[#fff]"/>
    case 'linkedin':
      return <FaLinkedin className="contactIcon text-[#fff]"/>
    case 'twitter':
    case 'x':
      return <FaTwitter className="contactIcon text-[#fff]"/>
    case 'instagram':
      return <FaInstagram className="contactIcon text-[#fff]"/>
    case 'facebook':
      return <FaFacebook className="contactIcon text-[#fff]"/>
    default:
      return <FaGlobe className="contactIcon text-[#fff]"/>
  }
}

type Props = {
  socials: Social[]
}

const headerMotion = {
  init: {
    y: -200,
    opacity: 0,
    scale: 0.5,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 50,
      damping: 8,
    },
  },
}

export default function Header({ socials }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTitle, setActiveTitle] = useState(" ")
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const lastScrollY = useRef(0)
  const scrollContainerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
  scrollContainerRef.current = document.getElementById("scroll-container")
  const container = scrollContainerRef.current

  const handleScroll = () => {
    if (!container) return

    const sections = container.querySelectorAll("section[data-title]")
    let newTitle = " "
    const middle = window.innerHeight / 2
    let foundSection = false

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= middle && rect.bottom >= middle) {
        const title = section.getAttribute("data-title")
        if (title) {
          newTitle = title
          foundSection = true
        }
      }
    })

    // Si aucune section n’est trouvée, on efface le titre
    if (!foundSection) {
      if (activeTitle !== "") setActiveTitle("")
      return
    }

    if (newTitle !== activeTitle) {
      setScrollDirection(container.scrollTop > lastScrollY.current ? "down" : "up")
      lastScrollY.current = container.scrollTop
      setActiveTitle(newTitle || '')
    }
  }

  container?.addEventListener("scroll", handleScroll)
  handleScroll()

  return () => {
    container?.removeEventListener("scroll", handleScroll)
  }
}, [])

  return (
    <header className='sticky top-0 p-3 sm:p-5 flex items-start justify-between mx-auto z-20 xl:items-center'>
      {/* Réseaux à gauche */}
        <motion.div 
          variants={headerMotion}
          initial="init"
          animate="show"
          className='hidden sm:flex flex-row gap-2 items-center relative rounded-full pl-8 -left-9 ring-1 ring-gray-500'>
          {socials?.map((social) => (
            <Link key={social._id} href={social.link} target="_blank">
              <div className="p-3 rounded-full ring-1 ring-gray-500 text-white hover:text-[#12DD88] hover:ring-[#12DD88] hover:scale-110 transition-all duration-300">
                {getIconFromPlatform(social.title)}
              </div>
            </Link>
          ))}
        </motion.div>

      {/* Mobile burger */}
        <motion.div 
          variants={headerMotion}
          initial="init"
          animate="show"
          className='sm:hidden flex flex-row gap-2 items-center relative rounded-full pl-8 -left-9 ring-1 ring-gray-500'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-500 text-white hover:text-[#12DD88] hover:border-[#12DD88]"
          >
            {menuOpen ? "✕" : "☰"}
            
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
              key="mobile-socials"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-10 left-8.5 bg-transparent border border-white/10 rounded-full shadow-2xl z-50 flex flex-col py-1 gap-1 ring-1 ring-gray-500">
                {socials?.map((social) => (
                  <Link key={social._id} href={social.link} target="_blank">
                    <div className="flex justify-center items-center p-2 rounded-full ring-1 ring-gray-500 text-white hover:text-[#12DD88] hover:ring-[#12DD88] hover:scale-110 transition-all duration-300">
                      {getIconFromPlatform(social.title)}
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 🔥 Titre central animé */}
        {activeTitle && (
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeTitle}
              className="absolute left-1/2 -translate-x-1/2 text-white uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal tracking-[0.25em] select-none pointer-events-none flex"
            >
              {activeTitle.split("").map((char, i) => (
                <motion.span
                  key={char + i}
                  initial={{
                    y: scrollDirection === "down" ? -120 : 120,
                    scaleY: 1.6,
                    scaleX: 0.4,
                    rotateX: scrollDirection === "down" ? 75 : -75,
                    opacity: 0,
                  }}
                  animate={{
                    y: [scrollDirection === "down" ? -120 : 120, 10, -4, 0],
                    scaleY: [1.6, 0.6, 1.2, 1],
                    scaleX: [0.4, 1.5, 0.9, 1],
                    rotateX: [scrollDirection === "down" ? 75 : -75, 0],
                    opacity: 1,
                  }}
                  exit={{
                    y: scrollDirection === "down" ? 60 : -60,
                    scaleY: 0.5,
                    scaleX: 1.5,
                    opacity: 0,
                  }}
                  transition={{
                    delay: i * 0.015,
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                  className={`inline-block drop-shadow-[0_0_4px_#12DD88] text-white${
                    char === "." ? "hidden" : ""
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>
        )}

      {/* Contact à droite */}

      <Link href="#contact">
        <motion.div
          variants={headerMotion}
          initial="init"
          animate="show"
          className='flex flex-row items-center'>
          <div className='relative rounded-full ring-1 ring-gray-500 pr-8 -right-9 flex flex-row justify-center items-center'>
            
            <div className="h-10 w-10 sm:h-13 sm:w-13 flex justify-center items-center rounded-full ring-1 ring-gray-500 text-white hover:text-[#12DD88] hover:ring-[#12DD88] transition-all duration-300 ease-in-out hover:scale-110">
              <FaEnvelope className="contactIcon text-[#fff]"/>
            </div>

            <div className='uppercase hidden pl-3 sm:inline-flex text-sm text-gray-500'>
              <p> Get in touch</p>
            </div>

          </div>
        </motion.div>
      </Link>
    </header>
  )
}