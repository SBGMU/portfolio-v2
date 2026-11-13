"use client"

import { useEffect, useState } from "react"
import { ArrowUp, ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const HINT_VISIBLE_MS = 3000 // the chevron stays on screen for 3s…
const HINT_HIDDEN_MS = 2000  // …then disappears for 2s, and so on

/** True while section#presentation is at least partly on screen. */
function usePresentationVisible() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = document.getElementById("presentation")
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return visible
}

/**
 * True while the visitor is still above #about-strengths, i.e. until that block
 * starts entering the screen from the bottom.
 */
function useAboveAboutStrengths() {
  const [above, setAbove] = useState(true)

  useEffect(() => {
    const el = document.getElementById("about-strengths")
    if (!el) return
    let raf = 0
    const check = () => {
      raf = 0
      setAbove(el.getBoundingClientRect().top > window.innerHeight)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return above
}

/**
 * Floating chevron under the presentation: jumps to section#experiences.
 * Shown immediately, visible 3s / hidden 2s in a loop, and brought back
 * straight away whenever the visitor scrolls.
 */
export function ScrollToExperiencesButton() {
  /* Shown from the top of the page down to #about-strengths, never from there on */
  const aboveAboutStrengths = useAboveAboutStrengths()
  const [pulseOn, setPulseOn] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const hide = () => {
      setPulseOn(false)
      timer = setTimeout(show, HINT_HIDDEN_MS)
    }
    const show = () => {
      clearTimeout(timer)
      setPulseOn(true)
      timer = setTimeout(hide, HINT_VISIBLE_MS)
    }

    show()
    window.addEventListener("scroll", show, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", show)
    }
  }, [])

  const shown = aboveAboutStrengths && pulseOn

  return (
    /* Below lg it sits higher (bottom-28), clear above the floating "Get in Touch"
       button, which occupies the bottom of the screen on phones and tablets */
    <div
      id="scroll-to-experiences"
      className={`fixed bottom-28 lg:bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      {/* Label and chevron float together as one unit */}
      <a
        href="#experiences"
        tabIndex={shown ? 0 : -1}
        className={`scroll-hint-float group flex flex-col items-center gap-2 ${shown ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <span className="liquid-glass-btn rounded-full px-4 py-1.5 text-xs font-medium text-white whitespace-nowrap">
          {t("scroll.experiences")}
        </span>
        <span className="liquid-glass-btn h-12 w-12 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105">
          <ChevronDown className="h-5 w-5" />
        </span>
      </a>
    </div>
  )
}

/**
 * Back-to-top button: slides up from the bottom once section#presentation
 * has left the screen, and slides back down when it returns.
 */
export function ScrollTopButton() {
  const presentationVisible = usePresentationVisible()
  const { t } = useLanguage()
  const shown = !presentationVisible

  return (
    <button
      type="button"
      id="scroll-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("scroll.top")}
      title={t("scroll.top")}
      tabIndex={shown ? 0 : -1}
      className={`fixed bottom-10 right-10 lg:bottom-14 lg:right-14 z-50 h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#033580] to-[#056BFF] text-primary-foreground shadow-[0_4px_20px_rgba(5,107,255,0.5),0_0_40px_rgba(5,107,255,0.15)] hover:brightness-110 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${shown
          ? "translate-y-0 opacity-100"
          : "translate-y-24 opacity-0 pointer-events-none"
        }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
