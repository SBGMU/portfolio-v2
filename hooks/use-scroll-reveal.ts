"use client"

import { useEffect, useRef, useState } from "react"

const REVEAL_BOTTOM_MARGIN = 40 // px above the bottom edge of the screen where reveals trigger
const REVEAL_TOP_MARGIN = 80    // px below the top edge (≈ navbar height) where elements count as gone
const REVEAL_HYSTERESIS = 24    // px of slack before a revealed element is hidden again

/**
 * Scroll reveal, reversible.
 * - `isVisible` flips to true the first time the element crosses the reveal line;
 *   components use it to swap `opacity-0` for a `reveal-*` animation class.
 * - Whenever the element leaves the screen: through the bottom or through the
 *   top: the hook sets `data-reveal="out"` on it: globals.css then plays the
 *   matching reveal animation backwards. Whenever it comes back, from either
 *   direction, the attribute is removed, which replays the reveal. So the
 *   animations run on every pass, whatever the scroll direction.
 *
 * Positions are read from layout offsets (offsetTop), which ignore CSS transforms.
 * An IntersectionObserver would see the element where the animation has moved it
 * (e.g. 100vw off-screen) and flip-flop between the two states.
 */
export function useScrollReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let raf = 0
    let shown = false

    const check = () => {
      raf = 0
      let top = -window.scrollY
      for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) {
        top += node.offsetTop
      }
      const inset = element.offsetHeight * threshold
      const bottom = top + element.offsetHeight
      const bottomLine = window.innerHeight - REVEAL_BOTTOM_MARGIN - inset
      const topLine = REVEAL_TOP_MARGIN + inset

      if (!shown && top < bottomLine && bottom > topLine) {
        shown = true
        element.removeAttribute("data-reveal")
        setIsVisible(true)
      } else if (shown && (top > bottomLine + REVEAL_HYSTERESIS || bottom < topLine - REVEAL_HYSTERESIS)) {
        shown = false
        element.setAttribute("data-reveal", "out")
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }

    check()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [threshold])

  return { ref, isVisible }
}
