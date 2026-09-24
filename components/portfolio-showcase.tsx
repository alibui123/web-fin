"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  ArrowUpRight,
  Bot,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Coins,
  Cookie,
  Gamepad2,
  Globe,
  GraduationCap,
  Landmark,
  Leaf,
  PhoneCall,
  Plane,
  Search,
  Shield,
  Smartphone,
  Wheat,
} from "lucide-react"
import {
  PORTFOLIO_STATS,
  PRACTICE_AREAS,
  getFeaturedProjects,
  getPracticeLabel,
  projects,
  type PracticeArea,
  type Project,
  type Region,
} from "@/lib/portfolio-data"
import { Reveal, TextReveal } from "@/components/portfolio/motion-primitives"
import PortfolioRegions from "@/components/portfolio/portfolio-regions"
import { cn } from "@/lib/utils"

const iconMap = {
  PhoneCall,
  Globe,
  Gamepad2,
  GraduationCap,
  Smartphone,
  Building2,
  Bot,
  Landmark,
  Coins,
  Calendar,
  Search,
  Plane,
  Wheat,
  Cookie,
  Shield,
  Leaf,
}

type PracticeFilter = PracticeArea | "all"
type RegionFilter = Region | "all"

const PRACTICE_IDS = new Set(PRACTICE_AREAS.map((a) => a.id))
const REGION_IDS = new Set<Region>(["Pakistan", "Gulf", "USA", "Africa", "Global"])
const EASE = [0.23, 1, 0.32, 1] as const
const CELL = { type: "spring" as const, stiffness: 520, damping: 34, mass: 0.45 }
const DESKTOP_PAGE_SIZE = 9

function parsePractice(value: string | null): PracticeFilter {
  if (value && PRACTICE_IDS.has(value as PracticeArea)) return value as PracticeArea
  return "all"
}

function parseRegion(value: string | null): RegionFilter {
  if (value && REGION_IDS.has(value as Region)) return value as Region
  return "all"
}

function colSpanForIndex(index: number, total: number) {
  if (index === 0) return "sm:col-span-5"
  if (index === 1) return "sm:col-span-7"
  if (index === total - 2) return "sm:col-span-7"
  if (index === total - 1) return "sm:col-span-5"
  return index % 2 === 0 ? "sm:col-span-5" : "sm:col-span-7"
}

function FeaturedTile({ project, index, total }: { project: Project; index: number; total: number }) {
  const Icon = iconMap[project.iconName]
  const reduced = useReducedMotion()

  return (
    <motion.article
      initial={reduced ? false : { y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.06 }}
      className={`relative col-span-12 ${colSpanForIndex(index, total)} min-h-[220px] md:min-h-[280px]`}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group relative flex h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b14]"
      >
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60"
          style={{
            background: `radial-gradient(ellipse at 20% 20%, ${project.accent}55, transparent 55%), linear-gradient(145deg, #0a1020 0%, #05070e 100%)`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:22px_22px]" />

        <div className="relative z-10 flex w-full flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm"
              style={{ color: project.accent }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-mono text-[11px] tabular-nums text-white/35">
              {String(project.number).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                {getPracticeLabel(project.practice)}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white leading-snug">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-white/50 truncate">{project.client}</p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.iconName]
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c16] p-5 transition-colors hover:border-white/20"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: project.accent }}
      />
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]"
          style={{ color: project.accent }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-white/30">
          {String(project.number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="relative z-10 mb-2 line-clamp-2 text-base font-semibold leading-snug text-white">
        {project.title}
      </h3>
      <p className="relative z-10 mb-3 text-sm text-white/45">{project.client}</p>
      <p className="relative z-10 line-clamp-3 flex-1 text-sm leading-relaxed text-white/55">
        {project.summary}
      </p>
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/35">
          {project.region}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50 transition-colors group-hover:text-[#5ec8d8]">
          Case study
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

/** Mobile: practice folders — five rows max until a folder opens */
function MobileProjectIndex({ items }: { items: Project[] }) {
  const reduced = useReducedMotion()
  const [openPractice, setOpenPractice] = useState<PracticeArea | null>(null)
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const groups = useMemo(() => {
    return PRACTICE_AREAS.map((area) => ({
      ...area,
      projects: items.filter((p) => p.practice === area.id),
    })).filter((g) => g.projects.length > 0)
  }, [items])

  useEffect(() => {
    setOpenSlug(null)
    const present = PRACTICE_AREAS.filter((area) =>
      items.some((p) => p.practice === area.id),
    )
    setOpenPractice(present.length === 1 ? present[0].id : null)
  }, [items])

  if (groups.length === 0) return null

  return (
    <div className="space-y-2 md:hidden">
      {groups.map((group) => {
        const open = openPractice === group.id
        return (
          <div
            key={group.id}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              open ? "border-white/20 bg-[#0a101c]" : "border-white/[0.08] bg-[#080c16]",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => {
                setOpenPractice((cur) => (cur === group.id ? null : group.id))
                setOpenSlug(null)
              }}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold tracking-tight text-white">
                  {group.label}
                </span>
                <span className="mt-0.5 block text-[11px] text-white/40">
                  {group.projects.length} project{group.projects.length === 1 ? "" : "s"}
                </span>
              </span>
              <motion.span
                aria-hidden
                animate={{ rotate: open ? 45 : 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.22, ease: EASE }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/45"
              >
                <span className="text-lg leading-none">+</span>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <ul className="border-t border-white/[0.06] px-2 pb-2 pt-1">
                    {group.projects.map((project) => {
                      const rowOpen = openSlug === project.slug
                      return (
                        <li key={project.slug}>
                          <button
                            type="button"
                            aria-expanded={rowOpen}
                            onClick={() =>
                              setOpenSlug((cur) => (cur === project.slug ? null : project.slug))
                            }
                            className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-colors active:bg-white/[0.04]"
                          >
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: project.accent }}
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1 text-[0.9rem] font-medium leading-snug text-white/90">
                              {project.title}
                            </span>
                            <motion.span
                              aria-hidden
                              animate={{ rotate: rowOpen ? 90 : 0 }}
                              className="text-white/35"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {rowOpen && (
                              <motion.div
                                initial={reduced ? false : { height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={reduced ? undefined : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-3 px-2.5 pb-3 pl-6">
                                  <p className="text-xs text-white/45">
                                    {project.client} · {project.region}
                                  </p>
                                  <p className="text-sm leading-relaxed text-white/60 line-clamp-3">
                                    {project.summary}
                                  </p>
                                  <Link
                                    href={`/portfolio/${project.slug}`}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black active:bg-[#5ec8d8]"
                                  >
                                    Case study
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      )
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/** Segmented filter chips with sliding thumb — adapted from 21st Filter Grid */
function FilterChips({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { id: string; label: string; count?: number }[]
  value: string
  onChange: (id: string) => void
}) {
  const uid = useId()
  const reduced = useReducedMotion()
  const chips = useRef<(HTMLButtonElement | null)[]>([])
  const index = Math.max(0, options.findIndex((o) => o.id === value))

  const go = useCallback(
    (i: number) => {
      const next = options[(i + options.length) % options.length]
      if (!next) return
      chips.current[(i + options.length) % options.length]?.focus()
      onChange(next.id)
    },
    [options, onChange],
  )

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex flex-wrap items-center gap-1.5"
    >
      {options.map((opt, i) => {
        const on = i === index
        return (
          <button
            key={opt.id}
            ref={(node) => {
              chips.current[i] = node
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(opt.id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault()
                go(i + 1)
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault()
                go(i - 1)
              }
            }}
            className="group relative inline-grid h-9 select-none place-items-center rounded-lg px-3.5 outline-none focus-visible:ring-2 focus-visible:ring-[#5ec8d8]/60"
          >
            {on && (
              <motion.span
                aria-hidden
                layoutId={reduced ? undefined : `${uid}-thumb`}
                transition={CELL}
                className="absolute inset-0 rounded-lg bg-white"
              />
            )}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-lg border ${
                on ? "border-transparent" : "border-white/15"
              }`}
            />
            <span className="relative z-10 inline-flex items-center gap-1.5 whitespace-nowrap text-[12.5px] font-medium">
              <span className={on ? "text-black" : "text-white/65"}>{opt.label}</span>
              {typeof opt.count === "number" && (
                <span className={`text-[10.5px] tabular-nums ${on ? "text-black/55" : "text-white/35"}`}>
                  {opt.count}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function PortfolioShowcase() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const reduced = useReducedMotion()

  const [practice, setPractice] = useState<PracticeFilter>(() =>
    parsePractice(searchParams.get("practice")),
  )
  const [region, setRegion] = useState<RegionFilter>(() => parseRegion(searchParams.get("region")))
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPractice(parsePractice(searchParams.get("practice")))
    setRegion(parseRegion(searchParams.get("region")))
  }, [searchParams])

  function updateFilters(nextPractice: PracticeFilter, nextRegion: RegionFilter) {
    setPractice(nextPractice)
    setRegion(nextRegion)
    setPage(1)
    const params = new URLSearchParams()
    if (nextPractice !== "all") params.set("practice", nextPractice)
    if (nextRegion !== "all") params.set("region", nextRegion)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const featured = useMemo(() => getFeaturedProjects().slice(0, 6), [])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (practice !== "all" && p.practice !== practice) return false
      if (region !== "all" && p.region !== region) return false
      return true
    })
  }, [practice, region])

  const totalPages = Math.max(1, Math.ceil(filtered.length / DESKTOP_PAGE_SIZE))

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  const paged = useMemo(() => {
    const start = (page - 1) * DESKTOP_PAGE_SIZE
    return filtered.slice(start, start + DESKTOP_PAGE_SIZE)
  }, [filtered, page])

  const practiceOptions = useMemo(
    () => [
      { id: "all", label: "All" },
      ...PRACTICE_AREAS.map((a) => ({ id: a.id, label: a.short })),
    ],
    [],
  )

  const regionOptions = useMemo(
    () => [
      { id: "all", label: "All regions" },
      ...(["Pakistan", "Gulf", "USA", "Africa", "Global"] as Region[]).map((r) => ({
        id: r,
        label: r,
      })),
    ],
    [],
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712]">
      {/* Atmosphere — restrained, cyan signal only */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(94,200,216,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      {/* Hero — Experience mode: thesis first, no card stack */}
      <section className="relative z-10 px-4 pt-32 pb-16 sm:px-6 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <TextReveal
              text="Work that answers the call, closes the task and keeps the record."
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.035em] text-white leading-[1.05]"
            />
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
              className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/55"
            >
              {PORTFOLIO_STATS.framing}
            </motion.p>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-4"
          >
            {[
              { value: PORTFOLIO_STATS.projects, label: "Projects" },
              { value: PORTFOLIO_STATS.partners, label: "Partners" },
              { value: PORTFOLIO_STATS.regions, label: "Regions" },
              { value: PORTFOLIO_STATS.practices, label: "Practices" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#050a14] px-5 py-6 md:px-6 md:py-7">
                <p className="text-3xl md:text-4xl font-semibold tabular-nums tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured — Condition Grid asymmetry from 21st */}
      <section className="relative z-10 px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Featured deployments
            </h2>
            <Link
              href="/how-it-works"
              className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#5ec8d8]"
            >
              How we work →
            </Link>
          </Reveal>

          <div className="grid grid-cols-12 gap-4">
            {featured.map((project, index) => (
              <FeaturedTile
                key={project.slug}
                project={project}
                index={index}
                total={featured.length}
              />
            ))}
          </div>
        </div>
      </section>

      <PortfolioRegions />

      {/* Filter + grid */}
      <section
        id="portfolio-projects"
        className="relative z-10 border-t border-white/[0.06] px-4 py-16 sm:px-6 md:py-24 scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
              All twenty-one projects
            </h2>
            <p className="text-sm text-white/45 max-w-xl">
              Filter by practice or region. Layout reflows as you choose — same motion language as a
              production filter grid.
            </p>
          </Reveal>

          <LayoutGroup>
            <div className="mb-4 space-y-3">
              <FilterChips
                label="Practice area"
                options={practiceOptions}
                value={practice}
                onChange={(id) => updateFilters(id as PracticeFilter, region)}
              />
              <FilterChips
                label="Region"
                options={regionOptions}
                value={region}
                onChange={(id) => updateFilters(practice, id as RegionFilter)}
              />
            </div>
          </LayoutGroup>

          {practice !== "all" && (
            <p className="mb-6 max-w-2xl text-sm text-white/45">
              {PRACTICE_AREAS.find((a) => a.id === practice)?.description}
            </p>
          )}

          <p className="mb-6 font-mono text-[11px] text-white/30" aria-live="polite">
            {filtered.length} of {projects.length} shown
            <span className="hidden md:inline">
              {" "}
              · page {page} of {totalPages}
            </span>
          </p>

          <MobileProjectIndex items={filtered} />

          <div className="hidden md:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={`${practice}-${region}-${page}`}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="grid grid-cols-3 gap-4"
              >
                {paged.map((project) => (
                  <li key={project.slug} className="min-w-0">
                    <ProjectCard project={project} />
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          {filtered.length > 0 && totalPages > 1 && (
            <nav
              aria-label="Project pages"
              className="mt-10 hidden items-center justify-center gap-2 md:flex"
            >
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-current={n === page ? "page" : undefined}
                  onClick={() => setPage(n)}
                  className={cn(
                    "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium tabular-nums transition-colors",
                    n === page
                      ? "bg-white text-black"
                      : "border border-white/15 text-white/65 hover:border-white/30 hover:text-white",
                  )}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}

          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-white/40">
              Nothing matches these filters. Try another practice or region.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-white/[0.06] px-4 py-20 sm:px-6 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
            Find out where your time and revenue are leaking.
          </h2>
          <p className="mb-10 text-white/50 font-light leading-relaxed">
            Free audit. You get the findings whether or not we work together.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#5ec8d8] hover:text-black"
            >
              Book a free audit
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#5ec8d8]/50"
            >
              How we work
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
