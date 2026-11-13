"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
/* i18n hook for French / English translations */
import { useLanguage, RichText } from "@/context/language-context"

/* Stat keys mapped to translation dictionary, with an English slug used as element id */
const stats = [
  { key: "about.stat1", slug: "adaptability" },
  { key: "about.stat2", slug: "teaching-skills" },
  { key: "about.stat3", slug: "team-spirit" },
  { key: "about.stat4", slug: "analytical-rigor" },
]

export function AboutSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.1)
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  return (
    /* overflow-x-clip: cards slide in from outside the viewport without creating a horizontal scrollbar */
    <section id="about" className="pt-24 lg:pt-[7.5rem] pb-48 px-6 overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headRef}
          id="about-intro"
          className={`w-full mb-12 ${headVisible ? "reveal-up" : "opacity-0"}`}
        >
          <h2 id="about-title" className="text-gradient font-heading text-5xl font-bold mb-4 text-center">
            {t("about.title")}
          </h2>
          <p id="about-description" className="text-muted-foreground leading-relaxed w-full text-justify">
            <RichText text={t("about.description")} />
          </p>
        </div>

        <div
          ref={statsRef}
          id="about-strengths"
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((stat, index) => {
            /* Cards 1 & 2 slide in from the far left, cards 3 & 4 from the far right.
               The outer cards (1 and 4) start slightly later so each pair arrives staggered. */
            const fromLeft = index < 2
            const delay = index === 1 || index === 2 ? 0 : 0.12
            return (
              <div
                key={stat.key}
                id={`about-strength-${stat.slug}`}
                className={`bg-card rounded-2xl border border-border p-6 text-center flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] ${
                  statsVisible
                    ? fromLeft
                      ? "reveal-from-left"
                      : "reveal-from-right"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${delay}s` }}
              >
                <div className="font-heading text-xl font-bold bg-gradient-to-r from-[#033580] to-[#056BFF] bg-clip-text text-transparent">
                  {t(stat.key)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
