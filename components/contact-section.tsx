"use client"

import { Mail, MapPin, Phone, Github, ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
/* i18n hook for French / English translations */
import { useLanguage } from "@/context/language-context"

/**
 * Contact items — labels resolved via i18n at render time.
 * The translation keys for labels are: contact.email, contact.phone, etc.
 */
const contactItems = [
  {
    icon: <Mail className="h-5 w-5" />,
    labelKey: "contact.email",
    value: "stephenkouanga@gmail.com",
    href: "mailto:stephenkouanga@gmail.com",
    external: true,
  },
  {
    icon: <Phone className="h-5 w-5" />,
    labelKey: "contact.phone",
    value: "+33 6 58 37 88 44",
    href: "tel:+33658378844",
    external: false,
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    labelKey: "contact.location",
    value: "Ile-de-france, France",
    href: null,
    external: false,
  },
  {
    icon: <Github className="h-5 w-5" />,
    labelKey: "contact.github",
    value: "stephenkouanga",
    href: "https://github.com/SBGMU",
    external: true,
  },
]

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  return (
    <section id="contact" className="pt-32 pb-8 px-6">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`${isVisible ? "reveal-up" : "opacity-0"}`}
        >
          <div className="bg-card rounded-2xl border border-border p-8 lg:p-12 w-full shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]">
            <div className="text-left mb-10">
              <h2 className="text-gradient font-heading text-4xl lg:text-4xl font-bold mb-4">
                {t("contact.title")}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl text-justify">
                {t("contact.description")}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {contactItems.map((item) => {
                const content = (
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center text-primary-foreground shrink-0 shadow-[0_2px_8px_rgba(5,107,255,0.25)]">
                      {item.icon}
                    </div>
                    <div className="text-left min-w-0">
                      {/* Translated label */}
                      <p className="text-xs text-muted-foreground mb-0.5">{t(item.labelKey)}</p>
                      <span className="text-sm text-foreground font-medium inline-flex items-center gap-1.5 break-all">
                        {item.value}
                        {item.external && <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />}
                      </span>
                    </div>
                  </div>
                )

                if (item.href) {
                  return (
                    <a
                      key={item.labelKey}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="hover:opacity-80 transition-opacity"
                    >
                      {content}
                    </a>
                  )
                }

                return <div key={item.labelKey}>{content}</div>
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
