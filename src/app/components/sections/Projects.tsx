"use client"

import React, { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/app/types/typings';
import Arrow from '../Arrow';
import Waves from '../background/Waves';
import { useRef } from "react";


type Props = {
    projects: Project[];
}

export default function Projects({projects}: Props) {
    
    const ref = useRef<HTMLDivElement>(null);
    // const { events } = useDraggable(ref, {
    //     applyRubberBandEffect: true, // activate rubber band effect
    // });
    
    if(projects === undefined) {
        return null
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToProject = (index: number) => {
        if (!ref.current) return;
        const container = ref.current;
        const projectWidth = container.clientWidth;
        container.scrollTo({
            left: index * projectWidth,
            behavior: 'smooth',
        });
        setCurrentIndex(index);
    };

    const goLeft = () => {
        if (currentIndex > 0) {
            scrollToProject(currentIndex - 1);
        }
    };
    
    const goRight = () => {
        if (currentIndex < projects.length - 1) {
            scrollToProject(currentIndex + 1);
        }
    };

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="h-[100dvh] w-full flex relative overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly items-center mx-auto z-0  py-12">
        {/* <h3 className="pageTitle">Projects</h3> */}

        <Arrow 
            onClick={goLeft} 
            className="absolute top-1/4 md:top-1/2 left-0 -rotate-90 grayscale hover:grayscale-0 z-30 pointer-events-auto" 
            color="#12DD88" />

        <div 
        // {...events} 
        ref={ref} 
        className="relative w-full h-[85vh] flex overflow-y-hidden scrollbar-hide z-20 snap-x snap-mandatory">
            {projects?.map((project, i) => (
                <div key={i} className="w-full h-full flex-shrink-0 snap-center flex flex-col space-y-5 justify-evenly items-center p-2 md:p-44">
                    <motion.img 
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={project?.imageUrl} 
                    className="flex-shrink-1 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] xl:w-[450px] xl:h-[450px] rounded-lg object-cover shadow-md transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:brightness-105 hover:contrast-110" />
                    <div className="space-y-3 md:space-y-8 px-0 md:px-10 max-w-2xl md:max-w-4xl">
                        <div className="text-lg md:text-4xl font-semibold text-center">
                            <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}>
                                <span className="underline decoration-[#12DD88]/50 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">{project?.title}</span>
                            </motion.div>
                        </div>
                        <div className='flex space-x-2 items-center justify-center'>
                            {project?.technologies.map((technology, index) => 
                                <motion.img 
                                initial={{ rotate: -180, opacity: 0, y: 10 }}
                                whileInView={{ rotate: 0, opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
                                className='h-8 w-8 rounded-lg border bg-white/30 border-gray-500 p-1'
                                key={technology._id} 
                                src={technology.imageUrl}
                                alt="" />
                            )}
                        </div>
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}>
                            <p className="text-sm md:text-lg text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] text-center md:text-left">
                                {project?.summary}
                            </p>    
                            {project?.linkToBuild && (
                                <a
                                href={project.linkToBuild}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto text-center inline-block my-4 px-5 py-2 rounded-md ring-1 ring-white/50 bg-[#eee] text-black font-semibold text-sm sm:text-base shadow-md hover:brightness-110 hover:scale-[1.03] transition-all duration-200"
                                >
                                    Voir le projet ↗
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="absolute bottom-5 z-10 w-full flex justify-center gap-2 mb-6 md:mb-18">
            {projects.map((_, i) => (
                <div
                key={i}
                className={`w-3 h-3 rounded-full ring transition ${
                    i === currentIndex ? 'bg-[#eee]' : 'bg-white/20'
                }`}
                />
            ))}
        </div>

        <Arrow 
        onClick={goRight} 
        className="absolute top-1/4 md:top-1/2 right-0 rotate-90 grayscale hover:grayscale-0 z-30 pointer-events-auto" 
        color="#12DD88" />

        <Waves />
    </motion.div>
  )
}