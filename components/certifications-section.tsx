"use client"

import { Award } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
/* i18n hook for French / English translations */
import { useLanguage } from "@/context/language-context"

/** Certification keys mapped to the translation dictionary. */
const certKeys = ["cert.1", "cert.2", "cert.3"]

export function CertificationsSection() {
  const { ref, isVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  return (
    <section id="certifications" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`${isVisible ? "reveal-up" : "opacity-0"}`}
        >
          <h2 className="font-heading text-5xl font-bold text-muted-foreground mb-12">
            {t("cert.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certKeys.map((prefix, index) => (
            <CertificationCard key={prefix} prefix={prefix} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationCard({
  prefix,
  index,
}: {
  prefix: string
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(5,107,255,0.15),0_4px_12px_rgba(0,0,0,0.3)] ${
        isVisible ? "reveal-scale" : "opacity-0"
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
