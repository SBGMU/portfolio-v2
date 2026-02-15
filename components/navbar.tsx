"use client"

import { useState, useEffect, useCallback } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

/**
 * Nav items — labels are resolved via the i18n context at render time.
 * Each entry maps to a translation key.
 */
const navItems = [
  { labelKey: "nav.presentation", href: "#presentation" },
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.experiences", href: "#experiences" },
  { labelKey: "nav.certifications", href: "#certifications" },
  { labelKey: "nav.contact", href: "#contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("presentation")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  /* ---- i18n hook ---- */
  const { locale, toggleLocale, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#presentation" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">SK</span>
            </div>
            <span className="text-foreground font-heading text-lg font-semibold">
              Stephen Kouanga
            </span>
          </a>

          {/* ===== Desktop Nav — liquid glass pill ===== */}
          <div className="hidden md:flex items-center liquid-glass-nav rounded-full px-1.5 py-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item.href.slice(1)
                    ? /* Active item gets a deeper glass pill */
                      "liquid-glass-nav-active text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </div>

          {/* ===== Desktop right buttons ===== */}
          <div className="hidden md:flex items-center gap-3">
            {/* French / English language toggle — circular flag button, liquid glass */}
            <button
              onClick={toggleLocale}
              className="liquid-glass-btn h-10 w-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105"
              aria-label={locale === "en" ? "Switch to French" : "Switch to English"}
              title={locale === "en" ? "Passer en Français" : "Switch to English"}
            >
              {/* Show the opposite flag to indicate what clicking will switch to */}
              {locale === "en" ? (
                /* Show French flag — clicking switches to French */
                <Image
                  src="/images/french-flag.png"
                  alt="French"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              ) : (
                /* Show UK/EN indicator — clicking switches to English */
                <span className="text-white font-bold text-xs leading-none">EN</span>
              )}
            </button>

            {/* Light Side / Dark Side toggle — liquid glass */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="liquid-glass-btn flex items-center gap-2 text-white rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>{t("nav.lightSide")}</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>{t("nav.darkSide")}</span>
                </>
              )}
            </button>
          </div>

          {/* ===== Mobile hamburger — liquid glass ===== */}
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl liquid-glass-btn text-white transition-all duration-300 hover:scale-105"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* ===== Mobile Overlay — liquid glass backdrop ===== */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Blurred overlay background — liquid glass */}
        <div
          className="absolute inset-0 liquid-glass-overlay"
          onClick={() => setMobileOpen(false)}
        />

        {/* Mobile menu panel — liquid glass */}
        <div
          className={`absolute inset-x-0 top-0 liquid-glass-menu border-b border-white/10 transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-6 py-4">
            <a
              href="#presentation"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">SK</span>
              </div>
              <span className="text-white font-heading text-lg font-semibold">SK</span>
            </a>

            {/* Close button — liquid glass */}
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
                className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  activeSection === item.href.slice(1)
                    ? "bg-gradient-to-r from-[#033580] to-[#056BFF] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}

            {/* Bottom row: language toggle + theme toggle */}
            <div className="flex items-center gap-3 mt-3">
              {/* Language toggle — circular flag, liquid glass */}
              <button
                onClick={() => {
                  toggleLocale()
                }}
                className="liquid-glass-btn h-12 w-12 rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 hover:scale-105"
                aria-label={locale === "en" ? "Switch to French" : "Switch to English"}
              >
                {locale === "en" ? (
                  <Image
                    src="/images/french-flag.png"
                    alt="French"
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-sm leading-none">EN</span>
                )}
              </button>

              {/* Theme toggle — liquid glass */}
              <button
                onClick={() => {
                  setIsDark(!isDark)
                  setMobileOpen(false)
                }}
                className="liquid-glass-btn flex-1 flex items-center justify-center gap-2 text-white rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300"
              >
                {isDark ? (
                  <>
                    <Sun className="h-4 w-4" />
                    <span>{t("nav.lightSide")}</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    <span>{t("nav.darkSide")}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
