"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Moon, Sun, Menu, X, ChevronDown, Check } from "lucide-react"
import { useLanguage, type Locale } from "@/context/language-context"

/**
 * Nav items: labels are resolved via the i18n context at render time.
 * Each entry maps to a translation key.
 */
const navItems = [
  { labelKey: "nav.presentation", href: "#presentation" },
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.experiences", href: "#experiences" },
  { labelKey: "nav.certifications", href: "#certifications" },
  { labelKey: "nav.contact", href: "#contact" },
]

const languages: { code: Locale; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
]

/**
 * Language switcher: compact "FR ⌄" button opening a dropdown that lists
 * the available languages (code badge + name + check on the current one).
 */
function LanguageSwitcher({ id }: { id: string }) {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  /* Close on outside click / Escape */
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} id={id} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="liquid-glass-btn h-10 rounded-full pl-4 pr-3 flex items-center gap-1.5 text-white text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.02]"
        aria-label={t("lang.select")}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {locale.toUpperCase()}
        <ChevronDown
          className={`h-4 w-4 opacity-70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <ul
        role="menu"
        aria-label={t("lang.select")}
        className={`lang-dropdown absolute right-0 top-full mt-2 w-52 rounded-2xl p-1.5 flex flex-col gap-1 origin-top-right transition-all duration-200 ease-out ${open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
      >
        {languages.map((lang) => {
          const selected = lang.code === locale
          return (
            <li key={lang.code} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setLocale(lang.code)
                  setOpen(false)
                }}
                className={`lang-option w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${selected ? "lang-option-selected" : ""
                  }`}
              >
                <span className="lang-badge inline-flex items-center justify-center h-6 min-w-[2rem] rounded-md px-1.5 text-[11px] font-bold tracking-wide">
                  {lang.code.toUpperCase()}
                </span>
                <span className="flex-1 text-left">{lang.label}</span>
                {selected && <Check className="lang-check h-4 w-4 shrink-0" />}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Theme switch: both icons are always visible (sun = light, moon = dark);
 * a glass thumb slides onto the active one.
 */
function ThemeSwitch({
  id,
  isDark,
  onToggle,
}: {
  id: string
  isDark: boolean
  onToggle: () => void
}) {
  const { t } = useLanguage()
  const label = isDark ? t("nav.lightSide") : t("nav.darkSide")

  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={onToggle}
      className="liquid-glass-btn relative h-10 rounded-full flex items-center text-white transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Sliding thumb: 2px larger than its half of the switch on every side, so it
          overflows the switch outline by 1px (same treatment as the nav pill) */}
      <span
        aria-hidden="true"
        className={`liquid-glass-nav-active absolute -left-0.5 -top-0.5 h-[42px] w-10 rounded-full pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isDark ? "translate-x-9" : "translate-x-0"
          }`}
      />
      <span
        className={`relative z-10 h-[38px] w-9 flex items-center justify-center transition-opacity duration-300 ${isDark ? "opacity-45" : "opacity-100"
          }`}
      >
        <Sun className="h-4 w-4" />
      </span>
      <span
        className={`relative z-10 h-[38px] w-9 flex items-center justify-center transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-45"
          }`}
      >
        <Moon className="h-4 w-4" />
      </span>
    </button>
  )
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("presentation")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  /* ---- i18n hook ---- */
  const { t, locale } = useLanguage()

  /* ---- Sliding active pill (desktop nav) ---- */
  const linksRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  /* While a clicked link is smooth-scrolling to its section, scroll tracking is
     paused so the pill glides straight to the target instead of stopping on
     every section it passes. */
  const navLockRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      if (Date.now() < navLockRef.current) return

      const sections = navItems.map((item) => item.href.slice(1))

      /* At the very bottom of the page the last section is the current one, even
         if it is too short for its top to travel up the screen. */
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActiveSection(sections[sections.length - 1])
        return
      }

      /* Otherwise: the last section whose top has crossed a line in the upper part
         of the screen. Sections start with a large top padding, so a line right
         under the navbar would switch too late; on tall screens the line is capped
         so that a short section is not skipped in favour of the next one. */
      const line = Math.min(window.innerHeight * 0.5, 320)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= line) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    /* Smooth scroll finished: release the lock and resync with the real position */
    const handleScrollEnd = () => {
      navLockRef.current = 0
      handleScroll()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("scrollend", handleScrollEnd)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scrollend", handleScrollEnd)
    }
  }, [])

  /* Position the pill under the active link; re-measure when the label widths
     change (language switch, web font loaded, resize). */
  useEffect(() => {
    const measure = () => {
      const link = linksRef.current?.querySelector<HTMLElement>(`#nav-link-${activeSection}`)
      if (link && link.offsetWidth > 0) {
        setIndicator({ left: link.offsetLeft, width: link.offsetWidth })
      }
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [activeSection, locale])

  const handleDesktopNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    navLockRef.current = Date.now() + 1500
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light-mode")
      document.documentElement.classList.add("dark-mode")
    } else {
      document.documentElement.classList.remove("dark-mode")
      document.documentElement.classList.add("light-mode")
    }
  }, [isDark])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }, [])

  return (
    <>
      <nav
        id="site-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
          }`}
      >
        <div className="relative mx-auto max-w-7xl flex items-center justify-between px-6 py-8">
          {/* Logo: round, same height as the desktop nav pill (42px) */}
          <a
            id="site-logo"
            href="#presentation"
            className="flex items-center"
            aria-label="Stephen Kouanga"
          >
            <div className="h-10 w-10 lg:h-[42px] lg:w-[42px] rounded-full bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center shadow-[0_2px_10px_rgba(5,107,255,0.3)]">
              <span className="text-primary-foreground font-bold text-sm lg:text-base">SK</span>
            </div>
          </a>

          {/* ===== Desktop Nav: liquid glass pill ===== */}
          {/* A single glass pill sits under the active link and slides horizontally
              to the newly selected one. It stays visible while other items are hovered.
              The pill is centred on the page axis, i.e. aligned with the portrait below. */}
          <div
            ref={linksRef}
            id="desktop-nav-links"
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center liquid-glass-nav rounded-full"
          >
            {indicator && (
              <span
                id="nav-active-indicator"
                aria-hidden="true"
                className="liquid-glass-nav-active absolute left-0 -top-0.5 -bottom-0.5 rounded-full pointer-events-none transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                /* 2px larger than the link on every side: the pill slightly overflows the nav container */
                style={{ width: indicator.width + 4, transform: `translateX(${indicator.left - 2}px)` }}
              />
            )}
            {navItems.map((item) => {
              const sectionId = item.href.slice(1)
              const isActive = activeSection === sectionId
              return (
                <a
                  key={item.href}
                  id={`nav-link-${sectionId}`}
                  href={item.href}
                  onClick={() => handleDesktopNavClick(sectionId)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative z-10 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ease-out ${isActive
                      ? "text-white"
                      : "liquid-glass-nav-item text-white/70 hover:text-white"
                    }`}
                >
                  {t(item.labelKey)}
                </a>
              )
            })}
          </div>

          {/* ===== Desktop right buttons ===== */}
          <div className="hidden lg:flex items-center gap-3">
            {/* French / English language dropdown: liquid glass */}
            <LanguageSwitcher id="language-switcher" />

            {/* Light / dark switch: sun and moon side by side, glass thumb on the active one */}
            <ThemeSwitch id="theme-toggle" isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>

          {/* ===== Mobile/Tablet right group: language dropdown + hamburger ===== */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher id="language-switcher-mobile" />

            {/* Hamburger button: liquid glass */}
            <button
              id="mobile-menu-open"
              className="flex items-center justify-center h-10 w-10 rounded-xl liquid-glass-btn text-white transition-all duration-300 hover:scale-105"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Overlay: liquid glass backdrop ===== */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Blurred overlay background: liquid glass */}
        <div
          className="absolute inset-0 liquid-glass-overlay"
          onClick={() => setMobileOpen(false)}
        />

        {/* Mobile menu panel: liquid glass */}
        <div
          className={`absolute inset-x-0 top-0 liquid-glass-menu border-b border-white/10 transition-transform duration-300 ease-out ${mobileOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-6 py-8">
            <a
              href="#presentation"
              className="flex items-center"
              aria-label="Stephen Kouanga"
              onClick={() => setMobileOpen(false)}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SK</span>
              </div>
            </a>

            {/* Close button: liquid glass */}
            <button
              className="flex items-center justify-center h-10 w-10 rounded-xl liquid-glass-btn text-white transition-all duration-300 hover:scale-105"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1 px-6 pb-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${activeSection === item.href.slice(1)
                    ? "bg-gradient-to-r from-[#033580] to-[#056BFF] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                {t(item.labelKey)}
              </button>
            ))}

            {/* Theme switch (language is in the top bar) */}
            <div className="flex justify-center mt-3">
              <ThemeSwitch id="theme-toggle-mobile" isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
