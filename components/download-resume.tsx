"use client"

import { Download } from "lucide-react"
import { useLanguage } from "@/context/language-context"

/* Download Resume — standalone centered CTA with i18n support */
export function DownloadResume() {
  const { t } = useLanguage()

  return (
    <section className="pb-32 pt-8 px-6">
      <div className="mx-auto max-w-7xl flex justify-center">
        <a
          href="https://drive.google.com/file/d/1KIfE1hKUht9HbUd0BOyxpF_m7x5QZ4jT/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#033580] to-[#056BFF] text-primary-foreground font-medium text-sm px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(5,107,255,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_28px_rgba(5,107,255,0.5)] hover:opacity-95 transition-all"
        >
          <Download className="h-4 w-4" />
          {t("download.resume")}
        </a>
      </div>
    </section>
  )
}
