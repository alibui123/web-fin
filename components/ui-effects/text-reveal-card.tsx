"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TextRevealCard = ({
  text,
  revealText,
  className,
  children,
}: {
  text: string
  revealText: string
  className?: string
  children?: React.ReactNode
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-lg border border-primary/10 bg-gradient-to-br from-background/90 to-primary/5 dark:from-black dark:to-primary/10 px-8 py-16 shadow-xl",
        className,
      )}
    >
      <div className="relative z-10 text-center text-4xl font-bold">
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/70 dark:from-white dark:to-neutral-300 block"
        >
          {text}
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-700 dark:from-cyan-400 dark:to-purple-600"
        >
          {revealText}
        </motion.span>
      </div>

      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{
            backgroundPosition: isHovered ? "100% 50%" : "0% 50%",
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-600/10 dark:via-cyan-900/20 to-transparent bg-[length:200%_100%]"
          style={{
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      {children}
    </div>
  )
}

