"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { onAuthStateChanged } from "firebase/auth"
import { useRouter, usePathname } from "next/navigation"
import { auth } from "@/lib/firebase"

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const isDashboard = pathname?.startsWith("/dashboard")
      if (isDashboard && !user) {
        router.replace("/login")
      } else {
        setReady(true)
      }
    })
    return () => unsub()
  }, [router, pathname])

  if (!ready) {
    return (
      <div className="grid place-items-center p-8">
        <div
          className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent"
          aria-label="Loading"
        />
      </div>
    )
  }

  return <>{children}</>
}
