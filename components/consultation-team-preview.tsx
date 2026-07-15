"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Card } from "./ui/card"

interface TeamMember {
  name: string
  role: string
  specialty: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Astafa",
    role: "AI & Strategy Lead",
    specialty: "AI/ML Architecture, Business Strategy"
  },
  {
    name: "Umar",
    role: "Enterprise Solutions",
    specialty: "Enterprise IT, Cloud Architecture"
  },
  {
    name: "Shmair",
    role: "Technical Architect",
    specialty: "Full-Stack Development, DevOps"
  }
]

export function ConsultationTeamPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="my-16 md:my-20"
    >
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="h-6 w-6 text-finova-teal" />
          <h3 className="text-2xl md:text-3xl font-bold">
            Meet Your Consultants
          </h3>
        </div>
        <p className="text-foreground/70">
          Your consultation will be led by one of our expert specialists
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Card className="p-6 border-finova-teal/20 bg-gradient-to-br from-finova-teal/5 to-finova-blue/5 hover:border-finova-teal/50 transition-colors">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-finova-teal to-finova-blue flex items-center justify-center text-white font-bold text-lg">
                  {member.name.charAt(0)}
                </div>
              </div>
              <h4 className="text-lg font-bold mb-1">{member.name}</h4>
              <p className="text-finova-teal font-medium text-sm mb-3">
                {member.role}
              </p>
              <p className="text-sm text-foreground/70">
                {member.specialty}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 p-4 rounded-lg border border-finova-teal/20 bg-finova-teal/5 text-center"
      >
        <p className="text-foreground/80">
          <span className="font-semibold">Pro tip:</span> Mention your focus area during booking 
          to get matched with the specialist who's the best fit for your needs.
        </p>
      </motion.div>
    </motion.div>
  )
}
