import ServicesIntro from "@/components/services-intro"
import ServicesList from "@/components/services-list"
import WhyFinova from "@/components/why-finova"

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-finova-midnight relative overflow-hidden">
      {/* Neon glowing aura behind content globally for the page */}
      <div className="fixed top-[20%] left-[-10%] w-[500px] h-[500px] bg-finova-cyan/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-finova-magenta/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" />
      
      <div className="relative z-10">
        <ServicesIntro />
        <ServicesList />
        <WhyFinova />
      </div>
    </main>
  )
} 