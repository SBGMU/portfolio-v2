"use client"

import { useState } from "react"
import { Mail, Phone, Github, ArrowUpRight, ChevronDown, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
/* i18n hook for French / English translations */
import { useLanguage } from "@/context/language-context"

const CONTACT_EMAIL = "stephenkouanga@gmail.com"

/**
 * Message delivery: FormSubmit (https://formsubmit.co) forwards each submission
 * to CONTACT_EMAIL, with the visitor's address as reply-to. No server or API key
 * is needed; the very first submission triggers a one-time activation email that
 * must be confirmed from the CONTACT_EMAIL inbox.
 */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

/**
 * Contact links: labels resolved via i18n at render time.
 * The email entry is rendered separately, last, as an accordion (see below).
 */
const contactItems = [
  {
    id: "contact-phone",
    icon: <Phone className="h-5 w-5" />,
    labelKey: "contact.phone",
    value: "+33 6 58 37 88 44",
    href: "tel:+33658378844",
    external: false,
  },
  {
    id: "contact-github",
    icon: <Github className="h-5 w-5" />,
    labelKey: "contact.github",
    value: "stephenkouanga",
    href: "https://github.com/SBGMU",
    external: true,
  },
]

const fieldClass =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-[border-color,box-shadow] duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/25 disabled:opacity-60"

const labelClass = "text-xs font-medium text-muted-foreground"

type SendStatus = "idle" | "sending" | "sent" | "error"

export function ContactSection() {
  const { ref: introRef, isVisible: introVisible } = useScrollReveal(0.1)
  const { ref, isVisible } = useScrollReveal(0.1)
  /* i18n */
  const { t } = useLanguage()

  const [formOpen, setFormOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  /* Honeypot: hidden from people, bots tend to fill it */
  const [website, setWebsite] = useState("")
  const [status, setStatus] = useState<SendStatus>("idle")

  const sending = status === "sending"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    /* A filled honeypot means a bot: report success without sending anything */
    if (website) {
      setStatus("sent")
      return
    }

    setStatus("sending")
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `Portfolio: ${subject}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      })
      const result = await response.json().catch(() => null)
      const ok = response.ok && (result?.success === true || result?.success === "true")
      if (!ok) throw new Error("Message not accepted")

      setStatus("sent")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  /* Fallback offered when the delivery fails: same message, in the visitor's mail app */
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`

  return (
    <section id="contact" className="pt-48 pb-12 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section heading, outside the card, aligned like the other section titles */}
        <div
          ref={introRef}
          id="contact-intro"
          className={`mb-12 ${introVisible ? "reveal-up" : "opacity-0"}`}
        >
          <h2 id="contact-title" className="text-gradient font-heading text-5xl font-bold mb-4 text-center">
            {t("contact.title")}
          </h2>
          <p id="contact-description" className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-center">
            {t("contact.description")}
          </p>
        </div>

        <div
          ref={ref}
          className={`${isVisible ? "reveal-up" : "opacity-0"}`}
        >
          <div
            id="contact-card"
            className="bg-card rounded-2xl border border-border p-6 sm:p-8 lg:p-12 w-full md:w-2/3 lg:w-1/2 mx-auto shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]"
          >
            <div id="contact-details" className="flex flex-col gap-6">
              {contactItems.map((item) => (
                <a
                  key={item.id}
                  id={item.id}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="hover:opacity-80 transition-opacity"
                >
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
                </a>
              ))}

              {/* Email: last item, opens as an accordion to write a message */}
              <div id="contact-email">
                <button
                  type="button"
                  id="contact-message-toggle"
                  onClick={() => setFormOpen((prev) => !prev)}
                  aria-expanded={formOpen}
                  aria-controls="contact-message-panel"
                  className="w-full flex items-start gap-4 text-left hover:opacity-80 transition-opacity"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center text-primary-foreground shrink-0 shadow-[0_2px_8px_rgba(5,107,255,0.25)]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{t("contact.email")}</p>
                    {/* The call to action and its chevron sit on the same line as the address */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-foreground font-medium break-all">
                        {CONTACT_EMAIL}
                      </span>
                      <span className="inline-flex items-center gap-1.5 shrink-0">
                        <span className="hidden sm:inline text-xs font-medium text-primary whitespace-nowrap">
                          {t("contact.form.toggle")}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${formOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </div>
                  </div>
                </button>

                {/* Accordion panel: grid-rows 0fr → 1fr animates the height smoothly */}
                <div
                  id="contact-message-panel"
                  role="region"
                  aria-labelledby="contact-message-toggle"
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${formOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className={`overflow-hidden ${formOpen ? "" : "invisible"}`}>
                    {/* Who is writing (name + email side by side), then subject, message, and the send row */}
                    <form
                      id="contact-message-form"
                      onSubmit={handleSubmit}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 mt-6 pt-6 px-0.5 pb-0.5 border-t border-border"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-message-name" className={labelClass}>
                          {t("contact.form.name")}
                        </label>
                        <input
                          id="contact-message-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          disabled={sending}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t("contact.form.namePlaceholder")}
                          className={fieldClass}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-message-email" className={labelClass}>
                          {t("contact.form.email")}
                        </label>
                        <input
                          id="contact-message-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          disabled={sending}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t("contact.form.emailPlaceholder")}
                          className={fieldClass}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label htmlFor="contact-message-subject" className={labelClass}>
                          {t("contact.form.subject")}
                        </label>
                        <input
                          id="contact-message-subject"
                          name="subject"
                          type="text"
                          required
                          disabled={sending}
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder={t("contact.form.subjectPlaceholder")}
                          className={fieldClass}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label htmlFor="contact-message-body" className={labelClass}>
                          {t("contact.form.message")}
                        </label>
                        <textarea
                          id="contact-message-body"
                          name="message"
                          required
                          disabled={sending}
                          rows={6}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={t("contact.form.messagePlaceholder")}
                          className={`${fieldClass} resize-y min-h-[9rem]`}
                        />
                      </div>

                      {/* Honeypot field: off-screen, skipped by keyboard and assistive tech */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      />

                      <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Delivery status, announced to screen readers */}
                        <div id="contact-message-status" role="status" aria-live="polite" className="text-xs leading-relaxed min-w-0">
                          {status === "sent" ? (
                            <span className="inline-flex items-start gap-1.5 text-emerald-500">
                              <CheckCircle2 className="h-4 w-4 shrink-0" />
                              {t("contact.form.sent")}
                            </span>
                          ) : status === "error" ? (
                            <span className="inline-flex items-start gap-1.5 text-destructive">
                              <AlertCircle className="h-4 w-4 shrink-0" />
                              <span>
                                {t("contact.form.error")}{" "}
                                <a href={mailtoHref} className="underline underline-offset-2 hover:opacity-80">
                                  {t("contact.form.errorFallback")}
                                </a>
                              </span>
                            </span>
                          ) : (
                            <span className="text-muted-foreground">{t("contact.form.hint")}</span>
                          )}
                        </div>

                        <button
                          type="submit"
                          id="contact-message-send"
                          disabled={sending}
                          className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl bg-gradient-to-r from-[#033580] to-[#056BFF] px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_4px_14px_rgba(5,107,255,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {sending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                          {sending ? t("contact.form.sending") : t("contact.form.send")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
