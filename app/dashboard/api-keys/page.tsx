"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useUserDetails } from "@/hooks/use-user-details"

export default function ApiKeysPage() {
  const { data, error, isLoading, authed } = useUserDetails()
  const { toast } = useToast()
  const [hidden, setHidden] = useState(true)

  if (!authed) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-muted-foreground">Sign in to view your API key.</CardContent>
      </Card>
    )
  }
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-muted-foreground">Loading…</CardContent>
      </Card>
    )
  }
  if (error || data?.error) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-red-500">
          {data?.error || (error as any)?.message || "Failed to load."}
        </CardContent>
      </Card>
    )
  }

  const apiKey = data?.user?.apiKey || ""
  const maskedApiKey = apiKey ? apiKey.slice(0, 6) + "••••••••••••••••" + apiKey.slice(-4) : ""

  function copyApiKey() {
    if (!apiKey) return
    navigator.clipboard.writeText(apiKey)
    toast({ title: "Copied to clipboard" })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your API Key</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Input readOnly value={hidden ? maskedApiKey : apiKey} aria-label="Your API key" />
          <Button variant="outline" onClick={() => setHidden((v) => !v)}>
            {hidden ? "Show" : "Hide"}
          </Button>
          <Button onClick={copyApiKey}>Copy</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to use</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Include this key in the x-api-key header when calling the API.
        </CardContent>
      </Card>
    </div>
  )
}
