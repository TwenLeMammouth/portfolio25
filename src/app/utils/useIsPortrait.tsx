
'use client'

import { useEffect, useState } from "react"

export function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null)

  useEffect(() => {
    const updateOrientation = () => {
      const isPortraitNow = window.innerHeight > window.innerWidth
      setIsPortrait(isPortraitNow)
    }

    // Sécurité : check si on est bien en client
    if (typeof window !== "undefined") {
      updateOrientation()
      window.addEventListener("resize", updateOrientation)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateOrientation)
      }
    }
  }, [])

  return isPortrait
}