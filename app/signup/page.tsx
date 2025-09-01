"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, GoogleAuthProvider } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.replace("/dashboard")
    } catch (err: any) {
      toast({ title: "Sign up failed", description: err?.message || "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function onGoogle() {
    setLoading(true)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      router.replace("/dashboard")
    } catch (err: any) {
      toast({
        title: "Google sign-in failed",
        description: err?.message || "Please try again.",
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
          <CardTitle>Create account</CardTitle>
          <CardDescription>Start building with Songs API</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button variant="outline" onClick={onGoogle} aria-label="Continue with Google" disabled={loading}>
            Continue with Google
          </Button>
          <div className="text-center text-xs text-slate-600">or</div>
          <form className="grid gap-3" onSubmit={onSubmit} aria-live="polite">
            <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              type="password"
              placeholder="Password (min 6 chars)"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="bg-blue-600 hover:bg-blue-700" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>
          <div className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
