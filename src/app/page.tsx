
import Head from 'next/head'
import Link from 'next/link'
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"

import { fetchPageInfo } from '@/app/utils/fetchPageInfo'
import { fetchExperiences } from '@/app/utils/fetchExperiences'
import { fetchSkills } from '@/app/utils/fetchSkills'
import { fetchProjects } from '@/app/utils/fetchProjects'
import { fetchSocials } from '@/app/utils/fetchSocials'
import { fetchLocations } from '@/app/utils/fetchLocations'
import { fetchTrips } from '@/app/utils/fetchTrips'
import { fetchAchievements } from '@/app/utils/fetchAchievements'
import { fetchLessons } from '@/app/utils/fetchLessons'
import { fetchSoftSkills } from '@/app/utils/fetchSoftSkills'
import LessonsWrapper from './components/LessonsWrapper'


// Import des composants dynamiques
const Header = dynamic(() => import('@/app/components/sections/Header')) 
const Hero = dynamic(() => import('@/app/components/sections/Hero'))
const About = dynamic(() => import('@/app/components/sections/About'))
const WorkingExperience = dynamic(() => import('@/app/components/sections/WorkingExperience'))
const Achievements = dynamic(() => import('@/app/components/sections/Achievements'))
const Skills = dynamic(() => import('@/app/components/sections/Skills'))
const Projects = dynamic(() => import('@/app/components/sections/Projects'))
const ContactMe = dynamic(() => import('@/app/components/sections/ContactMe'))
const Lessons = dynamic(() => import('@/app/components/sections/Lessons'))
const Arrow = dynamic(() => import('@/app/components/Arrow'))

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  const [
    pageInfo, 
    experiences, 
    skills, 
    projects, 
    socials, 
    locations, 
    trips, 
    achievements,
    lessons,
    softSkills
  ] = await Promise.all([
    fetchPageInfo(),
    fetchExperiences(),
    fetchSkills(),
    fetchProjects(),
    fetchSocials(),
    fetchLocations(),
    fetchTrips(),
    fetchAchievements(),
    fetchLessons(),
    fetchSoftSkills(),
  ])


  return (
    <div
      id="scroll-container"
      className="bg-[rgb(36,36,36)] text-white h-[100dvh] snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth z-0 scrollbar-thin scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-track-gray-500 scrollbar-thumb-[#12DD88]/80"
    >
      <Head>
        <title>Vincent Groslier – Developer Portfolio</title>
        <meta name="description" content="Explore the projects, experience, and achievements of Vincent Groslier, full-stack developer." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Vincent Groslier – Portfolio" />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:description" content="Developer with a passion for impactful work. View my experience, achievements, and more." />
      </Head>

      <Header socials={socials} />

      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center" data-title="About">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center" data-title="Experience">
        <WorkingExperience experiences={experiences} locations={locations} trips={trips} />
      </section>

      <section id="achievements" className="snap-start" data-title="Achievements">
        <Achievements achievements={achievements}/>
      </section>

      <section id="skills" className="snap-start" data-title="Skills">
        <Skills skills={skills} softSkills={softSkills}/>
      </section>

      <section id="projects" className="snap-start" data-title="Projects">
        <Projects projects={projects} />
      </section>

      <LessonsWrapper lessons={lessons} />

      <section id="contact" className="snap-start" data-title="Contact">
        <ContactMe pageInfo={pageInfo} />
      </section>

      {!isMobile && 
        <Link href="#hero">
          <footer className="sticky bottom-1 sm:bottom-5 w-full cursor-pointer">
            <div className="flex justify-center items-center">
              <Arrow
                width={88}
                height={40}
                strokeWidth={88}
                color="#12DD88"
                className="filter grayscale hover:grayscale-0"
              />
            </div>
          </footer>
        </Link>
      }
    </div>
  );
}
