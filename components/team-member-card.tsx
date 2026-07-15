"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "./ui/card"

interface TeamMemberCardProps {
  name: string
  role: string
  specialty: string
  image: string
  index: number
}

export function TeamMemberCard({ name, role, specialty, image, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <Card className="overflow-hidden border-foreground/10 bg-foreground/5 hover:border-finova-teal/30 transition-colors">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-finova-teal font-medium mb-3">{role}</p>
          <p className="text-sm text-foreground/70">{specialty}</p>
        </div>
      </Card>
    </motion.div>
  )
}
