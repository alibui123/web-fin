import { notFound } from "next/navigation"
import Image from "next/image"
import { BlogPost, blogPosts } from '@/lib/blog-data'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover brightness-[0.9]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background" />
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-[720px] mx-auto -mt-32 relative">
          {/* Article Header */}
          <header className="mb-16 text-center">
            <div className="mb-6 space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-300 font-medium">
                <span>{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <time dateTime={post.date}>{post.date}</time>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Lead Paragraph */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-serif">
              {post.excerpt}
            </p>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg leading-relaxed">
                {post.content.introduction}
              </p>
            </section>

            {/* Key Insights */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-medium mb-6">Key Insights</h2>
              <p className="text-lg leading-relaxed mb-6">
                {post.content.keyInsights.content}
              </p>
              <ul className="list-disc pl-6 space-y-4 mb-8">
                {post.content.keyInsights.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>

            {/* Technical Details */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-medium mb-6">Technical Details</h2>
              <p className="text-lg leading-relaxed mb-6">
                {post.content.technicalDetails.content}
              </p>
              {post.content.technicalDetails.codeExample && (
                <pre className="bg-muted p-6 rounded-md font-mono text-sm mb-6 overflow-x-auto">
                  <code>{post.content.technicalDetails.codeExample}</code>
                </pre>
              )}
            </section>

            {/* Implementation Guide */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-medium mb-6">Implementation Guide</h2>
              <p className="text-lg leading-relaxed mb-6">
                {post.content.implementation.content}
              </p>
              <ol className="list-decimal pl-6 space-y-4 mb-8">
                {post.content.implementation.steps.map((step, index) => (
                  <li key={index}>
                    <strong>{step.title}:</strong> {step.description}
                  </li>
                ))}
              </ol>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-medium mb-6">Conclusion</h2>
              <p className="text-lg leading-relaxed">
                {post.content.conclusion}
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
} 