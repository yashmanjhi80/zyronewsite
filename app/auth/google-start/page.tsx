"use client"

import { useEffect } from "react"
import { GoogleAuthProvider, setPersistence, browserLocalPersistence, signInWithRedirect } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function GoogleStart() {
  useEffect(() => {
    const run = async () => {
      await setPersistence(auth, browserLocalPersistence)
      const provider = new GoogleAuthProvider()
      await signInWithRedirect(auth, provider)
    }
    run().catch((e) => {
      console.error("[v0] GoogleStart error", e)
    })
  }, [])
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <p className="text-sm text-muted-foreground">Redirecting to Google…</p>
    </main>
  )
}
