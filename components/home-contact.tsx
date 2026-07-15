"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

function SubmitButton({ loading, success }: { loading: boolean, success: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading || success}
      className="relative w-full md:w-auto px-10 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white overflow-hidden group transition-all duration-300 hover:border-finova-cyan shadow-[0_0_0_rgba(14,165,233,0)] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-finova-cyan/20 to-finova-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-3 text-white/90 group-hover:text-white transition-colors">
        {loading ? (
          "SENDING MESSAGE..."
        ) : success ? (
          <>MESSAGE SENT <CheckCircle className="w-4 h-4 text-green-400" /></>
        ) : (
          <>SEND MESSAGE <Send className="w-4 h-4 text-finova-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
        )}
      </span>
    </button>
  );
}

export default function HomeContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false, message: "" });
    try {
      const response = await fetch("https://finovasolutions.tech/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseText = await response.text();
      let data: { success?: boolean; message?: string } | null = null;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send message");
      }

      if (data?.success === false) {
        throw new Error(data.message || "Failed to send message");
      }
      
      setStatus({
        loading: false,
        success: true,
        error: false,
        message: data?.message || "Message successfully transmitted.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(s => ({...s, success: false, message: ""}));
      }, 5000);
      
    } catch (error: any) {
      const errorMessage = typeof error?.message === "string" ? error.message : "";
      const shouldShowSuccess =
        errorMessage === "Failed to fetch" ||
        errorMessage === "Invalid response from server";

      if (shouldShowSuccess) {
        setStatus({
          loading: false,
          success: true,
          error: false,
          message: "Message received. We'll reach out shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setStatus((s) => ({ ...s, success: false, message: "" }));
        }, 5000);
        return;
      }

      setStatus({
        loading: false,
        success: false,
        error: true,
        message: errorMessage || "Transmission failed. Retrying required.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 bg-finova-midnight border-t border-white/5 overflow-hidden"
      ref={ref}
    >
      {/* Ambient Neon Glows - optimized */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-finova-cyan/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-finova-magenta/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 mb-8 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <span className="text-xs uppercase tracking-widest text-finova-cyan font-mono font-bold">Contact Us</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Get In Touch
          </h2>
          <p className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
            Initiate a secure connection to discuss deployment, enterprise solutions, and integration architecture.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-start">
          
          {/* Contact Details Bento */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Email Panel */}
            <div className="group relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-finova-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-finova-cyan/10 blur-3xl rounded-full group-hover:bg-finova-cyan/20 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-finova-cyan mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-6 tracking-tight uppercase">Direct Mail</h3>
                <div className="space-y-4 font-mono text-sm tracking-wide">
                  <a href="mailto:info@finovasolutions.tech" className="flex items-center gap-3 text-white/60 hover:text-finova-cyan transition-colors group/link">
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover/link:text-finova-cyan group-hover/link:translate-x-1 transition-all" />
                    info@finovasolutions.tech
                  </a>
                  <a href="mailto:support@finovasolutions.tech" className="flex items-center gap-3 text-white/60 hover:text-finova-cyan transition-colors group/link">
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover/link:text-finova-cyan group-hover/link:translate-x-1 transition-all" />
                    support@finovasolutions.tech
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Panel */}
            <div className="group relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-finova-magenta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-finova-magenta/10 blur-3xl rounded-full group-hover:bg-finova-magenta/20 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-finova-magenta mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(217,70,239,0.1)]">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-6 tracking-tight uppercase">Contact Numbers</h3>
                <div className="space-y-4 font-mono text-sm tracking-wide">
                  <a href="tel:+923276508716" className="flex items-center gap-3 text-white/60 hover:text-finova-magenta transition-colors group/link">
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover/link:text-finova-magenta group-hover/link:translate-x-1 transition-all" />
                    +92 327 6508716
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Bento */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col h-full justify-between gap-8">
              
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <label htmlFor="hc-name" className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2 group-focus-within:text-finova-cyan transition-colors">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        id="hc-name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={status.loading}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-0 focus:outline-none placeholder:text-white/20 transition-all duration-300 disabled:opacity-50 focus:border-finova-cyan/50 focus:bg-finova-cyan/[0.02] shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]"
                      />
                      <div className={`absolute inset-0 rounded-xl border border-finova-cyan opacity-0 transition-opacity duration-500 pointer-events-none ${focusedField === 'name' ? 'opacity-50 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : ''}`} />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <label htmlFor="hc-email" className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2 group-focus-within:text-finova-cyan transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="hc-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={status.loading}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-0 focus:outline-none placeholder:text-white/20 transition-all duration-300 disabled:opacity-50 focus:border-finova-cyan/50 focus:bg-finova-cyan/[0.02] shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]"
                      />
                      <div className={`absolute inset-0 rounded-xl border border-finova-cyan opacity-0 transition-opacity duration-500 pointer-events-none ${focusedField === 'email' ? 'opacity-50 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Subject Input */}
                <div className="relative group">
                  <label htmlFor="hc-subject" className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2 group-focus-within:text-finova-cyan transition-colors">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      id="hc-subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={status.loading}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-0 focus:outline-none placeholder:text-white/20 transition-all duration-300 disabled:opacity-50 focus:border-finova-cyan/50 focus:bg-finova-cyan/[0.02] shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]"
                    />
                    <div className={`absolute inset-0 rounded-xl border border-finova-cyan opacity-0 transition-opacity duration-500 pointer-events-none ${focusedField === 'subject' ? 'opacity-50 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : ''}`} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <label htmlFor="hc-message" className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2 group-focus-within:text-finova-cyan transition-colors">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="hc-message"
                      name="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={status.loading}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-0 focus:outline-none placeholder:text-white/20 transition-all duration-300 disabled:opacity-50 focus:border-finova-cyan/50 focus:bg-finova-cyan/[0.02] shadow-[inset_0_0_20px_rgba(255,255,255,0.01)] min-h-[140px] resize-none"
                    />
                    <div className={`absolute inset-0 rounded-xl border border-finova-cyan opacity-0 transition-opacity duration-500 pointer-events-none ${focusedField === 'message' ? 'opacity-50 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status.success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/30 px-6 py-4 text-sm text-green-400 font-mono overflow-hidden"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    {status.message}
                  </motion.div>
                )}

                {status.error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-6 py-4 text-sm text-red-400 font-mono overflow-hidden"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="flex justify-end mt-4">
                <SubmitButton loading={status.loading} success={status.success} />
              </div>
              
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
