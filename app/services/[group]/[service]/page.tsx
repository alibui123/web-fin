import { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getSubserviceBySlug,
  getSubservicesByParent,
  serviceGroups,
  subservices,
} from "@/lib/services-data"
import ServiceLandingModern from "@/components/service-pages/service-landing-modern"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string; service: string }>
}): Promise<Metadata> {
  const { group, service } = await params
  const subservice = getSubserviceBySlug(service)

  if (!subservice || subservice.parentId !== group) {
    return { title: "Service Not Found" }
  }

  return {
    title: `${subservice.title} | Finova Solutions`,
    description: subservice.description,
  }
}

export function generateStaticParams() {
  return subservices.map((subservice) => ({
    group: subservice.parentId,
    service: subservice.slug,
  }))
}

export default async function ServiceSubservicePage({
  params,
}: {
  params: Promise<{ group: string; service: string }>
}) {
  const { group, service } = await params
  const subservice = getSubserviceBySlug(service)

  if (!subservice || subservice.parentId !== group) {
    notFound()
  }

  const parent = serviceGroups.find((item) => item.id === subservice.parentId)
  const related = getSubservicesByParent(subservice.parentId).filter(
    (item) => item.slug !== subservice.slug
  )

  return (
    <ServiceLandingModern 
      subservice={subservice} 
      parent={parent} 
      related={related} 
    />
  )
}
