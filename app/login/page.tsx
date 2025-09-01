"use client"
import { useState, useEffect } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import {
  signInWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { signInWithGoogle } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    let active = true
    let unsubscribe = () => {}
    ;(async () => {
      try {
        const inIframe = typeof window !== "undefined" && window.self !== window.top
        await setPersistence(auth, inIframe ? inMemoryPersistence : browserLocalPersistence)
      } catch (_err) {
        // fallback silently; Firebase will still function with default persistence
      }

      // subscribe after persistence is set
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!active) return
        if (user) {
          router.replace("/dashboard")
        }
      })

      try {
        const result = await getRedirectResult(auth)
        if (!active || !result) return
        if (result.user) {
          router.replace("/dashboard")
        }
      } catch (err: any) {
        const code = err?.code as string | undefined
        const description =
          code === "auth/unauthorized-domain"
            ? "This domain isn't authorized in Firebase Auth. Add your preview/deployment domain in Authorized domains."
            : err?.message || "Please try again."
        toast({ title: "Google sign-in failed", description, variant: "destructive" })
      }
    })()

    return () => {
      active = false
      try {
        unsubscribe()
      } catch {}
    }
  }, [router, toast])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.replace("/dashboard")
    } catch (err: any) {
      toast({ title: "Sign in failed", description: err?.message || "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function onGoogle() {
    setLoading(true)
    try {
      await signInWithGoogle()
      // if popup succeeds, auth state listener will route to /dashboard
    } catch (err: any) {
      // if the helper fell back to redirect, getRedirectResult will handle post-return
      const code = err?.code as string | undefined
      const description =
        code === "auth/unauthorized-domain"
          ? "This domain isn't authorized in Firebase Auth. Add your preview/deployment domain in Authorized domains."
          : err?.message || "Please try again."
      toast({
        title: "Google sign-in failed",
        description,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh grid place-items-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Welcome back to Zyronetworks</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button
            variant="outline"
            onClick={onGoogle}
            aria-label="Continue with Google"
            disabled={loading}
            type="button"
          >
            Continue with Google
          </Button>
          <div className="text-center text-xs text-slate-600">or</div>
          <form className="grid gap-3" onSubmit={onSubmit} aria-live="polite">
            <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              type="password"
              placeholder="Password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="bg-blue-600 hover:bg-blue-700" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="text-sm">
            <Link href="/reset-password" className="text-slate-600 hover:text-foreground">
              Forgot password?
            </Link>
          </div>
          <div className="text-sm text-slate-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
