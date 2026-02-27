"use client"

import { useEffect, useState } from "react"

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 2800)
    const hideTimer = setTimeout(() => setIsVisible(false), 3600)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`page-loader${isFadingOut ? " page-loader--out" : ""}`}>
      <h2 className="text-gradient page-loader__title font-heading">
        Stephen Kouanga
      </h2>
    </div>
  )
}
