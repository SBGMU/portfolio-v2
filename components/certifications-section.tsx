"use client"

import { Award } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
/* i18n hook for French / English translations */
import { useLanguage } from "@/context/language-context"

/** Certification keys mapped to the translation dictionary, with an English slug used as element id. */
const certifications = [
  { prefix: "cert.1", slug: "datacamp-python" },
  { prefix: "cert.2", slug: "datacamp-advanced-sql" },
  { prefix: "cert.3", slug: "mimo-sql-fundamentals" },
]

export function CertificationsSection() {
  const { ref, isVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  return (
    /* overflow-x-clip: cards slide in from outside the viewport without creating a horizontal scrollbar */
    <section id="certifications" className="py-48 px-6 overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          id="certifications-heading"
          className={`${isVisible ? "reveal-up" : "opacity-0"}`}
        >
          <h2 id="certifications-title" className="text-gradient font-heading text-5xl font-bold mb-12 text-center">
            {t("cert.title")}
          </h2>
        </div>

        {/* One certification per row. auto-rows-fr gives every row: and so every
            card: the same height; cards are centred, 2/3 wide on tablets and half-width from lg up. */}
        <div id="certifications-list" className="grid grid-cols-1 auto-rows-fr gap-[3.75rem]">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.prefix}
              prefix={cert.prefix}
              slug={cert.slug}
              /* The middle card comes in from the far right, the others from the far left */
              from={index === 1 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationCard({
  prefix,
  slug,
  from,
}: {
  prefix: string
  slug: string
  from: "left" | "right"
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  return (
    /* Each card slides in from the far edge of the screen to the centre when scrolled into view */
    <div
      ref={ref}
      id={`certification-${slug}`}
      className={`bg-card w-full md:w-2/3 lg:w-1/2 h-full mx-auto rounded-2xl border border-border p-6 hover:border-primary/30 transition-[border-color,box-shadow] duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(5,107,255,0.15),0_4px_12px_rgba(0,0,0,0.3)] ${
        isVisible ? (from === "right" ? "reveal-from-right" : "reveal-from-left") : "opacity-0"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#033580] group-hover:to-[#056BFF] group-hover:text-primary-foreground transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          <Award className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-center justify-between gap-3 mb-2">
            <h3 className="font-heading text-base font-semibold text-foreground">
              {t(`${prefix}.title`)}
            </h3>
            <span className="text-xs text-primary-foreground font-medium bg-gradient-to-r from-[#033580] to-[#056BFF] rounded-full px-3 py-1 shrink-0 shadow-[0_2px_6px_rgba(5,107,255,0.3)]">
              {t(`${prefix}.year`)}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t(`${prefix}.desc`)}
          </p>
        </div>
      </div>
    </div>
  )
}
