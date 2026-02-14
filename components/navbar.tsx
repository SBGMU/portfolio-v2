"use client"

import { useState, useEffect, useCallback } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"

const navItems = [
  { label: "Presentation", href: "#presentation" },
  { label: "About", href: "#about" },
  { label: "Experiences", href: "#experiences" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("presentation")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <a href="#presentation" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">SK</span>
            </div>
            <span className="text-foreground font-heading text-lg font-semibold">
              Stephen Kouanga
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-secondary/60 rounded-full px-1.5 py-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeSection === item.href.slice(1)
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center gap-2 bg-secondary/60 text-foreground rounded-full px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>Light Side</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>Dark Side</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-secondary/60 text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 md:hidden ${mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute inset-x-0 top-0 bg-card border-b border-border transition-transform duration-300 ease-out ${mobileOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <a href="#presentation" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <div className="h-7 w-7 rounded-lg bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">SK</span>
              </div>
              <span className="text-foreground font-heading text-lg font-semibold">
                SK
              </span>
            </a>
            <button
              className="flex items-center justify-center h-10 w-10 rounded-xl bg-secondary/60 text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-1 px-6 pb-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${activeSection === item.href.slice(1)
                    ? "bg-gradient-to-r from-[#033580] to-[#056BFF] text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setIsDark(!isDark)
                setMobileOpen(false)
              }}
              className="flex items-center justify-center gap-2 bg-secondary text-foreground rounded-xl px-5 py-3 text-sm font-semibold mt-3 hover:bg-secondary/80 transition-colors"
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>Light Side</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>Dark Side</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
