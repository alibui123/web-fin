"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    details: ["info@finovasolutions.tech"],
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    details: ["+92 327 6508716"],
  },

]

export default function ContactDetails() {
  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-finova-teal">{info.icon}</div>
                  <h3 className="text-xl font-semibold">{info.title}</h3>
                </div>
                <ul className="space-y-2">
                  {info.details.map((detail) => (
                    <li key={detail} className="text-foreground/70">
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 