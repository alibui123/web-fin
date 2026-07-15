import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Sorry, we couldn't find the blog post you're looking for.
      </p>
      <Button asChild>
        <Link href="/blog">
          Return to Blog
        </Link>
      </Button>
    </div>
  )
} 