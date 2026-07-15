"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight } from "lucide-react";

function BlogCard({ post, index, isFeatured }: { post: typeof blogPosts[0], index: number, isFeatured: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group h-full ${isFeatured ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'}`}
    >
      {/* Outer Glow - removed blur-xl for performance */}
      <div className="absolute -inset-1 bg-gradient-to-r from-finova-cyan to-finova-magenta opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-[2rem] -z-10" />

      {/* Card Container - solid bg, no backdrop-blur */}
      <div className="bg-white/[0.03] border border-white/10 group-hover:border-white/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-500 relative z-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        <Link
          href={`/blog/${post.slug}`}
          className={`relative w-full overflow-hidden block ${isFeatured ? 'flex-1 min-h-[300px]' : 'h-48 shrink-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-finova-cyan/20 z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          <Image
            src={post.image}
            alt={`Blog post image for ${post.title}`}
            className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
            fill
            sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            loading="lazy"
          />
          {/* Category Badge - removed backdrop-blur-md */}
          <div className="absolute top-6 left-6 z-30">
            <span className="text-xs font-mono text-white bg-black/50 border border-white/20 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
              {post.category}
            </span>
          </div>
        </Link>

        <div className={`flex flex-col relative z-10 ${isFeatured ? 'p-8 sm:p-10 shrink-0' : 'flex-1 p-8'}`}>
          <header className="mb-4">
            <div className="flex items-center gap-4 text-xs font-mono text-white/50 mb-4 tracking-widest uppercase">
              <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
              <span aria-hidden="true" className="text-finova-cyan/50">•</span>
              <span className="text-finova-cyan">{post.readTime}</span>
            </div>
            <h3 className={`font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-finova-cyan group-hover:to-finova-lightBlue transition-all duration-300 uppercase leading-tight ${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
              <Link href={`/blog/${post.slug}`} className="hover:text-transparent before:absolute before:inset-0">
                {post.title}
              </Link>
            </h3>
          </header>
          <p className={`text-white/60 leading-relaxed ${isFeatured ? 'text-base sm:text-lg mt-4' : 'text-sm mt-2 flex-1'}`}>
            {post.excerpt}
          </p>

          <div className={`mt-8 flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white/40 group-hover:text-finova-cyan transition-colors ${!isFeatured ? 'mt-auto' : ''}`}>
            Read Mission <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>

        {/* Top highlight */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-finova-cyan to-finova-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.article>
  );
}

export default function BlogSection() {
  const displayedPosts = blogPosts.slice(0, 3);

  return (
    <section
      aria-label="Blog Posts"
      className="py-16 relative bg-finova-midnight overflow-hidden border-y border-white/[0.05]"
    >
      {/* Dynamic Backgrounds - optimized */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-finova-cyan/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-finova-magenta/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-12 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 mb-8 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <span className="text-xs uppercase tracking-widest text-finova-cyan font-mono font-bold">Blogs</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Latest Insights
          </h2>
          <p className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
            Explore advanced engineering concepts, AI developments, and industry transformations.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto auto-rows-fr">
          {displayedPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={index}
              isFeatured={index === 0}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <Link href="/blog">
            <div className="relative px-8 py-4 bg-white/[0.02] border border-white/10 rounded-full text-white font-mono text-sm overflow-hidden group transition-all duration-300 hover:border-finova-cyan shadow-[0_0_0_rgba(14,165,233,0)] hover:shadow-[0_0_25px_rgba(14,165,233,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-finova-cyan/10 to-finova-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 font-bold tracking-widest uppercase flex items-center gap-3 text-white/80 group-hover:text-white transition-colors">
                VIEW ALL BLOGS
                <ArrowRight className="w-4 h-4 text-finova-cyan group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
