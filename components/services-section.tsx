"use client"

import { useState, useEffect, useRef } from "react"
import { CreditCard, Database, Monitor, Car, MapPin, Calendar, Clock, X, Building2 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
/* i18n hook for French / English translations */
import { useLanguage, RichText } from "@/context/language-context"

/**
 * Experience entries, most recent first: each entry uses translation keys so
 * the content switches automatically when the locale toggles. "slug" is an
 * English identifier used as the card's element id.
 */
const experienceKeys = [
  { icon: <CreditCard className="h-6 w-6" />, prefix: "exp.1", slug: "data-coordinator-atm-migration" },
  { icon: <Database className="h-6 w-6" />, prefix: "exp.2", slug: "database-manager" },
  { icon: <Monitor className="h-6 w-6" />, prefix: "exp.3", slug: "php-developer" },
  { icon: <Car className="h-6 w-6" />, prefix: "exp.4", slug: "web-developer" },
]

/* ---- Pinned stage tuning ---- */
const STAGE_MIN_HEIGHT_PX = 640 // below this viewport height (e.g. a phone in landscape) a card no longer fits the stage
const STAGE_STEP_VH = 70     // scroll distance (in viewport heights ×100) spent on each extra card
const PILE_GAP_PX = 18       // vertical offset between two stacked cards (the header strip left peeking)
const PILE_SCALE_STEP = 0.045 // how much a card shrinks per card resting on top of it
const PILE_DIM_STEP = 0.16    // how much a card dims per card resting on top of it

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smoothstep = (value: number) => value * value * (3 - 2 * value)

export function ServicesSection() {
  const { ref, isVisible } = useScrollReveal(0.1)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  /* Fallback to a plain vertical list (no pinning) when the visitor prefers reduced
     motion, or when the screen is too short for a card to fit in the pinned stage */
  const [isStatic, setIsStatic] = useState(false)
  const count = experienceKeys.length
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

  /* Pinned stage: the section is taller than the screen and its stage sticks to the
     viewport while the visitor scrolls through it. Each experience rises from the
     very bottom of the screen and lands on the pile in the centre; the cards
     underneath stay visible as a stack: shifted up, slightly smaller and dimmer.
     Scrolling back up plays it in reverse. */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const decide = () => setIsStatic(reduceMotion.matches || window.innerHeight < STAGE_MIN_HEIGHT_PX)
    decide()
    window.addEventListener("resize", decide)
    return () => window.removeEventListener("resize", decide)
  }, [])

  useEffect(() => {
    if (isStatic) return
    const pin = pinRef.current
    if (!pin) return

    const cards = Array.from(pin.querySelectorAll<HTMLElement>("[data-stack-card]"))
    const n = cards.length
    let raf = 0

    const update = () => {
      raf = 0
      const rect = pin.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const raw = (travel > 0 ? clamp01(-rect.top / travel) : 0) * (n - 1)
      /* Each card rests for a moment, then the next one eases in */
      const base = Math.max(0, Math.min(Math.floor(raw), n - 2))
      const progress = base + smoothstep(clamp01((raw - base - 0.12) / 0.7))

      /* arrived[i]: 0 = still below the screen, 1 = resting on the pile */
      const arrived = cards.map((_, i) => (i === 0 ? 1 : clamp01(progress - (i - 1))))
      const top = Math.round(progress)

      cards.forEach((card, i) => {
        let depth = 0 // how many cards rest on top of this one
        for (let j = i + 1; j < n; j++) depth += arrived[j]
        const enter = 1 - arrived[i]
        const pileOffset = (i - (n - 1) / 2) * PILE_GAP_PX

        card.style.transform =
          `translateY(calc(${pileOffset}px + ${enter.toFixed(4)} * (50vh + 100%))) ` +
          `scale(${(1 - depth * PILE_SCALE_STEP).toFixed(4)})`
        card.style.filter = depth > 0.001 ? `brightness(${(1 - depth * PILE_DIM_STEP).toFixed(4)})` : ""
        card.style.opacity = enter >= 1 ? "0" : "1"

        /* Only the card on top of the pile is interactive */
        const active = i === top
        card.style.pointerEvents = active ? "" : "none"
        card.toggleAttribute("inert", !active)
      })
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      /* Leave the cards clean for the static list */
      cards.forEach((card) => {
        card.style.transform = ""
        card.style.filter = ""
        card.style.opacity = ""
        card.style.pointerEvents = ""
        card.removeAttribute("inert")
      })
    }
  }, [isStatic])

  return (
    <>
      <section id="experiences" className="py-48 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Tall scroll track: its height sets how long the stage stays pinned */}
          <div
            ref={pinRef}
            id="experiences-stack"
            className="relative"
            style={isStatic ? undefined : { height: `calc(100svh + ${(count - 1) * STAGE_STEP_VH}svh)` }}
          >
            {/* Stage: sticks to the viewport; overflow-hidden keeps incoming cards out of sight below it */}
            <div
              id="experiences-stage"
              className={isStatic ? "" : "sticky top-0 h-[100svh] flex flex-col overflow-hidden"}
            >
              <div
                ref={ref}
                id="experiences-heading"
                className={`${isStatic ? "" : "pt-36"} ${isVisible ? "reveal-up" : "opacity-0"}`}
              >
                <h2 id="experiences-title" className="text-gradient font-heading text-5xl font-bold text-center">
                  {t("exp.title")}
                </h2>
              </div>

              {/* Cards are 1.44× (two +20% steps) the width of a column of the former grid (which
                  was 1/2 from sm and 1/4 from lg, minus the gaps); full width on mobile. They all share one grid cell, so they sit on the
                  same spot and have the same height: which keeps the pile tidy. */}
              <div
                id="experiences-cards"
                className={isStatic ? "mt-12" : "flex-1 flex items-center justify-center px-1 pb-10"}
              >
                <div
                  className={`w-full sm:w-[calc(72%-0.9rem)] lg:w-[calc(36%-1.35rem)] mx-auto ${isStatic ? "flex flex-col gap-5" : "grid"}`}
                >
                  {experienceKeys.map((exp, index) => (
                    <ExperienceCard
                      key={exp.prefix}
                      icon={exp.icon}
                      prefix={exp.prefix}
                      slug={exp.slug}
                      index={index}
                      count={count}
                      isStatic={isStatic}
                      onExpand={() => setExpandedIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded card modal with scroll */}
      {expandedIndex !== null && (
        <div
          id="experience-details-modal"
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

            {/* Description: paragraphs separated by \n\n, with **bold** markers */}
            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
              {t(`${experienceKeys[expandedIndex].prefix}.desc`)
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i}><RichText text={paragraph} /></p>
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
  slug,
  index,
  count,
  isStatic,
  onExpand,
}: {
  icon: React.ReactNode
  prefix: string
  slug: string
  index: number
  count: number
  isStatic: boolean
  onExpand: () => void
}) {
  /* i18n */
  const { t } = useLanguage()

  return (
    /* Original vertical card format. Transform / filter / opacity are driven by the
       scroll effect in ServicesSection; cards other than the first start hidden. */
    <div
      data-stack-card
      id={`experience-${slug}`}
      onClick={onExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onExpand()
        }
      }}
      role="button"
      tabIndex={0}
      style={isStatic || index === 0 ? undefined : { opacity: 0 }}
      className="bg-card exp-stack-card [grid-area:1/1] w-full origin-top rounded-2xl border border-border p-8 hover:border-primary/30 transition-[border-color,box-shadow] duration-300 group cursor-pointer flex flex-col will-change-transform shadow-[0_-10px_30px_rgba(0,0,0,0.3),0_20px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_-10px_30px_rgba(0,0,0,0.3),0_20px_50px_rgba(5,107,255,0.18)]"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-gradient-to-r group-hover:from-[#033580] group-hover:to-[#056BFF] group-hover:text-primary-foreground transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          {icon}
        </div>
        {/* Position in the stack, e.g. 01 / 04 */}
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-heading text-base font-semibold text-foreground mb-4">
        {t(`${prefix}.title`)}
      </h3>

      <div className="flex flex-col gap-2.5 mb-6">
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
        <RichText text={t(`${prefix}.preview`)} />
      </p>

      {/* "See more" link: translated */}
      <span className="text-primary text-xs font-medium group-hover:underline mt-6 block">
        {t("exp.seeMore")}
      </span>
    </div>
  )
}
