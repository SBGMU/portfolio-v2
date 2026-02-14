"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const categories = [
  "User Interface",
  "Technical Arts",
  "Vector Illustration",
]

const projects = [
  {
    title: "Analogue",
    category: "Brand",
    filter: "User Interface",
    image: "/images/project-analogue.jpg",
  },
  {
    title: "Known One",
    category: "Technical",
    filter: "Technical Arts",
    image: "/images/project-known-one.jpg",
  },
  {
    title: "X Models",
    category: "Creative",
    filter: "Vector Illustration",
    image: "/images/project-x-models.jpg",
  },
  {
    title: "Sevenson",
    category: "Brand",
    filter: "User Interface",
    image: "/images/project-sevenson.jpg",
  },
  {
    title: "Ninety Editions",
    category: "Digital",
    filter: "Technical Arts",
    image: "/images/project-ninety.jpg",
  },
  {
    title: "Crystal Form",
    category: "Technical",
    filter: "Vector Illustration",
    image: "/images/project-analogue.jpg",
  },
]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("Technical Arts")
  const { ref: filterRef, isVisible: filterVisible } = useScrollReveal(0.1)
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.05)

  const filteredProjects = projects.filter((p) => p.filter === activeFilter)

  return (
    <section id="projects" className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Category Filter */}
        <div
          ref={filterRef}
          className={`flex items-center gap-6 mb-10 ${
            filterVisible ? "reveal-up" : "opacity-0"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative text-lg font-medium transition-colors duration-300 ${
                activeFilter === cat
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeFilter === cat && (
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
              )}
              {cat}
            </button>
          ))}
          <button
            className="ml-auto flex items-center justify-center h-10 w-10 rounded-full border border-border text-foreground hover:bg-secondary transition-colors"
            aria-label="View all projects"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Project Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
            gridVisible ? "reveal-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[0]
  delay: number
}) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 ${
        isVisible ? "reveal-scale" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground">{project.category}</p>
          </div>
          <button
            className="flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors"
            aria-label={`View ${project.title}`}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  )
}
