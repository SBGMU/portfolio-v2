"use client"

import Image from "next/image"
import { Phone, ArrowUpRight, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useMediaQuery } from "@/hooks/use-mobile"
/* i18n hook for French / English translations */
import { useLanguage } from "@/context/language-context"

/* Each tool uses i18n keys — "nameKey" for the detail text (may contain \n)
   and "shortNameKey" for the label shown below the icon. */
interface ExpertTool {
  nameKey: string      // translation key for detail text (hover overlay / popup)
  shortNameKey: string // translation key for short label
  id: string           // unique stable id for React keys
  image?: string
  icon?: React.ReactNode
}

const expertTools: ExpertTool[] = [
  { id: "python", nameKey: "tool.python.name", shortNameKey: "tool.python.short", image: "/images/skills/python.png" },
  { id: "sql", nameKey: "tool.sql.name", shortNameKey: "tool.sql.short", image: "/images/skills/sql.png" },
  { id: "postgresql", nameKey: "tool.postgresql.name", shortNameKey: "tool.postgresql.short", image: "/images/skills/postgresql.png" },
  { id: "analytics", nameKey: "tool.analytics.name", shortNameKey: "tool.analytics.short", image: "/images/skills/database.png" },
  { id: "bi", nameKey: "tool.bi.name", shortNameKey: "tool.bi.short", image: "/images/skills/BI.png" },
  { id: "r", nameKey: "tool.r.name", shortNameKey: "tool.r.short", image: "/images/skills/R_icon.svg" },
  { id: "vba", nameKey: "tool.vba.name", shortNameKey: "tool.vba.short", image: "/images/skills/vba.png" },
  { id: "htmlcssjs", nameKey: "tool.htmlcssjs.name", shortNameKey: "tool.htmlcssjs.short", image: "/images/skills/html5-css3-js.png" },
  { id: "php", nameKey: "tool.php.name", shortNameKey: "tool.php.short", image: "/images/skills/php.png" },
  {
    id: "git", nameKey: "tool.git.name", shortNameKey: "tool.git.short",
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.344l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.483-2.483v6.534a1.838 1.838 0 11-1.512-.09V8.762a1.838 1.838 0 01-.998-2.41L7.629 3.622.452 10.798a1.55 1.55 0 000 2.19l10.48 10.478a1.55 1.55 0 002.186 0l10.428-10.349a1.55 1.55 0 000-2.187" fill="#F05032" />
      </svg>
    ),
  },
  { id: "communication", nameKey: "tool.communication.name", shortNameKey: "tool.communication.short", image: "/images/skills/filtering.png" },
  { id: "perf", nameKey: "tool.perf.name", shortNameKey: "tool.perf.short", image: "/images/skills/data-analysis.png" },
]

/** Renders a translated string that may contain \n as line breaks */
function TranslatedLines({ text }: { text: string }) {
  const parts = text.split("\n")
  return (
    <>
      {parts.map((line, i) => (
        <span key={i}>
          {line}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  )
}

export function HeroSection() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1)
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal(0.1)
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 1023px)")
  /* i18n */
  const { t } = useLanguage()

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
              {t("hero.name")}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 text-center">
              {t("hero.bio")}
            </p>
            {/* Buttons: stacked on mobile, side-by-side on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mt-auto">
              <a
                href="tel:+33658378844"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card sm:px-12 py-6 text-xs sm:text-sm font-medium text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-secondary transition-colors whitespace-nowrap w-full sm:w-auto"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {t("hero.contactMe")}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#033580] to-[#056BFF] sm:px-12 py-6 text-xs sm:text-sm font-medium text-primary-foreground shadow-[0_4px_14px_rgba(5,107,255,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] hover:opacity-90 transition-opacity whitespace-nowrap w-full sm:w-auto"
              >
                {t("hero.getInTouch")}
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
              {t("hero.expertArea")}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 flex-1">
              {expertTools.map((tool) => (
                <SkillCard
                  key={tool.id}
                  tool={tool}
                  isMobile={isMobile}
                  t={t}
                  onExpand={() => setExpandedSkill(tool.id)}
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
              const tool = expertTools.find((item) => item.id === expandedSkill)
              if (!tool) return null
              return (
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-xl bg-secondary flex items-center justify-center mb-6 p-2">
                    {tool.image ? (
                      <img
                        src={tool.image}
                        alt={t(tool.shortNameKey)}
                        className="h-16 w-16 object-contain"
                      />
                    ) : (
                      <div className="h-12 w-12">{tool.icon}</div>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {t(tool.shortNameKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <TranslatedLines text={t(tool.nameKey)} />
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
  t,
  onExpand,
}: {
  tool: ExpertTool
  isMobile: boolean
  t: (key: string) => string
  onExpand: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  /* Resolve translated strings */
  const shortName = t(tool.shortNameKey)

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
      aria-label={shortName}
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
            alt={shortName}
            className="h-10 w-10 object-contain"
          />
        ) : (
          <div className="h-8 w-8">{tool.icon}</div>
        )}
      </div>
      <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight transition-all duration-300">
        {shortName}
      </span>

      {/* Desktop hover overlay — glassmorphism with translated detail text */}
      {!isMobile && (
        <div
          className={`absolute inset-0 rounded-xl flex items-center justify-center p-2 transition-all duration-300 ${isHovered
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
            <TranslatedLines text={t(tool.nameKey)} />
          </span>
        </div>
      )}
    </div>
  )
}
