"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-[10rem] font-bold leading-none tracking-tight text-gradient">
        500
      </h1>

      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-4">
        Une erreur est survenue
      </h2>

      <p className="text-muted-foreground mt-3 max-w-md text-base leading-relaxed">
        Quelque chose s&apos;est mal passé. Veuillez réessayer ou retourner à l&apos;accueil.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-medium hover:bg-primary/85 transition-colors"
        >
          Réessayer
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/75 transition-colors font-medium font-heading text-lg"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  )
}
