"use client"

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Headphones,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  contactAfter,
  contactDirect,
  contactForm,
  contactHero,
  contactInvite,
  contactSiblings,
  contactWays,
} from "@/lib/contact"

const ease = [0.16, 1, 0.3, 1] as const

function Container({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium tracking-wide text-white/40">
        <li>
          <Link href="/" className="transition-colors hover:text-finova-cyan">
            Home
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" />
        </li>
        <li className="text-white/75" aria-current="page">
          Contact
        </li>
      </ol>
    </nav>
  )
}

function MultiLinkedText({
  text,
  links,
}: {
  text: string
  links: { phrase: string; href: string; external?: boolean }[]
}) {
  type Segment = { type: "text"; value: string } | { type: "link"; phrase: string; href: string; external?: boolean }
  let segments: Segment[] = [{ type: "text", value: text }]

  for (const link of links) {
    const next: Segment[] = []
    for (const seg of segments) {
      if (seg.type === "link") {
        next.push(seg)
        continue
      }
      const parts = seg.value.split(link.phrase)
      parts.forEach((part, i) => {
        if (part) next.push({ type: "text", value: part })
        if (i < parts.length - 1) {
          next.push({
            type: "link",
            phrase: link.phrase,
            href: link.href,
            external: link.external,
          })
        }
      })
    }
    segments = next
  }

  return (
    <>
      {segments.map((seg, i) =>
        seg.type === "text" ? (
          <span key={i}>{seg.value}</span>
        ) : seg.external || seg.href.startsWith("mailto:") || seg.href.startsWith("tel:") ? (
          <a
            key={i}
            href={seg.href}
            className="font-medium text-finova-cyan underline-offset-4 transition-colors hover:text-finova-lightBlue hover:underline"
            {...(seg.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {seg.phrase}
          </a>
        ) : (
          <Link
            key={i}
            href={seg.href}
            className="font-medium text-finova-cyan underline-offset-4 transition-colors hover:text-finova-lightBlue hover:underline"
          >
            {seg.phrase}
          </Link>
        ),
      )}
    </>
  )
}

function MagneticButton({
  children,
  href,
  external,
  variant = "primary",
}: {
  children: ReactNode
  href: string
  external?: boolean
  variant?: "primary" | "secondary"
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2)
  }

  const primary =
    "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-finova-cyan hover:text-white active:bg-finova-cyan active:text-white will-change-transform"
  const secondary =
    "group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-finova-cyan/50 hover:bg-finova-cyan/10 will-change-transform"

  const shared = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: () => {
      x.set(0)
      y.set(0)
    },
    onPointerUp: clearStickyCta,
    style: { x: springX, y: springY },
    className: variant === "primary" ? primary : secondary,
  }

  if (external) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </motion.a>
    )
  }

  return (
    <motion.a href={href} {...shared}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </motion.a>
  )
}

function leadRest(text: string) {
  const i = text.indexOf(". ")
  if (i === -1) return { lead: text, rest: "" }
  return { lead: text.slice(0, i + 1), rest: text.slice(i + 2) }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

const wayIcons = [Calendar, Headphones, MessageSquare] as const

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/5 pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-finova-cyan/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[20rem] w-[20rem] rounded-full bg-finova-magenta/12 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(14,165,233,0.12),transparent_60%)]" />

      <Container>
        <Breadcrumb />
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.08]"
        >
          {contactHero.h1}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-8 max-w-2xl text-base font-light leading-relaxed text-white/60 md:text-lg"
        >
          {contactHero.body}
        </motion.p>
      </Container>
    </section>
  )
}

function Ways() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-way]", {
        y: 32,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_50%,rgba(14,165,233,0.08),transparent_55%)]" />
      <Container>
        <Reveal>
          <h2 className="mx-auto mb-12 max-w-xl text-center text-3xl font-bold tracking-tight text-white md:mb-16 md:text-4xl">
            {contactWays.heading}
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {contactWays.items.map((way, i) => {
            const { lead, rest } = leadRest(way.text)
            const Icon = wayIcons[i]
            const href = way.href === "calendly" ? CALENDLY_URL : way.href
            const isPrimary = i === 0

            return (
              <article
                key={way.cta}
                data-way
                className={`group relative flex h-full flex-col rounded-2xl border p-6 transition-colors duration-300 md:p-7 ${
                  isPrimary
                    ? "border-finova-cyan/35 bg-gradient-to-b from-finova-cyan/[0.1] to-white/[0.02]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${
                    isPrimary
                      ? "border-finova-cyan/40 bg-finova-cyan/15 text-finova-cyan"
                      : "border-white/10 bg-white/[0.04] text-white/70"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="mb-3 font-mono text-[11px] tracking-[0.2em] text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-white md:text-xl">
                  {lead}
                </h3>
                <p className="mb-8 flex-1 text-[15px] font-light leading-relaxed text-white/60">
                  {rest}
                </p>
                {way.external || way.href === "calendly" ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerUp={clearStickyCta}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-finova-cyan transition-colors hover:text-white"
                  >
                    {way.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-finova-cyan transition-colors hover:text-white"
                  >
                    {way.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function MessageForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [phone, setPhone] = useState("")
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [companyError, setCompanyError] = useState(false)
  const [messageError, setMessageError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const f = contactForm.fields

  const fieldClass = (active: boolean, err?: boolean) =>
    `w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors ${
      err
        ? "border-red-400/50 focus:border-red-400"
        : active
          ? "border-finova-cyan/50"
          : "border-white/10 hover:border-white/20"
    }`

  const validateName = (value = name) => {
    const ok = Boolean(value.trim())
    setNameError(!ok)
    return ok
  }
  const validateEmail = (value = email) => {
    const ok = isValidEmail(value)
    setEmailError(!ok)
    return ok
  }
  const validateCompany = (value = company) => {
    const ok = Boolean(value.trim())
    setCompanyError(!ok)
    return ok
  }
  const validateMessage = (value = message) => {
    const ok = Boolean(value.trim())
    setMessageError(!ok)
    return ok
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const nameOk = validateName()
    const emailOk = validateEmail()
    const companyOk = validateCompany()
    const messageOk = validateMessage()
    if (!nameOk || !emailOk || !companyOk || !messageOk) return

    setLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
          phone: phone.trim(),
          marketingConsent,
          sourcePage: "/contact",
          subject: company.trim(),
        }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "failed")
      }
      setSuccess(true)
      setName("")
      setEmail("")
      setCompany("")
      setMessage("")
      setPhone("")
      setMarketingConsent(false)
      setNameError(false)
      setEmailError(false)
      setCompanyError(false)
      setMessageError(false)
      setTimeout(() => setSuccess(false), 6000)
    } catch {
      // Keep form usable; no invented error copy
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="send-message"
      className="relative scroll-mt-28 border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_100%_0%,rgba(147,51,234,0.1),transparent_50%)]" />
      <Container>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white md:mb-12 md:text-4xl">
              {contactForm.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-9"
              noValidate
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white/80">
                    {f.name.label}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={f.name.placeholder}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (nameError) setNameError(false)
                    }}
                    onFocus={() => setFocused("name")}
                    onBlur={() => {
                      setFocused(null)
                      validateName()
                    }}
                    className={fieldClass(focused === "name", nameError)}
                    aria-invalid={nameError}
                    aria-describedby={nameError ? "contact-name-error" : undefined}
                  />
                  {nameError ? (
                    <p id="contact-name-error" className="mt-2 text-sm text-red-300/90">
                      {f.name.error}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white/80">
                    {f.email.label}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={f.email.placeholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError(false)
                    }}
                    onFocus={() => setFocused("email")}
                    onBlur={() => {
                      setFocused(null)
                      validateEmail()
                    }}
                    className={fieldClass(focused === "email", emailError)}
                    aria-invalid={emailError}
                    aria-describedby={emailError ? "contact-email-error" : undefined}
                  />
                  {emailError ? (
                    <p id="contact-email-error" className="mt-2 text-sm text-red-300/90">
                      {f.email.error}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-company" className="mb-2 block text-sm font-medium text-white/80">
                    {f.company.label}
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder={f.company.placeholder}
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value)
                      if (companyError) setCompanyError(false)
                    }}
                    onFocus={() => setFocused("company")}
                    onBlur={() => {
                      setFocused(null)
                      validateCompany()
                    }}
                    className={fieldClass(focused === "company", companyError)}
                    aria-invalid={companyError}
                    aria-describedby={companyError ? "contact-company-error" : undefined}
                  />
                  {companyError ? (
                    <p id="contact-company-error" className="mt-2 text-sm text-red-300/90">
                      {f.company.error}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white/80">
                    {f.message.label}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={f.message.placeholder}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      if (messageError) setMessageError(false)
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => {
                      setFocused(null)
                      validateMessage()
                    }}
                    className={`${fieldClass(focused === "message", messageError)} resize-y min-h-[140px]`}
                    aria-invalid={messageError}
                    aria-describedby={messageError ? "contact-message-error" : undefined}
                  />
                  {messageError ? (
                    <p id="contact-message-error" className="mt-2 text-sm text-red-300/90">
                      {f.message.error}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-white/80">
                    {f.phone.label}
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    className={fieldClass(focused === "phone")}
                  />
                  <label className="mt-3 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-transparent text-finova-cyan focus:ring-finova-cyan/40"
                    />
                    <span className="text-sm font-light leading-relaxed text-white/55">
                      {f.phone.consent}
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-8">
                {success ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mb-6 flex gap-4 rounded-2xl border border-finova-cyan/35 bg-finova-cyan/[0.1] p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-finova-cyan" />
                    <div>
                      <p className="text-base font-semibold tracking-tight text-white">
                        {contactForm.successHeading}
                      </p>
                      <p className="mt-1.5 text-sm font-light leading-relaxed text-white/70">
                        {contactForm.successBody}
                      </p>
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading || success}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-finova-cyan hover:text-white active:bg-finova-cyan active:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? (
                    "Sending…"
                  ) : success ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Sent
                    </>
                  ) : (
                    <>
                      {contactForm.submit}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-sm font-light leading-relaxed text-white/45">
                  <MultiLinkedText
                    text={contactForm.underButton}
                    links={[
                      {
                        phrase: contactForm.urgentAnchor,
                        href: CALENDLY_URL,
                        external: true,
                      },
                    ]}
                  />
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Direct() {
  return (
    <section className="relative border-b border-white/5 py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-finova-cyan/[0.06] p-7 md:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-finova-cyan/15 blur-[70px]" />
          <Reveal>
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-finova-cyan">
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              {contactDirect.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-white/60 md:text-lg">
              <MultiLinkedText text={contactDirect.body} links={contactDirect.links} />
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function After() {
  const sectionRef = useRef<HTMLElement>(null)
  const [branch, setBranch] = useState<"fit" | "nofit">("fit")

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-after-y]", {
        y: 28,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.from("[data-after-fork]", {
        scaleY: 0,
        duration: 0.9,
        ease: "power3.out",
        transformOrigin: "top center",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setBranch((b) => (b === "fit" ? "nofit" : "fit"))
    }, 4200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <Container>
        <div data-after-y className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem]">
            {contactAfter.heading}
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-white/50 md:text-lg">
            {contactAfter.promise}
          </p>
        </div>

        {/* Honest fork — reads → fit | not a fit → honest read */}
        <div data-after-y className="relative mx-auto mt-14 max-w-4xl md:mt-16">
          {/* Stem: a person reads */}
          <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#070d22]/85 px-6 py-5 text-center md:px-8 md:py-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-finova-cyan/[0.08] to-transparent" />
            <p className="relative text-base font-medium text-white/85 md:text-lg">
              {contactAfter.reads}
            </p>
          </div>

          {/* Fork rails */}
          <div className="relative mx-auto flex h-10 w-full max-w-lg justify-center md:h-14">
            <span
              aria-hidden
              data-after-fork
              className="absolute top-0 h-full w-px bg-gradient-to-b from-white/30 to-white/10"
            />
          </div>

          <div
            className="grid gap-4 md:grid-cols-2 md:gap-5"
            onMouseLeave={() => setBranch("fit")}
          >
            {/* Fit branch */}
            <button
              type="button"
              onMouseEnter={() => setBranch("fit")}
              onFocus={() => setBranch("fit")}
              className={`relative overflow-hidden rounded-[1.5rem] border p-6 text-left transition-all duration-500 md:p-8 ${
                branch === "fit"
                  ? "border-finova-cyan/40 bg-gradient-to-br from-finova-cyan/[0.14] via-finova-cyan/[0.04] to-transparent"
                  : "border-white/10 bg-white/[0.02] opacity-70 hover:opacity-90"
              }`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  branch === "fit" ? "text-finova-cyan" : "text-white/30"
                }`}
              >
                {contactAfter.fitLabel}
              </span>
              <p
                className={`mt-4 text-[15px] font-light leading-relaxed transition-colors duration-300 md:text-base ${
                  branch === "fit" ? "text-white/80" : "text-white/45"
                }`}
              >
                {contactAfter.fit}
              </p>
            </button>

            {/* Not a fit branch */}
            <button
              type="button"
              onMouseEnter={() => setBranch("nofit")}
              onFocus={() => setBranch("nofit")}
              className={`relative overflow-hidden rounded-[1.5rem] border p-6 text-left transition-all duration-500 md:p-8 ${
                branch === "nofit"
                  ? "border-finova-magenta/40 bg-gradient-to-br from-finova-magenta/[0.14] via-finova-magenta/[0.04] to-transparent"
                  : "border-white/10 bg-white/[0.02] opacity-70 hover:opacity-90"
              }`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  branch === "nofit" ? "text-finova-magenta" : "text-white/30"
                }`}
              >
                {contactAfter.noFitLabel}
              </span>
              <p
                className={`mt-4 text-[15px] font-light leading-relaxed transition-colors duration-300 md:text-base ${
                  branch === "nofit" ? "text-white/80" : "text-white/45"
                }`}
              >
                {contactAfter.noFit}
              </p>
            </button>
          </div>

          {/* Converge rails */}
          <div className="relative mx-auto flex h-10 w-full max-w-lg justify-center md:h-14">
            <span
              aria-hidden
              className="absolute bottom-0 top-0 w-px bg-gradient-to-b from-white/10 to-white/30"
            />
          </div>

          {/* Either way — honest read */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-white/[0.06] via-[#070d22]/90 to-finova-cyan/[0.08] p-7 text-center md:p-10">
            <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-finova-cyan/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-finova-magenta/15 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.p
                key={branch}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                className="relative text-base font-light leading-relaxed text-white/70 md:text-lg lg:text-xl lg:leading-relaxed"
              >
                {contactAfter.eitherWay.split(contactAfter.honestRead).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span
                        className={`font-medium ${
                          branch === "fit" ? "text-finova-cyan" : "text-finova-magenta"
                        }`}
                      >
                        {contactAfter.honestRead}
                      </span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Invite() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(14,165,233,0.18),transparent_65%)]" />
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            {contactInvite.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href={CALENDLY_URL} external>
              {contactInvite.primaryCta}
            </MagneticButton>
            <MagneticButton href={contactInvite.secondaryHref} variant="secondary">
              {contactInvite.secondaryCta}
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <nav
            aria-label="Related pages"
            className="mt-16 flex flex-wrap items-center justify-center gap-y-2 text-sm text-white/35"
          >
            {contactSiblings.map((s, i) => (
              <span key={s.href} className="inline-flex items-center">
                {i > 0 ? <span className="mx-3 text-white/15">·</span> : null}
                <Link href={s.href} className="transition-colors hover:text-finova-cyan">
                  {s.name}
                </Link>
              </span>
            ))}
          </nav>
        </Reveal>
      </Container>
    </section>
  )
}

export default function ContactPage() {
  return (
    <main className="bg-finova-midnight text-white selection:bg-finova-magenta/30 selection:text-white">
      <Hero />
      <Ways />
      <MessageForm />
      <Direct />
      <After />
      <Invite />
    </main>
  )
}
