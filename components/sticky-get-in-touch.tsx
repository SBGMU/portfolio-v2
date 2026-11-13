"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

/**
 * Mobile / tablet floating call to action (hidden from lg up).
 * Hidden while the presentation or the contact section is on screen, and while
 * the pinned experiences stage fills the screen (it would cover the cards).
 */
export function StickyGetInTouch() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const presentationEl = document.getElementById("presentation")
    const contactEl = document.getElementById("contact")
    const experiencesEl = document.getElementById("experiences-stack")

    let presentationVisible = true
    let contactVisible = false
    let experiencesPinned = false

    function update() {
      setVisible(!presentationVisible && !contactVisible && !experiencesPinned)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === "presentation") {
            presentationVisible = entry.isIntersecting
          } else if (entry.target.id === "contact") {
            contactVisible = entry.isIntersecting
          }
        }
        update()
      },
      { threshold: 0.15 }
    )

    /* The experiences track counts as "pinned" while it crosses the middle of the screen */
    const pinnedObserver = new IntersectionObserver(
      ([entry]) => {
        experiencesPinned = entry.isIntersecting
        update()
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    if (presentationEl) observer.observe(presentationEl)
    if (contactEl) observer.observe(contactEl)
    if (experiencesEl) pinnedObserver.observe(experiencesEl)

    return () => {
      observer.disconnect()
      pinnedObserver.disconnect()
    }
  }, [])

  return (
    /* bottom-10: same baseline as the back-to-top button */
    <div
      id="sticky-get-in-touch"
      className={`fixed bottom-10 left-0 right-0 z-50 flex justify-center px-6 lg:hidden pointer-events-none transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-24 opacity-0"
      }`}
    >
      <a
        href="#contact"
        tabIndex={visible ? 0 : -1}
        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#033580] to-[#056BFF] px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_4px_20px_rgba(5,107,255,0.5),0_0_40px_rgba(5,107,255,0.15)] hover:opacity-90 transition-opacity ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {t("sticky.getInTouch")}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  )
}
