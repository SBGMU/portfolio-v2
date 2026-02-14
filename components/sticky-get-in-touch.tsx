"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

export function StickyGetInTouch() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const presentationEl = document.getElementById("presentation")
    const contactEl = document.getElementById("contact")

    let presentationVisible = true
    let contactVisible = false

    function update() {
      // Hide when profile card (presentation) OR contact section is on screen
      setVisible(!presentationVisible && !contactVisible)
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

    if (presentationEl) observer.observe(presentationEl)
    if (contactEl) observer.observe(contactEl)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 lg:hidden transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="#contact"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#033580] to-[#056BFF] px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_4px_20px_rgba(5,107,255,0.5),0_0_40px_rgba(5,107,255,0.15)] hover:opacity-90 transition-opacity"
      >
        Get in Touch
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  )
}
