import { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductLandingModern from "@/components/product-pages/product-landing-modern"
import QualicallLanding from "@/components/product-pages/qualicall-landing"
import ErpLanding from "@/components/product-pages/erp-landing"
import MehmanLanding from "@/components/product-pages/mehman-landing"
import { getProductById, products } from "@/components/product-pages/product-data"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }
  
  return {
    title: `${product.title} | Finova Solutions`,
    description: product.seoDescription,
  }
}

export function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }))
}

// Map each product to its unique landing component
const LANDING_MAP: Record<string, React.ComponentType<{ product: any }>> = {
  "awaaz": ProductLandingModern,
  "qualicall": QualicallLanding,
  "ai-powered-erp": ErpLanding,
  "mehman-nawaz": MehmanLanding,
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(id)
  
  if (!product) {
    notFound()
  }

  // Use the product-specific landing, fallback to the modern shared layout
  const LandingComponent = LANDING_MAP[product.id] || ProductLandingModern

  return <LandingComponent product={product} />
}