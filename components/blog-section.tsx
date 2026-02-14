"use client"

import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const posts = [
  {
    title: "The Art of Minimal Design",
    date: "Jan 15, 2026",
    tag: "Design",
  },
  {
    title: "Building Scalable Design Systems",
    date: "Dec 28, 2025",
    tag: "Development",
  },
  {
    title: "Color Theory in Digital Products",
    date: "Nov 10, 2025",
    tag: "Theory",
  },
]

export function BlogSection() {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <section id="blog" className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`${isVisible ? "reveal-up" : "opacity-0"}`}
        >
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
            Latest Articles
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-lg">
            Thoughts on design, development, and the creative process.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post, index) => (
            <BlogRow key={post.title} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogRow({
  post,
  index,
}: {
  post: (typeof posts)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`group flex items-center justify-between bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer ${
        isVisible ? "reveal-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-6">
        <span className="text-xs text-muted-foreground font-medium bg-secondary rounded-full px-3 py-1">
          {post.tag}
        </span>
        <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground hidden sm:block">
          {post.date}
        </span>
        <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  )
}
