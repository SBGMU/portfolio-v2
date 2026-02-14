"use client"

import { Award } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const certifications = [
  {
    title: "DataCamp Python Professional Certificate",
    year: "2025",
    description:
      "Strong in OOP and advanced data analysis with Python (pandas, NumPy), ensuring clean, reliable insights and robust predictive foundations.",
  },
  {
    title: "DataCamp Advanced SQL & Relational Data Analysis Certification",
    year: "2025",
    description:
      "Advanced SQL expertise: complex queries, joins, set theory, subqueries, and structured aggregation for high-performance data extraction and analysis.",
  },
  {
    title: "Mimo SQL Fundamentals & Relational Database Management Certification",
    year: "2024",
    description:
      "Solid foundation in SQL: table creation, data retrieval, and core relational database management practices.",
  },
]

export function CertificationsSection() {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <section id="certifications" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`${isVisible ? "reveal-up" : "opacity-0"}`}
        >
          <h2 className="font-heading text-5xl font-bold text-muted-foreground mb-12">
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(5,107,255,0.15),0_4px_12px_rgba(0,0,0,0.3)] ${isVisible ? "reveal-scale" : "opacity-0"
        }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#033580] group-hover:to-[#056BFF] group-hover:text-primary-foreground transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          <Award className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="font-heading text-base font-semibold text-foreground">
              {cert.title}
            </h3>
            <span className="text-xs text-primary-foreground font-medium bg-gradient-to-r from-[#033580] to-[#056BFF] rounded-full px-3 py-1 shrink-0 shadow-[0_2px_6px_rgba(5,107,255,0.3)]">
              {cert.year}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {cert.description}
          </p>
        </div>
      </div>
    </div>
  )
}
