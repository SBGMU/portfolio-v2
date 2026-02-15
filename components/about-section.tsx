"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
/* i18n hook for French / English translations */
import { useLanguage } from "@/context/language-context"

export function AboutSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.1)
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  /* Stat keys mapped to translation dictionary */
  const statKeys = ["about.stat1", "about.stat2", "about.stat3", "about.stat4"]

  return (
    <section id="about" className="pt-16 lg:pt-20 pb-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headRef}
          className={`w-full mb-12 ${headVisible ? "reveal-up" : "opacity-0"}`}
        >
          <h2 className="font-heading text-5xl font-bold text-muted-foreground mb-4">
            {t("about.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed w-full text-justify">
            {t("about.description")}
          </p>
        </div>

        <div
          ref={statsRef}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-5 ${
            statsVisible ? "reveal-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {statKeys.map((key, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-6 text-center flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]"
            >
              <div className="font-heading text-xl font-bold bg-gradient-to-r from-[#033580] to-[#056BFF] bg-clip-text text-transparent">
                {t(key)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
