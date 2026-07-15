import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import StaticBlobBackground from "@/components/static-blob-background"
import type { Product } from "@/components/product-pages/product-data"

export default function ProductLanding({ product }: { product: Product }) {
  return (
    <main className="min-h-screen overflow-hidden">
      <StaticBlobBackground />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col max-w-5xl mx-auto">
            <Link
              href="/products"
              className="flex items-center text-sm text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all products
            </Link>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${product.gradient} text-white`}>
                  {product.hero.eyebrow}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {product.title}
                </h1>
                <p className="text-lg md:text-xl text-foreground/70">
                  {product.hero.subheadline}
                </p>
                <div className={`h-1 w-32 rounded-full bg-gradient-to-r ${product.gradient}`} />
              </div>

              <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed">
                {product.hero.description}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className={cn(
                  "bg-gradient-to-r text-white shadow-lg transition-all duration-300",
                  product.gradient,
                  "hover:shadow-xl hover:opacity-90"
                )}
              >
                <Link href={product.hero.primaryCta.href}>
                  {product.hero.primaryCta.label}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={product.hero.secondaryCta.href}>
                  {product.hero.secondaryCta.label}
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.hero.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-xl border p-4",
                    product.borderAccent,
                    product.bgAccent
                  )}
                >
                  <p className="text-xs uppercase tracking-wide text-foreground/60 mb-2">
                    {highlight.label}
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    {highlight.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 relative rounded-2xl overflow-hidden">
              <div
                className={cn(
                  "absolute inset-0 opacity-10 blur-xl",
                  product.gradient
                )}
              />

              <div className="relative aspect-video rounded-2xl border overflow-hidden flex items-center justify-center bg-foreground/5">
                <Image
                  src={product.illustration}
                  alt={product.title}
                  width={500}
                  height={300}
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-foreground/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Problem Statement</h2>
            <p className="text-foreground/70 mb-8">
              The operational pain points that hold teams back and create urgency.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.problemStatements.map((problem, index) => (
                <li key={index} className="rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4">
                  <p className="text-foreground/80">{problem}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Product Overview</h2>
            <p className="text-foreground/70 leading-relaxed">{product.overview}</p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-foreground/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Core Features</h2>
            <p className="text-foreground/70 mb-10">
              Structured by the feature categories that matter to buyers and operators.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.coreFeatures.map((category, index) => (
                <div key={index} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                  <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className={`mt-2 h-2 w-2 rounded-full bg-gradient-to-br ${product.gradient}`} />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className={cn("rounded-2xl border p-8", product.borderAccent, product.bgAccent)}>
              <h2 className="text-3xl font-bold mb-4">AI Features</h2>
              <p className="text-foreground/70 mb-6">{product.aiOverview}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.aiFeatures.map((feature, index) => (
                  <li key={index} className="rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4">
                    <p className="text-foreground/80">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-foreground/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Workflow</h2>
            <p className="text-foreground/70 mb-10">How the platform operates end to end.</p>
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-4">
              {product.workflow.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-foreground/80">{step}</p>
                  {index < product.workflow.length - 1 ? (
                    <span className="hidden md:inline text-foreground/40">-&gt;</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Dashboards and Modules</h2>
            <p className="text-foreground/70 mb-8">
              Enterprise depth with role based access and visibility.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.dashboards.map((dashboard, index) => (
                <li key={index} className="rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4">
                  <p className="text-foreground/80">{dashboard}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-foreground/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Benefits and Business Impact</h2>
            <p className="text-foreground/70 mb-8">
              Tangible outcomes that influence budget and buying decisions.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.businessImpact.map((benefit, index) => (
                <li key={index} className="rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4">
                  <p className="text-foreground/80">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Industries and Ideal Users</h2>
            <p className="text-foreground/70 mb-8">
              Teams that see the fastest impact from deployment.
            </p>
            <div className="flex flex-wrap gap-3">
              {product.industries.map((industry, index) => (
                <span
                  key={index}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-4 py-2 text-sm text-foreground/80"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-20 bg-foreground/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Integration and Scalability</h2>
            <p className="text-foreground/70 mb-8">
              Deployment options that match enterprise maturity and scale.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.integrations.map((integration, index) => (
                <li key={index} className="rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4">
                  <p className="text-foreground/80">{integration}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className={cn("max-w-5xl mx-auto rounded-2xl border p-10", product.borderAccent, product.bgAccent)}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-3">Ready to see {product.title} in action?</h2>
                <p className="text-foreground/70">
                  Book a demo or schedule a consultation to explore pricing and rollout options.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className={cn(
                    "bg-gradient-to-r text-white shadow-lg transition-all duration-300",
                    product.gradient,
                    "hover:shadow-xl hover:opacity-90"
                  )}
                >
                  <Link href={product.hero.primaryCta.href}>
                    {product.hero.primaryCta.label}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={product.hero.secondaryCta.href}>
                    {product.hero.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Product Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Explore our product ecosystem</h2>
              <p className="text-foreground/70">
                Discover how our products work together to deliver comprehensive solutions
              </p>
            </div>
            <Button asChild variant="outline" className="mt-6 md:mt-0">
              <Link href="/products" className="flex items-center">
                View all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
