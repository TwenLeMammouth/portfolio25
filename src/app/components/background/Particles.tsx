"use client"

import React, { useRef, useEffect } from 'react'

interface Props {
    className?: string
    paused?: boolean
}

const Canvas: React.FC<Props> = ({ paused }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    // Resize canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle class
    class Particle {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number

      constructor() {
        this.radius = Math.random() * 3 + 1
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        const colors = ['#FFF', '#12DD88', '#129988']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // Bounce off edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.vx = -this.vx
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.vy = -this.vy

        this.x += this.vx * 0.5
        this.y += this.vy * 0.5
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Initialize particles
    const count = Math.max(50, Math.round(window.innerWidth / 16))
    const particles: Particle[] = Array.from({ length: count }, () => new Particle())

    // Connection threshold and grid size
    const maxDist = 150
    const maxDistSq = maxDist * maxDist
    const cellSize = maxDist * 1.5

    // Animation loop
    let rafId: number
    const animate = () => {
      if (paused) return // Arrêter l'animation si on est en pause

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(p => {
        p.update()
        p.draw()
      })

      // Spatial hashing: bucket particles
      const buckets = new Map<string, Particle[]>()
      particles.forEach(p => {
        const cx = Math.floor(p.x / cellSize)
        const cy = Math.floor(p.y / cellSize)
        const key = `${cx},${cy}`
        if (!buckets.has(key)) buckets.set(key, [])
        buckets.get(key)!.push(p)
      })

      // Draw connections within neighboring buckets
      buckets.forEach((cellParticles, key) => {
        const [cx, cy] = key.split(',').map(Number)
        cellParticles.forEach(p1 => {
          for (let ix = -1; ix <= 1; ix++) {
            for (let iy = -1; iy <= 1; iy++) {
              const neighborKey = `${cx + ix},${cy + iy}`
              const neighbors = buckets.get(neighborKey)
              if (!neighbors) continue
              neighbors.forEach(p2 => {
                if (p1 === p2) return
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const distSq = dx * dx + dy * dy
                if (distSq < maxDistSq) {
                  const opacity = 1 - distSq / maxDistSq
                  ctx.strokeStyle = `rgba(200,245,245,${opacity.toFixed(2)})`
                  ctx.lineWidth = 0.3
                  ctx.beginPath()
                  ctx.moveTo(p1.x, p1.y)
                  ctx.lineTo(p2.x, p2.y)
                  ctx.stroke()
                }
              })
            }
          }
        })
      })

      rafId = window.requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [paused])

    return (
        <div className="absolute top-0 left-0 z-0 flex w-full h-full justify-center items-center">
            <canvas ref={canvasRef} className={''} />
        </div>
    )
}

export default Canvas