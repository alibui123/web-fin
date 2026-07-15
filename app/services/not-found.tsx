import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import BlobBackground from "@/components/blob-background"

export default function ServiceNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <BlobBackground />
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 rounded-full bg-foreground/5 border border-foreground/10 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
            404
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-foreground/70 text-xl max-w-md mb-8">
          We couldn't find the service you're looking for. It may have been moved or doesn't exist.
        </p>
        
        <Button asChild>
          <Link href="/services" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all services
          </Link>
        </Button>
      </div>
    </main>
  )
} 