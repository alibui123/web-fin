import { notFound } from "next/navigation"
import { getProjectBySlug, projects } from "@/lib/portfolio-data"
import CaseStudyPage from "@/components/case-study-page"

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Case Study | Finova`,
    description: project.description,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()
  return <CaseStudyPage project={project} />
}
