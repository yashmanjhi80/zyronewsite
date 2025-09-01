"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { getRedirectResult, onAuthStateChanged } from "firebase/auth"

export default function RedirectAuthListener() {
  const router = useRouter()

  useEffect(() => {
    let unsub = () => {}

    async function init() {
      try {
        // Try to complete redirect result; it may be null if user already signed in.
        await getRedirectResult(auth).catch(() => {})
      } catch (_) {}
      // Route as soon as Firebase reports a signed-in user.
      unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.replace("/dashboard")
        }
      })
    }

    init()
    return () => unsub()
  }, [router])

  return null
}
