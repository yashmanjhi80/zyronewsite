"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

export default function AccountPage() {
  const [name, setName] = useState("Alex Developer")
  const [email, setEmail] = useState("alex@example.com")

  useEffect(() => {
    const u = auth.currentUser
    if (u) {
      setName(u.displayName || "")
      setEmail(u.email || "")
    }
  }, [])

  async function onLogout() {
    await signOut(auth)
    window.location.href = "/"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 max-w-md">
          <label className="text-sm">
            Name
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="text-sm">
            Email
            <Input className="mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <Button className="bg-blue-600 hover:bg-blue-700 w-fit">Save changes</Button>
        </CardContent>
      </Card>

      <Button variant="destructive" className="w-fit" onClick={onLogout}>
        Log out
      </Button>
    </div>
  )
}
