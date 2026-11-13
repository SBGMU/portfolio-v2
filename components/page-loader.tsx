"use client"

import { useEffect, useState } from "react"

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    /* Timings are the original ones divided by 2.1 (2800 / 3600 ms); keep them in
       step with the .page-loader animations in globals.css */
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 1333)
    const hideTimer = setTimeout(() => setIsVisible(false), 1714)
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
