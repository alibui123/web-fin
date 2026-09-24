"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { REGIONAL_CLIENTS, projects, type Region } from "@/lib/portfolio-data"
import { Reveal } from "@/components/portfolio/motion-primitives"

const EASE = [0.23, 1, 0.32, 1] as const

type RegionMeta = {
  region: Region
  blurb: string
  accent: string
  /** Position on the corridor SVG viewBox (1000 × 96), as percentages */
  x: number
  y: number
}

const REGION_META: RegionMeta[] = [
  {
    region: "Pakistan",
    blurb: "Government, wallets and banks in live production.",
    accent: "#5ec8d8",
    x: 16.6,
    y: 43.9,
  },
  {
    region: "Gulf",
    blurb: "UAE and Saudi channel partners and agents.",
    accent: "#7dd3a8",
    x: 39.9,
    y: 32.4,
  },
  {
    region: "USA",
    blurb: "Healthcare billing ops across hundreds of clinics.",
    accent: "#8bb4ff",
    x: 59.3,
    y: 66.8,
  },
  {
    region: "Africa",
    blurb: "Community platforms tuned for weak networks.",
    accent: "#f0b46a",
    x: 83.4,
    y: 58.0,
  },
]

const CLIENT_LINKS: Record<string, string> = {
  "Telecom Foundation": "/customers/telecom-foundation",
  "Advanza Tech, UAE": "/customers/advanzatech",
  "Sirius Solutions Global (~400 clinics)": "/customers/sirius-solutions",
  KobiPal: "/customers/kobipal",
}

function countForRegion(region: Region) {
  return projects.filter((p) => p.region === region).length
}

export default function PortfolioRegions() {
  const reduced = useReducedMotion()
  const router = useRouter()
  const [active, setActive] = useState<Region>("Pakistan")

  const activeMeta = REGION_META.find((r) => r.region === active) ?? REGION_META[0]
  const activeBlock = REGIONAL_CLIENTS.find((b) => b.region === active)
  const projectCount = useMemo(() => countForRegion(active), [active])

  return (
    <section className="relative z-10 border-t border-white/[0.06] px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="mb-3 text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Where the work runs
            </h2>
            <p className="text-sm md:text-base font-light text-white/50 leading-relaxed">
              Named clients from this portfolio, by region. Pick a corridor stop to see who we
              serve there.
            </p>
          </div>
          <Link
            href="/partners"
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#5ec8d8]"
          >
            Partners →
          </Link>
        </Reveal>

        {/* Corridor map */}
        <Reveal className="relative mb-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#060a12]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 transition-colors duration-700"
            style={{
              background: `radial-gradient(ellipse at ${activeMeta.x}% 40%, ${activeMeta.accent}33, transparent 55%)`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:28px_28px] opacity-40" />

          <div className="relative z-10 px-5 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10">
            {/* Route line — markers sit on the curve, not a flat midline */}
            <div className="relative mx-auto mb-14 hidden h-28 max-w-4xl md:block">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 96"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden
              >
                <path
                  d="M40 72 C 220 18, 380 18, 500 48 C 620 78, 780 78, 960 28"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                />
                <motion.path
                  d="M40 72 C 220 18, 380 18, 500 48 C 620 78, 780 78, 960 28"
                  stroke={activeMeta.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
                  style={{ pathLength: 1 }}
                />
              </svg>

              {REGION_META.map((meta) => {
                const on = meta.region === active
                return (
                  <button
                    key={meta.region}
                    type="button"
                    onClick={() => setActive(meta.region)}
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
                    style={{ left: `${meta.x}%`, top: `${meta.y}%` }}
                    aria-pressed={on}
                  >
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <motion.span
                        className="relative flex h-4 w-4 items-center justify-center"
                        animate={
                          on && !reduced
                            ? { scale: [1, 1.15, 1] }
                            : { scale: 1 }
                        }
                        transition={
                          on && !reduced
                            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                            : { duration: 0.2 }
                        }
                      >
                        {on && (
                          <span
                            className="absolute inset-[-10px] rounded-full opacity-40 blur-md"
                            style={{ background: meta.accent }}
                          />
                        )}
                        <span
                          className={`relative z-10 h-3.5 w-3.5 rounded-full border-2 transition-colors ${
                            on ? "border-white bg-white" : "border-white/40 bg-[#060a12]"
                          }`}
                          style={on ? { boxShadow: `0 0 0 4px ${meta.accent}44` } : undefined}
                        />
                      </motion.span>
                      <span
                        className={`pointer-events-none absolute left-1/2 top-[calc(100%+0.85rem)] -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                          on ? "text-white" : "text-white/40 group-hover:text-white/70"
                        }`}
                      >
                        {meta.region}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Mobile / always: region pills */}
            <div
              role="tablist"
              aria-label="Regions"
              className="mb-8 flex flex-wrap gap-2 md:justify-center"
            >
              {REGION_META.map((meta) => {
                const on = meta.region === active
                const count = countForRegion(meta.region)
                return (
                  <button
                    key={meta.region}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(meta.region)}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#5ec8d8]/50 ${
                      on
                        ? "bg-white text-black"
                        : "border border-white/15 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {meta.region}
                    <span className={`ml-1.5 tabular-nums text-[11px] ${on ? "text-black/50" : "text-white/35"}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Active panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start"
              >
                <div>
                  <p
                    className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: activeMeta.accent }}
                  >
                    {active}
                  </p>
                  <p className="mb-4 text-2xl md:text-3xl font-semibold tracking-tight text-white leading-snug">
                    {activeMeta.blurb}
                  </p>
                  <p className="mb-6 font-mono text-[12px] text-white/35">
                    {projectCount} project{projectCount === 1 ? "" : "s"} in this portfolio
                    <span className="mx-2 text-white/20">·</span>
                    {activeBlock?.clients.length ?? 0} named client
                    {(activeBlock?.clients.length ?? 0) === 1 ? "" : "s"}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      router.replace(`/portfolio?region=${encodeURIComponent(active)}`, {
                        scroll: false,
                      })
                      document
                        .getElementById("portfolio-projects")
                        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
                    }}
                    className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-white"
                    style={{ color: activeMeta.accent }}
                  >
                    Filter portfolio to {active}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <ul className="grid gap-2 sm:grid-cols-1">
                  {(activeBlock?.clients ?? []).map((client, i) => {
                    const href = CLIENT_LINKS[client]
                    const inner = (
                      <>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-[11px] text-white/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 text-sm md:text-base font-medium text-white/85 group-hover:text-white">
                          {client}
                        </span>
                        {href && (
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70" />
                        )}
                      </>
                    )

                    const className =
                      "group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"

                    return (
                      <motion.li
                        key={client}
                        initial={reduced ? false : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, ease: EASE, delay: i * 0.05 }}
                      >
                        {href ? (
                          <Link href={href} className={className}>
                            {inner}
                          </Link>
                        ) : (
                          <div className={className}>{inner}</div>
                        )}
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-5 text-[12px]">
          <Link
            href="/customers"
            className="font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#5ec8d8]"
          >
            Customer stories
          </Link>
          <Link
            href="/trust"
            className="font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#5ec8d8]"
          >
            Trust
          </Link>
        </div>
      </div>
    </section>
  )
}
