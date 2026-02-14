"use client"

import { Download } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { StickyGetInTouch } from "@/components/sticky-get-in-touch"

export default function Page() {
  return (
    <main className="min-h-screen /*bg-background$/">
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CertificationsSection />
      <ContactSection />

      {/* Download Resume - centered standalone */}
      <section className="pb-32 pt-8 px-6">
        <div className="mx-auto max-w-7xl flex justify-center">
          <a
            href="https://drive.google.com/file/d/1KIfE1hKUht9HbUd0BOyxpF_m7x5QZ4jT/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#033580] to-[#056BFF] text-primary-foreground font-medium text-sm px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(5,107,255,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_28px_rgba(5,107,255,0.5)] hover:opacity-95 transition-all"
          >
            <Download className="h-4 w-4" />
            Download my Resume
          </a>
        </div>
      </section>

      <Footer />
      <StickyGetInTouch />
    </main>
  )
}
