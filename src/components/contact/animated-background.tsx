"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions and handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Particle class with more sophisticated behavior
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      growFactor: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseSize = Math.random() * 4 + 1;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.growFactor = Math.random() * 0.02 + 0.01;
        this.color = this.getGradientColor();
      }

      getGradientColor() {
        const hue = Math.floor(Math.random() * 60) + 200; // Blues to purples
        return `hsla(${hue}, 70%, 60%, ${this.opacity})`;
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const factor = 1 - distance / maxDistance;
          this.size = this.baseSize + factor * 3;
        } else {
          this.size = this.baseSize;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particle array - adjust based on screen size
    const particlesArray: Particle[] = [];
    const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
    
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Connect particles with lines - more sophisticated connection logic
    function connect(particles: Particle[]) {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            const opacity = 0.5 * (1 - distance / maxDistance);
            if (ctx) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }
    }

    let mouseX = 0;
    let mouseY = 0;
    let animationFrame: number;

    // Track mouse position
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animation loop with mouse interaction
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Create dark gradient background
      const gradient = ctx!.createLinearGradient(0, 0, 0, canvas!.height);
      gradient.addColorStop(0, "#0f172a"); // Darker navy blue
      gradient.addColorStop(1, "#1e1b4b"); // Deep indigo

      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouseX, mouseY);
        particlesArray[i].draw();
      }

      connect(particlesArray);
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
