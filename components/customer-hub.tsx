import Link from "next/link"
import {
  getPracticeLabel,
  getProjectsByClientSlug,
  type Project,
} from "@/lib/portfolio-data"

export type CustomerHubProps = {
  name: string
  sector: string
  region: string
  arc: string
  body: string[]
  quote: string
  attribution: string
  clientSlug: string
  secondaryCta?: { href: string; label: string }
}

export default function CustomerHub({
  name,
  sector,
  region,
  arc,
  body,
  quote,
  attribution,
  clientSlug,
  secondaryCta,
}: CustomerHubProps) {
  const related: Project[] = getProjectsByClientSlug(clientSlug)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(94,200,216,0.1),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#5ec8d8]">
          {sector}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] mb-3">
          {name}
        </h1>
        <p className="mb-10 text-sm text-white/40">{region}</p>

        <p className="mb-6 text-xl md:text-2xl font-light leading-relaxed text-white/80">
          {arc}
        </p>

        {body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="mb-5 text-base md:text-lg font-light leading-relaxed text-white/55"
          >
            {paragraph}
          </p>
        ))}

        <blockquote className="relative my-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c16] p-7 md:p-9">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-[#5ec8d8]" />
          <p className="text-lg md:text-xl font-light leading-relaxed text-white/85 italic">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="mt-5 text-sm text-white/40 not-italic">— {attribution}</footer>
        </blockquote>

        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-white/40">
              Projects in this engagement
            </h2>
            <ul className="grid gap-3">
              {related.map((project, i) => (
                <li key={project.slug}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className={`group flex flex-col gap-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c16] px-5 py-4 transition-colors hover:border-white/20 sm:flex-row sm:items-center sm:justify-between ${
                      i === 0 ? "sm:min-h-[88px]" : ""
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-white transition-colors group-hover:text-[#5ec8d8]">
                        {project.title}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/35">
                        {getPracticeLabel(project.practice)}
                        <span className="mx-1.5 text-white/20">·</span>
                        {String(project.number).padStart(2, "0")}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35 transition-colors group-hover:text-[#5ec8d8]">
                      Case study →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#5ec8d8]"
          >
            Book a free audit
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#5ec8d8]/50"
          >
            Full portfolio
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#5ec8d8]/50"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-5 text-[12px]">
          <Link
            href="/how-it-works"
            className="font-medium uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-[#5ec8d8]"
          >
            How we work
          </Link>
          <Link
            href="/partners"
            className="font-medium uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-[#5ec8d8]"
          >
            Partners
          </Link>
          <Link
            href="/trust"
            className="font-medium uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-[#5ec8d8]"
          >
            Trust
          </Link>
        </div>
      </div>
    </main>
  )
}
