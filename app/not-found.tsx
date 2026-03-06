import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-[10rem] font-bold leading-none tracking-tight text-gradient">
        404
      </h1>

      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-4">
        Page introuvable
      </h2>

      <p className="text-muted-foreground mt-3 max-w-md text-base leading-relaxed">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-primary hover:text-primary/75 transition-colors font-medium font-heading text-lg"
      >
        ← Retour à l&apos;accueil
      </Link>
    </main>
  )
}
