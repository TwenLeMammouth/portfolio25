'use client'

import React, { useRef, useEffect } from 'react'

type Props = {
  paused?: boolean
}

type Point = {
  x: number
  y: number
  radius: number
  alpha: number
  hue: number
  lastLitTime: number
}

const DotGridBackground: React.FC<Props> = ({ paused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999, speed: 0 })
  const rafId = useRef<number | null>(null)
  const lastX = useRef(-9999)
  const lastY = useRef(-9999)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const spacing = 40
    const baseRadius = 2
    const maxRadius = 7
    const glowRange = 120
    const afterglowDuration = 300

    const points: Point[] = []

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        points.push({
          x,
          y,
          radius: baseRadius,
          alpha: 0.1,
          hue: 140,
          lastLitTime: 0,
        })
      }
    }

    const draw = (time: number) => {
      const dt = time - lastTime.current
      const dx = mouse.current.x - lastX.current
      const dy = mouse.current.y - lastY.current
      const dist = Math.sqrt(dx * dx + dy * dy)
      const speed = dist / (dt || 1)
      mouse.current.speed = speed
      lastX.current = mouse.current.x
      lastY.current = mouse.current.y
      lastTime.current = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const hue = 140 + Math.min(speed * 8, 120)

      for (const point of points) {
        const dx = point.x - mouse.current.x
        const dy = point.y - mouse.current.y
        const d = Math.sqrt(dx * dx + dy * dy)

        if (d < glowRange) {
          const intensity = 1 - d / glowRange
          point.radius = baseRadius + intensity * (maxRadius - baseRadius)
          point.alpha = 0.8 * intensity + 0.2
          point.hue = hue
          point.lastLitTime = time
        } else {
          const elapsed = time - point.lastLitTime
          if (elapsed < afterglowDuration) {
            const fade = 1 - elapsed / afterglowDuration
            point.radius = baseRadius + fade * (maxRadius - baseRadius) * 0.5
            point.alpha = 0.1 + fade * 0.2
          } else {
            point.radius = baseRadius
            point.alpha = 0.08
          }
        }

        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${point.hue}, 90%, 60%, ${point.alpha.toFixed(2)})`
        ctx.fill()
      }

      rafId.current = requestAnimationFrame(draw)
    }

    const updateMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener('mousemove', updateMouse)

    if (!paused) {
      rafId.current = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('mousemove', updateMouse)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current!)
      }
    }
  }, [paused])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}

export default DotGridBackground
