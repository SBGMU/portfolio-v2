"use client"

import { Navbar } from "@/components/navbar"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { StickyGetInTouch } from "@/components/sticky-get-in-touch"
import { DownloadResume } from "@/components/download-resume"
/* i18n provider wraps the entire page so every component can access translations */
import { LanguageProvider } from "@/context/language-context"

export default function Page() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <ScrollProgressBar />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CertificationsSection />
        <ContactSection />
        <DownloadResume />
        <Footer />
        <StickyGetInTouch />
      </main>
    </LanguageProvider>
  )
}
