"use client"

import { motion } from "framer-motion"
import { Users, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  name: string
  role: string
  overview: string
  specialties: string[]
  image: string
  linkedin: string
  gradient: string
  accent: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Astafa Ali",
    role: "CEO",
    overview: "Astafa leads our vision, aligning deep technical thinking with business-first strategy to drive Finova forward.",
    specialties: [],
    image: "/team/astafaali.jfif",
    linkedin: "https://www.linkedin.com/in/astafa-ali?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    gradient: "from-finova-cyan via-finova-blue to-finova-cyan",
    accent: "border-finova-cyan/20 bg-finova-cyan/5",
  },
  {
    name: "Umar Saleem",
    role: "Chief Operating Officer",
    overview: "Umar specializes in enterprise-grade delivery and operations, ensuring robust infrastructure and smooth business workflows.",
    specialties: [],
    image: "/team/umarsaleem.jfif",
    linkedin: "https://www.linkedin.com/in/umar-saleem-8b0089312?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    gradient: "from-finova-blue via-sky-500 to-finova-blue",
    accent: "border-finova-blue/20 bg-finova-blue/5",
  },
  {
    name: "Muhammad Mehlab",
    role: "Chief Technology Officer",
    overview: "Mehlab leads technical execution with a sharp focus on clean engineering, system architecture, and reliable product builds.",
    specialties: [],
    image: "/team/muhammadmehlab.jfif",
    linkedin: "https://www.linkedin.com/in/muhammad-mehlab-6b043027b?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    gradient: "from-purple-500 via-finova-magenta to-purple-500",
    accent: "border-purple-500/20 bg-purple-500/5",
  },
  {
    name: "Muhammad Ehsan",
    role: "Lead Engineer",
    overview: "Ehsan drives core development efforts, architecting scalable solutions and maintaining high standards in code quality.",
    specialties: [],
    image: "/team/muhammadehsan.png",
    linkedin: "https://www.linkedin.com/in/ehsan-khan-85344620b/",
    gradient: "from-sky-400 via-finova-cyan to-sky-400",
    accent: "border-sky-400/20 bg-sky-400/5",
  },
  {
    name: "Ali Abbasi",
    role: "Full Stack Dev",
    overview: "Ali builds robust end-to-end solutions, seamlessly connecting powerful backend logic with polished user interfaces.",
    specialties: [],
    image: "/team/aliabbasi.jpeg",
    linkedin: "https://www.linkedin.com/in/ali-abbasi-84134222a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    gradient: "from-finova-magenta via-purple-600 to-finova-magenta",
    accent: "border-finova-magenta/20 bg-finova-magenta/5",
  },
  {
    name: "Habiba Imran",
    role: "Full Stack Dev",
    overview: "Habiba develops dynamic full-stack applications, ensuring performance and seamless user experiences across the board.",
    specialties: [],
    image: "/team/habibaimran.jpeg",
    linkedin: "https://www.linkedin.com/in/habiba-imran-118624258",
    gradient: "from-pink-500 via-rose-500 to-pink-500",
    accent: "border-pink-500/20 bg-pink-500/5",
  },
  {
    name: "Moiz Islam",
    role: "Game Dev",
    overview: "Moiz brings interactive experiences to life, focusing on engaging gameplay mechanics and immersive digital environments.",
    specialties: [],
    image: "/team/moizislam.jfif",
    linkedin: "https://www.linkedin.com/in/moiz-islam-36287437b?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    gradient: "from-emerald-400 via-teal-500 to-emerald-400",
    accent: "border-emerald-400/20 bg-emerald-400/5",
  },
  {
    name: "Zaryab Ahmed",
    role: "Designer",
    overview: "Zaryab shapes our visual identity, creating intuitive, premium designs that connect vision with exceptional user experience.",
    specialties: [],
    image: "/team/zaryabahmad.png",
    linkedin: "https://www.linkedin.com/in/zaryabahmad?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    gradient: "from-orange-400 via-amber-500 to-orange-400",
    accent: "border-orange-400/20 bg-orange-400/5",
  },
]

export default function TeamDirectory() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-finova-midnight">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-finova-cyan/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-24 md:mb-32"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 text-finova-cyan text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <Users className="h-4 w-4" />
            Meet the people behind Finova
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Our Team, <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-blue">In Detail</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            Every project at Finova is shaped by specialists who think strategically, build carefully, and stay focused on measurable outcomes.
          </p>
        </motion.div>

        {/* Changed to a 3 column layout on large screens */}
        <div className="grid gap-x-8 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto justify-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="flex flex-col items-center"
            >
              {/* Card Container */}
              <div className={`w-full h-full flex flex-col items-center p-6 lg:p-8 relative rounded-[2.5rem] border bg-[#080e24]/80 backdrop-blur-md hover:border-white/20 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${member.accent}`}>
                
                {/* Top glow line */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r ${member.gradient} opacity-50 blur-[2px]`} />

                {/* Large Inner Image */}
                <div className="w-full h-64 sm:h-72 lg:h-80 relative rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/10 mb-8">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover object-center" 
                  />
                </div>

                {/* Name & Role */}
                <div className="text-center mb-6 w-full">
                  <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-2">
                    {member.name}
                  </h2>
                  <p className={`text-sm font-mono tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${member.gradient}`}>
                    {member.role}
                  </p>
                </div>

                {/* Scrollable Details Area */}
                <div className="w-full text-center flex-1 overflow-y-auto custom-scrollbar max-h-[140px] pr-2 mb-8 relative">
                  <p className="text-white/70 text-[15px] leading-relaxed font-light">
                    "{member.overview}"
                  </p>
                </div>

                {/* LinkedIn Bottom Button */}
                <div className="mt-auto w-full flex justify-center pt-6 border-t border-white/5">
                  <Link 
                    href={member.linkedin} 
                    target="_blank" 
                    className="group/btn flex items-center gap-2 text-[#0A66C2] hover:text-white transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5 fill-current" />
                    <span className="font-semibold text-sm tracking-wide">Linkedin</span>
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
