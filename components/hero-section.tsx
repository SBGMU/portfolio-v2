"use client"

import Image from "next/image"
import { Phone, ArrowUpRight, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useMediaQuery } from "@/hooks/use-mobile"

const expertTools: {
  name: string
  shortName: string
  image?: string
  icon?: React.ReactNode
}[] = [
    {
      name: "Python: Pandas, Numpy, ETL",
      shortName: "Python",
      image: "/images/skills/python.png",
    },
    {
      name: "MySQL",
      shortName: "MySQL",
      image: "/images/skills/mysql.png",
    },
    {
      name: "PostgreSQL",
      shortName: "PostgreSQL",
      image: "/images/skills/postgresql.png",
    },
    {
      name: "Data Modeling",
      shortName: "Data Modeling",
      icon: (
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#E535AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="2" fill="#E535AB" />
          <circle cx="5" cy="12" r="2" fill="#E535AB" />
          <circle cx="19" cy="12" r="2" fill="#E535AB" />
          <circle cx="12" cy="20" r="2" fill="#E535AB" />
          <line x1="12" y1="6" x2="5" y2="10" />
          <line x1="12" y1="6" x2="19" y2="10" />
          <line x1="5" y1="14" x2="12" y2="18" />
          <line x1="19" y1="14" x2="12" y2="18" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
    {
      name: "Visual Basic",
      shortName: "Visual Basic",
      image: "/images/skills/vba.png",
    },
    {
      name: "HTML",
      shortName: "HTML",
      image: "/images/skills/html5.webp",
    },
    {
      name: "CSS",
      shortName: "CSS",
      image: "/images/skills/css3.webp",
    },
    {
      name: "PHP",
      shortName: "PHP",
      image: "/images/skills/php.png",
    },
    {
      name: "Power BI",
      shortName: "Power BI",
      image: "/images/skills/powerbi.png",
    },
    {
      name: "Git",
      shortName: "Git",
      icon: (
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.344l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.483-2.483v6.534a1.838 1.838 0 11-1.512-.09V8.762a1.838 1.838 0 01-.998-2.41L7.629 3.622.452 10.798a1.55 1.55 0 000 2.19l10.48 10.478a1.55 1.55 0 002.186 0l10.428-10.349a1.55 1.55 0 000-2.187" fill="#F05032" />
        </svg>
      ),
    },
    {
      name: "Metrica Sports",
      shortName: "Metrica",
      image: "/images/skills/metrica.avif",
    },
    {
      name: "Opta Pro Hub",
      shortName: "Opta Pro",
      image: "/images/skills/opta.webp",
    },
  ]

export function HeroSection() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1)
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal(0.1)
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 1023px)")

  useEffect(() => {
    if (expandedSkill !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [expandedSkill])

  return (
    <section id="presentation" className="pt-28 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div
          ref={heroRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch ${heroVisible ? "reveal-up" : "opacity-0"}`}
        >
          {/* Profile Card */}
          <div className="bg-card rounded-2xl p-6 border border-border flex flex-col items-center shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]">
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-full mb-6 border-4 border-border shadow-[0_4px_20px_rgba(5,107,255,0.15)]">
              <Image
                src="/images/portrait.png"
                alt="Stephen KOUANGA - Data Professional"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2 text-center">
              Stephen Kouanga
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 text-center">
              Data enthusiast focused on automation and intelligent solutions, transforming complex data into impactful insights.
            </p>
            {/* Buttons: stacked on mobile, side-by-side on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mt-auto">
              <a
                href="tel:+33658378844"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card sm:px-12 py-6 text-xs sm:text-sm font-medium text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-secondary transition-colors whitespace-nowrap w-full sm:w-auto"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Contact Me
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#033580] to-[#056BFF] sm:px-12 py-6 text-xs sm:text-sm font-medium text-primary-foreground shadow-[0_4px_14px_rgba(5,107,255,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] hover:opacity-90 transition-opacity whitespace-nowrap w-full sm:w-auto"
              >
                Get in Touch
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Column - Expert Area (same height as profile) */}
          <div
            ref={skillsRef}
            className={`bg-card rounded-2xl p-6 border border-border shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] flex flex-col ${skillsVisible ? "reveal-scale" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="font-heading text-4xl font-bold text-muted-foreground mb-6 lg:text-left">
              My Expert area
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 flex-1">
              {expertTools.map((tool) => (
                <SkillCard
                  key={tool.name}
                  tool={tool}
                  isMobile={isMobile}
                  onExpand={() => setExpandedSkill(tool.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skill modal for mobile/tablet */}
      {expandedSkill !== null && isMobile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setExpandedSkill(null)}
        >
          <div
            className="bg-card rounded-2xl border border-border p-8 max-w-sm w-full relative shadow-[0_16px_50px_rgba(0,0,0,0.5),0_4px_16px_rgba(5,107,255,0.15)]"
            style={{ animation: "reveal-scale 0.25s cubic-bezier(0.22,1,0.36,1) forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedSkill(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {(() => {
              const tool = expertTools.find((t) => t.name === expandedSkill)
              if (!tool) return null
              return (
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-xl bg-secondary flex items-center justify-center mb-6 p-2">
                    {tool.image ? (
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="h-16 w-16 object-contain"
                      />
                    ) : (
                      <div className="h-12 w-12">{tool.icon}</div>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {tool.shortName}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tool.name}
                  </p>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </section>
  )
}

function SkillCard({
  tool,
  isMobile,
  onExpand,
}: {
  tool: (typeof expertTools)[0]
  isMobile: boolean
  onExpand: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-xl bg-secondary p-3 transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={() => {
        if (isMobile) onExpand()
      }}
      onMouseEnter={() => {
        if (!isMobile) setIsHovered(true)
      }}
      onMouseLeave={() => {
        if (!isMobile) setIsHovered(false)
      }}
      role="button"
      tabIndex={0}
      aria-label={tool.name}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          if (isMobile) onExpand()
          else setIsHovered(!isHovered)
        }
      }}
    >
      {/* Icon / Image */}
      <div className="h-10 w-10 flex items-center justify-center mb-1.5 transition-all duration-300">
        {tool.image ? (
          <img
            src={tool.image}
            alt={tool.name}
            className="h-10 w-10 object-contain"
          />
        ) : (
          <div className="h-8 w-8">{tool.icon}</div>
        )}
      </div>
      <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight transition-all duration-300">
        {tool.shortName}
      </span>

      {/* Desktop hover overlay - glassmorphism with blurred text */}
      {!isMobile && (
        <div
          className={`absolute inset-0 rounded-xl flex items-center justify-center p-2 transition-all duration-300 ${
            isHovered
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{
            background: "var(--skill-overlay-bg)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <span
            className="text-[11px] sm:text-xs font-semibold text-center leading-tight px-1"
            style={{
              color: "var(--skill-overlay-text)",
              textShadow: "var(--skill-overlay-shadow)",
            }}
          >
            {tool.name}
          </span>
        </div>
      )}
    </div>
  )
}
