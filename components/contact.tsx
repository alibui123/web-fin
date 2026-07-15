"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MovingBorder } from "./ui-effects/moving-border"
import { Card } from "./ui/card"
import { Mail, Phone } from "lucide-react"

const contactInfo = [
  {
    title: "Email Us",
    value: "contact@finovasolutions.tech",
    gradient: "from-cyan-500 to-blue-600",
    icon: Mail
  },
  {
    title: "Call Us",
    value: "+1 (555) 123-4567",
    gradient: "from-purple-500 to-pink-600",
    icon: Phone
  }
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false, message: "" });

    try {
      const response = await fetch('https://finovasolutions.tech/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let data: { success?: boolean; message?: string } | null = null

      try {
        data = JSON.parse(responseText)
      } catch {
        data = null
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || `HTTP error! status: ${response.status}`)
      }
      
      if (data?.success || response.ok) {
        setStatus({
          loading: false,
          success: true,
          error: false,
          message: data?.message || 'Message sent successfully!'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data?.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: error.message || 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-background/50">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Ready to transform your business with cutting-edge technology? Let's start the conversation.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <Card
                key={info.title}
                className="p-4 text-center group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-2">
                  <span className={`text-sm font-medium uppercase tracking-wider bg-gradient-to-r ${info.gradient} bg-clip-text text-transparent`}>
                    {info.title}
                  </span>
                  <p className="text-base sm:text-lg font-semibold flex items-center justify-center gap-2">
                    <Icon className="w-4 h-4 text-foreground/70" />
                    {info.value}
                  </p>
                </div>
              </Card>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <MovingBorder duration={3000} className="rounded-xl overflow-hidden">
            <div className="p-6 sm:p-7 md:p-8 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="border-primary/20 focus:border-cyan-500 bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="border-primary/20 focus:border-cyan-500 bg-background/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="border-primary/20 focus:border-cyan-500 bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    rows={6}
                    className="border-primary/20 focus:border-cyan-500 bg-background/50"
                  />
                </div>

                {status.success && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">{status.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {status.error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">{status.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status.loading}
                    className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                  >
                    {status.loading ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </MovingBorder>
        </motion.div>
      </div>
    </section>
  )
}

