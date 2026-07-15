"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mic, PhoneOff, Loader2, X, Mail, Volume2, Phone } from "lucide-react"
import { RetellWebClient } from "retell-client-js-sdk"
import { DEMO_PHONE_DISPLAY, DEMO_PHONE_HREF } from "@/lib/site"

/* ───── Transcript entry ───── */
interface TranscriptEntry {
  role: "agent" | "user"
  content: string
}

export default function HeroCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  // Call state
  const [isCallActive, setIsCallActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const retellClientRef = useRef<RetellWebClient | null>(null)

  // Email gate
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailSubmitting, setEmailSubmitting] = useState(false)

  // Call popup + transcript
  const [showCallPopup, setShowCallPopup] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [isAgentTalking, setIsAgentTalking] = useState(false)
  const [connectionError, setConnectionError] = useState("")

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [transcript])

  /* ───── Retell SDK setup ───── */
  useEffect(() => {
    retellClientRef.current = new RetellWebClient()
    const retellClient = retellClientRef.current

    retellClient.on("call_started", () => {
      setIsCallActive(true)
      setIsConnecting(false)
    })

    retellClient.on("call_ended", () => {
      setIsCallActive(false)
      setIsConnecting(false)
      // Keep popup open briefly so user can read final transcript
    })

    retellClient.on("error", (err) => {
      setIsCallActive(false)
      setIsConnecting(false)
      console.error("Retell error:", err)
    })

    retellClient.on("agent_start_talking", () => {
      setIsAgentTalking(true)
    })

    retellClient.on("agent_stop_talking", () => {
      setIsAgentTalking(false)
    })

    // The "update" event carries transcript data
    retellClient.on("update", (event: any) => {
      if (event?.transcript) {
        // event.transcript is an array of {role, content} entries
        const entries: TranscriptEntry[] = event.transcript.map((t: any) => ({
          role: t.role === "agent" ? "agent" : "user",
          content: t.content || "",
        }))
        setTranscript(entries)
      }
    })

    return () => {
      retellClient.stopCall()
    }
  }, [])

  const retellEndpoint =
    process.env.NEXT_PUBLIC_RETELL_WORKER_URL || "/api/create-web-call"

  /* ───── Email validation ───── */
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  /* ───── Click handler: show email modal ───── */
  const handleAwaazClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isCallActive) {
      retellClientRef.current?.stopCall()
      return
    }
    if (isConnecting) return

    // Show the email gate
    setShowEmailModal(true)
    setEmailError("")
  }

  /* ───── Start call after email ───── */
  const startCall = useCallback(async () => {
    try {
      setIsConnecting(true)
      setShowEmailModal(false)
      setShowCallPopup(true)
      setTranscript([])
      setConnectionError("")

      // Try the configured endpoint, fallback to local API route
      let access_token: string | null = null

      const tryFetch = async (url: string) => {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })
        if (!res.ok) throw new Error("Failed to get access token")
        const data = await res.json()
        return data.access_token
      }

      try {
        access_token = await tryFetch(retellEndpoint)
      } catch (primaryErr) {
        // If the primary endpoint is an external URL, try local API as fallback
        if (retellEndpoint !== "/api/create-web-call") {
          console.warn("Primary endpoint failed, trying local API fallback...")
          access_token = await tryFetch("/api/create-web-call")
        } else {
          throw primaryErr
        }
      }

      if (!access_token) throw new Error("No access token received")
      await retellClientRef.current?.startCall({ accessToken: access_token })
    } catch (err: any) {
      console.error("Could not start call:", err)
      setIsConnecting(false)
      setIsCallActive(false)
      setConnectionError(
        err?.message === "Failed to fetch"
          ? "Unable to reach the voice server. Please try again later."
          : err?.message || "Something went wrong. Please try again."
      )
    }
  }, [email, retellEndpoint])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.")
      return
    }
    setEmailError("")
    setEmailSubmitting(true)
    // Small delay for UX
    await new Promise((r) => setTimeout(r, 300))
    setEmailSubmitting(false)
    startCall()
  }

  const handleEndCall = () => {
    retellClientRef.current?.stopCall()
  }

  const handleClosePopup = () => {
    if (isCallActive) retellClientRef.current?.stopCall()
    setShowCallPopup(false)
    setTranscript([])
  }

  /* ───── Render ───── */
  return (
    <>
      <section
        id="demo"
        ref={ref}
        className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden font-sans border-b border-white/5 scroll-mt-24"
      >
        {/* Background gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-cyan/5 via-finova-midnight to-finova-midnight pointer-events-none" />

        <div className="container relative z-20 mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto flex flex-col items-center text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] pr-2">
              Don&apos;t take our word for it. Watch an agent work.
            </h2>
            <p className="mt-6 text-white/60 text-base md:text-lg font-light leading-relaxed max-w-2xl">
              The agent on this page is one of ours, running on the{" "}
              <a href="/products/awaaz" className="text-finova-cyan hover:text-white transition-colors">
                Awaaz Labs
              </a>{" "}
              platform. Start a web call, and watch it qualify you, answer from verified information,
              and book your call straight into the calendar. It is one visible surface of the same
              core that runs ERP workflows and custom builds for our clients, and every interaction
              it has is scored by{" "}
              <a href="/products/qualicall" className="text-finova-cyan hover:text-white transition-colors">
                QualiCore
              </a>
              , the same governance every client deployment gets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            {/* Primary: Start a web call */}
            <button
              onClick={handleAwaazClick}
              className={`group inline-flex min-w-[260px] items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                isCallActive
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white text-black hover:bg-finova-cyan hover:text-white"
              }`}
            >
              {isConnecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isCallActive ? (
                <PhoneOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
              {isConnecting
                ? "Connecting..."
                : isCallActive
                  ? "End Call"
                  : "Start a web call"}
            </button>

            {/* Secondary: Dial demo number */}
            <a
              href={DEMO_PHONE_HREF}
              className="group inline-flex min-w-[260px] items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] text-white text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10 backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 text-finova-cyan" />
              Dial {DEMO_PHONE_DISPLAY}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════ EMAIL MODAL ════════════ */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-finova-midnight border border-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(14,165,233,0.1)] overflow-hidden"
            >
              {/* Ambient glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-finova-cyan/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-finova-magenta/10 blur-3xl rounded-full pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setShowEmailModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-finova-magenta/10 border border-finova-magenta/20 flex items-center justify-center text-finova-magenta mb-6 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                  <Mic className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                  Talk to Awaaz
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Enter your email to start a live voice conversation with our AI
                  assistant. We&apos;ll send you a summary of the call.
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="relative group">
                    <label
                      htmlFor="awaaz-email"
                      className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2 group-focus-within:text-finova-cyan transition-colors"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="awaaz-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (emailError) setEmailError("")
                        }}
                        placeholder="john@example.com"
                        required
                        autoFocus
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-11 pr-5 py-4 text-white focus:ring-0 focus:outline-none placeholder:text-white/20 transition-all duration-300 focus:border-finova-cyan/50 focus:bg-finova-cyan/[0.02] shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]"
                      />
                    </div>
                    {emailError && (
                      <p className="mt-2 text-xs text-red-400 font-mono">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={emailSubmitting}
                    className="relative w-full px-8 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white overflow-hidden group/btn transition-all duration-300 hover:border-finova-magenta shadow-[0_0_0_rgba(217,70,239,0)] hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-finova-magenta/20 to-finova-purple/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-3 text-white/90 group-hover/btn:text-white transition-colors">
                      {emailSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Start Conversation
                          <Mic className="w-4 h-4 text-finova-magenta" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════ CALL POPUP WITH TRANSCRIPTION ════════════ */}
      <AnimatePresence>
        {showCallPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 sm:px-8 py-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] min-h-[500px] rounded-[2rem] bg-finova-midnight border border-white/10 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_80px_rgba(14,165,233,0.15)] flex flex-col"
            >
              {/* Call popup background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-finova-midnight via-finova-midnight/95 to-finova-midnight z-10" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-finova-cyan/15 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] rounded-full bg-finova-magenta/10 blur-3xl" />
              </div>

              {/* Header */}
              <div className="relative z-20 px-8 pt-8 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Pulsing indicator */}
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all duration-500 ${
                        isCallActive
                          ? "bg-finova-magenta/20 border-finova-magenta/40 shadow-[0_0_30px_rgba(217,70,239,0.3)]"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      {isConnecting ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : isCallActive ? (
                        <Volume2
                          className={`w-6 h-6 transition-all duration-300 ${isAgentTalking ? "text-finova-cyan scale-110 drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]" : "text-finova-magenta"}`}
                        />
                      ) : (
                        <PhoneOff className="w-6 h-6 text-white/40" />
                      )}
                    </div>
                    {isCallActive && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-finova-midnight animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-widest drop-shadow-md">
                      Awaaz Voice AI
                    </h4>
                    <p className="text-white/60 text-sm font-mono flex items-center gap-2">
                      {isConnecting ? (
                        "Establishing connection..."
                      ) : isCallActive ? (
                        isAgentTalking ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-finova-cyan animate-pulse" />
                            Awaaz is speaking
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-finova-magenta animate-pulse" />
                            Listening to you
                          </>
                        )
                      ) : (
                        "Call ended"
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClosePopup}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subtitles Area */}
              <div className="relative z-20 flex-1 px-8 pb-20 flex flex-col items-center justify-end pointer-events-none text-center">
                <AnimatePresence mode="wait">
                  {transcript.length > 0 ? (
                    <motion.div
                      key={transcript.length}
                      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                      transition={{ duration: 0.4 }}
                      className="max-w-3xl w-full"
                    >
                      <div
                        className={`text-sm font-bold uppercase tracking-[0.2em] mb-3 ${
                          transcript[transcript.length - 1].role === "agent"
                            ? "text-finova-cyan"
                            : "text-finova-magenta"
                        }`}
                      >
                        {transcript[transcript.length - 1].role === "agent" ? "Awaaz" : "You"}
                      </div>
                      <p
                        className="text-3xl sm:text-5xl font-medium leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)]"
                        style={{
                          textShadow:
                            transcript[transcript.length - 1].role === "agent"
                              ? "0 0 40px rgba(14, 165, 233, 0.4)"
                              : "0 0 40px rgba(217, 70, 239, 0.4)",
                        }}
                      >
                        "{transcript[transcript.length - 1].content}"
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="max-w-3xl w-full"
                    >
                      {isConnecting ? (
                        <p className="text-2xl sm:text-4xl font-medium text-white/50 animate-pulse drop-shadow-md">
                          Connecting to voice server...
                        </p>
                      ) : isCallActive ? (
                        <div className="flex flex-col items-center gap-4">
                          {/* Idle waveform */}
                          <div className="flex items-center justify-center gap-1.5 h-12">
                            {[...Array(7)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 bg-finova-cyan rounded-full drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]"
                                animate={{
                                  height: [8, Math.random() * 20 + 10, 8],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                          <p className="text-2xl sm:text-4xl font-medium text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
                            Start speaking...
                          </p>
                        </div>
                      ) : connectionError ? (
                        <p className="text-2xl sm:text-4xl font-medium text-red-400 drop-shadow-md">
                          {connectionError}
                        </p>
                      ) : (
                        <p className="text-xl sm:text-3xl font-medium text-white/30 drop-shadow-md">
                          Initializing agent...
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Controls */}
              <div className="relative z-20 px-8 py-6 flex items-center justify-between border-t border-white/5 bg-finova-midnight/40 backdrop-blur-md">
                <p className="text-white/40 text-sm font-mono truncate max-w-[50%]">
                  <span className="text-white/20 mr-2">Authenticated as:</span>
                  {email}
                </p>

                {isCallActive ? (
                  <button
                    onClick={handleEndCall}
                    className="px-8 py-3 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-sm font-bold uppercase tracking-widest hover:bg-red-500/30 hover:scale-105 transition-all flex items-center gap-3 backdrop-blur-md"
                  >
                    <PhoneOff className="w-4 h-4" />
                    End Call
                  </button>
                ) : (
                  <button
                    onClick={handleClosePopup}
                    className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-bold uppercase tracking-widest hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-md"
                  >
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
