"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Reduce number of particles and simplify particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 3 + 1 // Smaller particles
        this.speedX = Math.random() * 0.5 - 0.25 // Slower movement
        this.speedY = Math.random() * 0.5 - 0.25 // Slower movement
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = [
          "rgba(59, 130, 246, 0.1)", 
          "rgba(79, 70, 229, 0.1)",
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas!.width || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > canvas!.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create fewer particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(30, Math.floor((canvas.width * canvas.height) / 50000))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    let lastTime = 0
    const fps = 30 
    const interval = 1000 / fps

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime

      if (deltaTime >= interval) {
        lastTime = timestamp - (deltaTime % interval)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update()
          particlesArray[i].draw()
        }
      }

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }} // Reduced opacity
      transition={{ duration: 1 }}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
