import BlogSection from "@/components/blog-section"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights and updates from our team on technology, innovation, and digital transformation.
          </p>
        </div>
        <BlogSection />
      </div>
    </main>
  )
} 