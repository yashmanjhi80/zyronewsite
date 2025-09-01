"use client"

import { useEffect } from "react"
import { getRedirectResult, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function GoogleCallback() {
  const router = useRouter()
  useEffect(() => {
    let unsub = () => {}
    ;(async () => {
      try {
        await getRedirectResult(auth)
      } catch (e) {
        console.error("[v0] getRedirectResult error", e)
      } finally {
        unsub = onAuthStateChanged(auth, (u) => {
          if (u) {
            router.replace("/dashboard")
          }
        })
      }
    })()
    return () => unsub()
  }, [router])
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <p className="text-sm text-muted-foreground">Finalizing sign-in…</p>
    </main>
  )
}
