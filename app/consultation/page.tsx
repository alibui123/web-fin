import BlobBackground from "@/components/blob-background"
import ConsultationIntro from "@/components/consultation-intro"
import ConsultationBooking from "@/components/consultation-booking"

export default function ConsultationPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <BlobBackground />
      <ConsultationIntro />
      <ConsultationBooking />
    </main>
  )
}
