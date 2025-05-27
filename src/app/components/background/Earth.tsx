// File: src/app/components/background/EarthCanvas.tsx
'use client'

import React, { Suspense, useMemo, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import ThreeGlobe from 'three-globe'
import * as THREE from 'three'
import { Experience, Location, Trip } from '@/app/types/typings'
import { useFrame } from '@react-three/fiber'

export type EarthCanvasProps = {
  experiences: Experience[]
  locations: Location[]
  trips: Trip[]
  focusIdx: number
  paused?: boolean
}

const labelPositions: Record<string, 'top' | 'right' | 'bottom' | 'left'> = {
    'Billom': 'left',
    'Scionzier': 'right',
    'Clermont-Ferrand': 'top',
    'Grenoble': 'right',
    'Tokyo': 'bottom',
    'Brisbane': 'top',
    // Ajoute d'autres villes ici
}

// Composant interne pour la scène, où on peut utiliser les hooks R3F
function GlobeScene({ experiences, locations, trips, focusIdx, paused }: EarthCanvasProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const camDist = isMobile ? 180 : 300

  const { camera } = useThree()

  
  // Préparer les données
  const pData = useMemo(
    () => locations.map(loc => ({
      lat: loc.isNorthHemisphere ? loc.lat : -loc.lat,
      lng: loc.isEastSide ? loc.long : -loc.long,
      color: '#12DD88',
      name: loc.city,
      position: labelPositions[loc.city] || 'right', // fallback à 'right'
    })),
    [locations]
  )

  const aData = useMemo(
    () => trips.map(trip => ({
      startLat: trip.from.isNorthHemisphere ? trip.from.lat : -trip.from.lat,
      startLng: trip.from.isEastSide ? trip.from.long : -trip.from.long,
      endLat: trip.to.isNorthHemisphere ? trip.to.lat : -trip.to.lat,
      endLng: trip.to.isEastSide ? trip.to.long : -trip.to.long,
      color: '#12DD88',
    })),
    [trips]
  )

  // Trouver la location de l'expérience active
  const targetLoc: Location = useMemo(() => {
    const exp = experiences[focusIdx]
    return locations.find(loc => loc.city === exp.location.city) || locations[0]
  }, [focusIdx, experiences, locations])

  // Initialisation du globe
  const globe = useMemo(() => new ThreeGlobe()
    .atmosphereColor('#AFE')
    .showGraticules(true)
    .globeImageUrl('/earth-dark.jpg')
    .bumpImageUrl('/earth-topology.jpg')
    .pointsData(pData)
    .pointAltitude(0.01)
    .pointRadius(0.08)
    .pointResolution(80)
    .pointColor('color')
    .pointsMerge(true)
    .labelsData(pData)
    .labelText('name')
    .labelSize(1)
    .labelDotRadius(0.2)
    .labelDotOrientation('position')
    .arcsData(aData)
    .arcColor('color')
    .arcDashLength(0.8)
    .arcDashGap(0.2)
    .arcDashAnimateTime(3500)
    .rendererSize(new THREE.Vector2(window.innerWidth / 2, window.innerHeight)),
    [pData, aData]
  )

  // Compute target location from active experience
  // State for desired camera direction, with traveling progress
  const [destDir, setDestDir] = useState(new THREE.Vector3(0, 0, 1))
  const startDirRef = useRef(new THREE.Vector3())
  const progressRef = useRef(1)  // 1 means completed

  // angular speed in radians/sec (e.g., π/2 = 90°/s)
  const angularSpeed = Math.PI / 5
  const travelTimeRef = useRef<number>(1)

  // On focus change, initialize travel
  useEffect(() => {
    // record starting direction
    startDirRef.current = camera.position.clone().normalize()
    // compute destination direction
    const lat = targetLoc.isNorthHemisphere ? targetLoc.lat : -targetLoc.lat
    const lng = targetLoc.isEastSide ? targetLoc.long : -targetLoc.long
    const phi = THREE.MathUtils.degToRad(90 - lat)
    // Correct longitude orientation: 90 - lng
    const theta = THREE.MathUtils.degToRad(90 - lng)
    const newDir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    ).normalize()
    setDestDir(newDir)
    // calculate travel time based on angular distance
    const angle = startDirRef.current.angleTo(newDir)
    travelTimeRef.current = angle / angularSpeed
    // reset progress
    progressRef.current = 0
  }, [targetLoc, camera, angularSpeed])
  
  // Animate camera and controls with controlled spherical interpolation
  useFrame((state, delta) => {
    if (paused) return 
    // compute progress
    const travelTime = travelTimeRef.current // seconds
    progressRef.current = Math.min(progressRef.current + delta / travelTime, 1)
    // spherical interpolation between start and destination directions
    const newDir = new THREE.Vector3()
    // use slerpVectors static method
    newDir.lerpVectors(startDirRef.current, destDir, progressRef.current).normalize();
    // update camera position at fixed distance
    camera.position.copy(newDir.multiplyScalar(camDist))
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    
  })

  useEffect(() => {
    return () => { 
      THREE.Cache.clear();
    }
  }, [])

  return (
    <>
      <ambientLight intensity={10} />
      <hemisphereLight intensity={6} groundColor="black" />
      <directionalLight position={[50, 50, 100]} intensity={8} />
      <primitive object={globe} />
      
      {/* <Stats /> */}
    </>
  )
}

export default function EarthCanvas({ experiences, locations, trips, focusIdx, paused }: EarthCanvasProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      className="w-full h-full"
      camera={{ position: [0, 0, 300], fov: isMobile ? 35 : 45}}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <GlobeScene 
          experiences={experiences} 
          locations={locations} 
          trips={trips} 
          focusIdx={focusIdx} 
          paused={paused}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}