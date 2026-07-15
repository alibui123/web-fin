"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Users } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  focusArea: string
  message: string
}

export default function ConsultationBooking() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    focusArea: "",
    message: "",
  })

  const calendlyBaseUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/finovasolutions/free-consultation"
  const bookingEndpoint = "https://finovasolutions.tech/consultation-booking.php"

  const focusAreas = [
    "AI & Machine Learning Solutions",
    "Blockchain & Web3 Development",
    "Full-Stack Development",
    "Enterprise Digital Transformation",
    "IoT & Smart Systems",
    "Custom Software Development",
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFocusAreaSelect = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      focusArea: area,
    }))
  }

  const buildCalendlyUrl = () => {
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      a1: formData.focusArea,
    })

    if (formData.company) {
      params.set("a2", formData.company)
    }

    if (formData.phone) {
      params.set("a3", formData.phone)
    }

    if (formData.message) {
      params.set("a4", formData.message)
    }

    return `${calendlyBaseUrl}?${params.toString()}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.focusArea) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(bookingEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: "consultation_inquiry",
        }),
      })

      const responseText = await response.text()
      let responseData: { success?: boolean; message?: string } | null = null

      try {
        responseData = JSON.parse(responseText)
      } catch {
        responseData = null
      }

      if (!response.ok || responseData?.success === false) {
        throw new Error(responseData?.message || "Failed to submit consultation request")
      }

      toast({
        title: "Success!",
        description: "Your consultation request has been submitted. Redirecting you to Calendly for time-slot booking...",
      })

      window.location.href = buildCalendlyUrl()
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Step Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-2 md:gap-4 mb-12 md:mb-16"
        >
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2 md:gap-4">
              <motion.div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= step
                    ? "bg-gradient-to-r from-finova-teal to-finova-blue text-white"
                    : "bg-foreground/10 text-foreground/50"
                }`}
                animate={
                  currentStep === step
                    ? { scale: 1.1, boxShadow: "0 0 20px rgba(43, 142, 190, 0.5)" }
                    : { scale: 1, boxShadow: "none" }
                }
              >
                {step}
              </motion.div>
              {step < 3 && (
                <div
                  className={`w-8 md:w-12 h-1 rounded-full transition-colors ${
                    currentStep > step ? "bg-finova-teal" : "bg-foreground/10"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Tell Us About You */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-finova-teal mb-2">
                    Tell Us About You
                  </h2>
                  <p className="text-foreground/70">
                    Help us understand your needs and background
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="bg-foreground/5 border-foreground/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="bg-foreground/5 border-foreground/10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="bg-foreground/5 border-foreground/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="bg-foreground/5 border-foreground/10"
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end"
                >
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.name || !formData.email}
                    className="bg-gradient-to-r from-finova-teal to-finova-blue hover:from-finova-teal/90 hover:to-finova-blue/90"
                  >
                    Continue
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Your Focus Area */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-finova-blue mb-2">
                    What Are We Solving?
                  </h2>
                  <p className="text-foreground/70">
                    Select your primary area of interest *
                  </p>
                </div>

                <div className="grid gap-3">
                  {focusAreas.map((area, index) => (
                    <motion.button
                      key={area}
                      type="button"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleFocusAreaSelect(area)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.focusArea === area
                          ? "border-finova-teal bg-finova-teal/10"
                          : "border-foreground/10 bg-foreground/5 hover:border-finova-teal/50"
                      }`}
                    >
                      <p className="font-medium">{area}</p>
                    </motion.button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Details (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your project or challenges..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:border-finova-teal focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!formData.focusArea}
                    className="bg-gradient-to-r from-finova-teal to-finova-blue hover:from-finova-teal/90 hover:to-finova-blue/90"
                  >
                    Review & Book
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirm & Submit */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-finova-lightBlue mb-2">
                    Complete Your Booking
                  </h2>
                  <p className="text-foreground/70">
                    Review your information and submit
                  </p>
                </div>

                {/* Summary Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-xl border border-finova-teal/20 bg-gradient-to-br from-finova-teal/5 to-finova-blue/5 space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Name</p>
                      <p className="font-semibold">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Email</p>
                      <p className="font-semibold">{formData.email}</p>
                    </div>
                    {formData.company && (
                      <div>
                        <p className="text-sm text-foreground/60 mb-1">Company</p>
                        <p className="font-semibold">{formData.company}</p>
                      </div>
                    )}
                    {formData.phone && (
                      <div>
                        <p className="text-sm text-foreground/60 mb-1">Phone</p>
                        <p className="font-semibold">{formData.phone}</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-foreground/10 pt-4">
                    <p className="text-sm text-foreground/60 mb-1">Focus Area</p>
                    <p className="font-semibold text-finova-teal">{formData.focusArea}</p>
                  </div>
                </motion.div>

                {/* Timeline Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex gap-4 items-start p-4 rounded-lg border border-foreground/10 bg-foreground/5">
                    <Clock className="h-5 w-5 text-finova-teal flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">60-Minute Strategic Call</p>
                      <p className="text-sm text-foreground/60">We'll confirm the exact time after you submit</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-lg border border-foreground/10 bg-foreground/5">
                    <Users className="h-5 w-5 text-finova-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Expert Consultation</p>
                      <p className="text-sm text-foreground/60">One of our specialists will lead your session</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-lg border border-foreground/10 bg-foreground/5">
                    <Calendar className="h-5 w-5 text-finova-lightBlue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Calendly Time-Slot Booking</p>
                      <p className="text-sm text-foreground/60">After you confirm, you’ll be redirected to Calendly to pick your preferred time</p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-finova-teal to-finova-blue hover:from-finova-teal/90 hover:to-finova-blue/90"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm & Continue to Calendly"}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
