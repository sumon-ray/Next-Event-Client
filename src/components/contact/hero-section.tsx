"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Initialize the canvas animation after component mounts
  useEffect(() => {
    setIsMounted(true)

    // Cleanup function
    return () => {
      setIsMounted(false)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-4 py-16 flex flex-col items-center text-center"
      >
        {/* Headline with animated typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            Let's Start a <TypedText />
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Our team of experts is ready to listen, understand your needs, and provide tailored solutions
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Button
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            onClick={() => {
              const formElement = document.getElementById("contact-form")
              if (formElement) {
                formElement.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <Mail className="mr-2 h-5 w-5" />
            Send a Message
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-2 border-white/50 hover:bg-white/10 px-8 py-6 rounded-full font-medium text-lg transition-all duration-300 flex items-center"
            onClick={() => (window.location.href = "tel:+15551234567")}
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Us Now
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl w-full"
        >
          {[
            { value: "24/7", label: "Support" },
            { value: "15min", label: "Response Time" },
            { value: "100%", label: "Satisfaction" },
            { value: "Global", label: "Coverage" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-blue-200 text-sm md:text-base">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-8 h-14 rounded-full border-2 border-white/50 flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-3 rounded-full bg-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Animated typing effect component
function TypedText() {
  const words = ["Conversation", "Partnership", "Collaboration", "Journey"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        // If deleting, remove the last character
        if (isDeleting) {
          setCurrentText((prev) => prev.substring(0, prev.length - 1))

          // If all characters are deleted, start typing the next word
          if (currentText.length === 0) {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
        // If typing, add the next character
        else {
          setCurrentText(word.substring(0, currentText.length + 1))

          // If the word is complete, start deleting after a pause
          if (currentText.length === word.length) {
            setTimeout(() => {
              setIsDeleting(true)
            }, 2000) // Pause at the end of the word
          }
        }
      },
      isDeleting ? 50 : 100,
    ) // Typing is slower than deleting

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words])

  return (
    <span className="text-blue-300 relative">
      {currentText}
      <span className="absolute -right-[4px] top-0 h-full w-[2px] bg-blue-300 animate-blink"></span>
    </span>
  )
}

// Animated background component
function AnimatedBackground() {
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

    // Create particles
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = [
          "rgba(59, 130, 246, 0.5)", // blue
          "rgba(99, 102, 241, 0.5)", // indigo
          "rgba(139, 92, 246, 0.5)", // purple
          "rgba(191, 219, 254, 0.5)", // light blue
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > canvas.height || this.y < 0) {
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

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Connect particles with lines
    function connect() {
      const maxDistance = 150

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            if (ctx) {
              ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.5})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
              ctx.stroke()
            }
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#1e3a8a") // dark blue
      gradient.addColorStop(1, "#312e81") // dark indigo

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connect()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <>
      {/* Canvas for animated particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-indigo-900/30 mix-blend-multiply"></div>

      {/* Radial glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-indigo-500/10"></div>
    </>
  )
}
