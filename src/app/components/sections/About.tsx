"use client"

import React, { Suspense, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageInfo } from '@/app/types/typings'
import dynamic from 'next/dynamic'
import { BasicLoader } from '@/app/components/background/Loader'
import { useInView } from 'react-intersection-observer'
import type { JSX } from "react"
 
const Canvas = dynamic(() => import('@/app/components/background/Particles'), {
  ssr: false,
})

type Props = {
    pageInfo: PageInfo;
}

function renderHighlightedText(text: string): JSX.Element[] {
  return text.split(/(\*{2,3}[^*]+\*{2,3})/g).map((part, i) => {
    if (part.startsWith("***") && part.endsWith("***")) {
      const content = part.slice(3, -3)
      return (
        <span
          key={i}
          className="inline-block text-[#12DD88] font-bold px-2 py-1 bg-white/10 border border-[#eee]/70 rounded-md shadow-sm backdrop-blur-xs"
        >
          {content}
        </span>
      )
    } else if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2)
      return (
        <span key={i} className="text-[#12CC77] font-semibold">
          {content}
        </span>
      )
    } else {
      return <span key={i}>{part}</span>
    }
  })
}

export default function About({ pageInfo }: Props) {

    const { ref, inView } = useInView({
        threshold: 0.3,  // déclenche quand 30% de la section est visible
        triggerOnce: true, // n'observe qu'une fois
    })
    const [hasBeenInView, setHasBeenInView] = React.useState(false)

    useEffect(() => {
    if (inView && !hasBeenInView) {
        setHasBeenInView(true)
    }
    }, [inView, hasBeenInView])

  return (
    <motion.div 
    ref={ref}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.2 }}
    role="region"
    aria-labelledby="about-title"
    className="z-20 flex flex-col relative h-[100dvh] text-center max-w-7xl px-4 py-12 justify-center mx-auto items-center">
        {hasBeenInView && (
            <Suspense fallback={<BasicLoader />}>
                <Canvas paused={!inView} />
            </Suspense>
        )}
        {/* <h3 className="pageTitle">About</h3> */}
        <motion.img 
        initial={{ x:-100, opacity: 0, }}
        transition={{ duration: 0.8 }}
        whileInView={{ x: 0, opacity: 1, }}
        src={pageInfo?.profilePicUrl}
        alt="Portrait"
        className="z-20 w-32 h-32 sm:w-52 sm:h-52 md:w-55 md:h-55 xl:w-[350px] xl:h-[350px] my-8 rounded-xl object-cover shadow-lg"
        loading="lazy"
        />
        <div className="z-20 space-y-2 sm:space-y-6 max-w-xl md:max-w-4xl rounded-lg bg-zinc-800/40">
            <h2 id="about-title" className="text-lg sm:text-3xl font-semibold underline text-[#eee] drop-shadow">Little Background</h2>
            <p className="text-[0.7rem] sm:text-sm lg:text-md xl:text-lg text-gray-300 text-shadow-2xs text-shadow-zinc-800 whitespace-pre-line">
                {pageInfo?.backgroundInformation && renderHighlightedText(pageInfo.backgroundInformation)}
            </p>
        </div>
    </motion.div>
  )
}
