"use client"

export function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur border-t border-border py-8 px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center shadow-[0_2px_6px_rgba(5,107,255,0.3)]">
            <span className="text-primary-foreground font-bold text-[9px]">SK</span>
          </div>
          <span className="text-foreground font-heading text-sm font-semibold">
            Stephen Kouanga
          </span>
        </div>
        <p className="text-muted-foreground text-xs">
          {"2026 Stephen Kouanga. All rights reserved."}
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/stephen-kouanga/"
            className="text-muted-foreground text-xs hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
