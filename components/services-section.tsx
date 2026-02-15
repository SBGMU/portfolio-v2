"use client"

import { useState, useEffect } from "react"
import { CreditCard, Database, Monitor, Car, MapPin, Calendar, Clock, X, Building2 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
/* i18n hook for French / English translations */
import { useLanguage } from "@/context/language-context"

/**
 * Experience entries — each entry uses translation keys so the content
 * switches automatically when the locale toggles.
 */
const experienceKeys = [
  { icon: <CreditCard className="h-6 w-6" />, prefix: "exp.1" },
  { icon: <Database className="h-6 w-6" />, prefix: "exp.2" },
  { icon: <Monitor className="h-6 w-6" />, prefix: "exp.3" },
  { icon: <Car className="h-6 w-6" />, prefix: "exp.4" },
]

export function ServicesSection() {
  const { ref, isVisible } = useScrollReveal(0.1)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  /* i18n */
  const { t } = useLanguage()

  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [expandedIndex])

  return (
    <>
      <section id="experiences" className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div
            ref={ref}
            className={`${isVisible ? "reveal-up" : "opacity-0"}`}
          >
            <h2 className="font-heading text-5xl font-bold text-muted-foreground mb-12">
              {t("exp.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experienceKeys.map((exp, index) => (
              <ExperienceCard
                key={exp.prefix}
                icon={exp.icon}
                prefix={exp.prefix}
                index={index}
                onExpand={() => setExpandedIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Expanded card modal with scroll */}
      {expandedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setExpandedIndex(null)}
        >
          <div
            className="bg-card rounded-2xl border border-border p-8 max-w-lg w-full relative max-h-[85vh] overflow-y-auto shadow-[0_16px_50px_rgba(0,0,0,0.5),0_4px_16px_rgba(5,107,255,0.15)]"
            style={{ animation: "reveal-scale 0.25s cubic-bezier(0.22,1,0.36,1) forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedIndex(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("exp.close")}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center text-primary-foreground mb-5 shadow-[0_4px_14px_rgba(5,107,255,0.3)]">
              {experienceKeys[expandedIndex].icon}
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              {t(`${experienceKeys[expandedIndex].prefix}.title`)}
            </h3>

            <div className="flex flex-col gap-1.5 mb-5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs font-medium text-foreground">
                  {t(`${experienceKeys[expandedIndex].prefix}.company`)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">
                  {t(`${experienceKeys[expandedIndex].prefix}.city`)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">
                  {t(`${experienceKeys[expandedIndex].prefix}.date`)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">
                  {t(`${experienceKeys[expandedIndex].prefix}.duration`)}
                </span>
              </div>
            </div>

            {/* Description — paragraphs separated by \n\n in the translation */}
            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
              {t(`${experienceKeys[expandedIndex].prefix}.desc`)
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ExperienceCard({
  icon,
  prefix,
  index,
  onExpand,
}: {
  icon: React.ReactNode
  prefix: string
  index: number
  onExpand: () => void
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  return (
    <div
      ref={ref}
      onClick={onExpand}
      className={`bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 group cursor-pointer flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(5,107,255,0.15),0_4px_12px_rgba(0,0,0,0.3)] ${
        isVisible ? "reveal-scale" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:bg-gradient-to-r group-hover:from-[#033580] group-hover:to-[#056BFF] group-hover:text-primary-foreground transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        {icon}
      </div>
      <h3 className="font-heading text-base font-semibold text-foreground mb-1">
        {t(`${prefix}.title`)}
      </h3>

      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-medium text-foreground">{t(`${prefix}.company`)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{t(`${prefix}.city`)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{t(`${prefix}.date`)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{t(`${prefix}.duration`)}</span>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
        {t(`${prefix}.preview`)}
      </p>

      {/* "See more" link — translated */}
      <span className="text-primary text-xs font-medium group-hover:underline mt-3 block">
        {t("exp.seeMore")}
      </span>
    </div>
  )
}
