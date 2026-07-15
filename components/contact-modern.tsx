"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function ContactModern() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://finovasolutions.tech/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const responseText = await response.text()
      let data: { success?: boolean; message?: string } | null = null

      try {
        data = JSON.parse(responseText)
      } catch {
        data = null
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || 'Failed to send message')
      }

      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error('Error sending message:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 finova-text-gradient">Get in Touch</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Ready to transform your business with cutting-edge technology? Let's start the conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 relative"
          >
            <div className="p-8 rounded-2xl backdrop-blur-md border border-primary/10 relative overflow-hidden glass-effect">
              {/* Background gradient blobs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-finova-blue/20 to-finova-teal/20 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-finova-darkBlue/20 to-finova-lightBlue/20 blur-3xl"></div>

              <div className="relative z-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full finova-gradient flex items-center justify-center mb-6">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-center text-foreground/70 max-w-md">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button
                      className="mt-6 finova-gradient hover:opacity-90 text-white"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="border-primary/20 focus:border-finova-lightBlue bg-background/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          className="border-primary/20 focus:border-finova-lightBlue bg-background/50"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="border-primary/20 focus:border-finova-lightBlue bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={6}
                        className="border-primary/20 focus:border-finova-lightBlue bg-background/50"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto finova-gradient hover:opacity-90 text-white border-0 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-finova-darkBlue to-finova-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="p-8 rounded-2xl backdrop-blur-md border border-primary/10 h-full glass-effect">
              <h3 className="text-2xl font-bold mb-8 finova-text-gradient">Contact Information</h3>

              <div className="space-y-8">
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-finova-darkBlue to-finova-lightBlue text-white mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-foreground/80">
                      123 Innovation Avenue, Suite 456
                      <br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-finova-blue to-finova-teal text-white mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-foreground/80">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-finova-darkBlue to-finova-lightBlue text-white mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-foreground/80">info@finovasolutions.tech</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-finova-darkBlue/10 to-finova-teal/10 backdrop-blur-sm">
                <h4 className="font-semibold mb-4">Business Hours</h4>
                <p className="text-foreground/80 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-foreground/80">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

