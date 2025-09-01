"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUserDetails } from "@/hooks/use-user-details"

export default function BillingPage() {
  const { data, error, isLoading, authed } = useUserDetails()

  if (!authed) {
    return <div className="text-sm text-muted-foreground">Sign in to view billing.</div>
  }
  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading…</div>
  }
  if (error || data?.error) {
    return <div className="text-sm text-red-500">{data?.error || (error as any)?.message || "Failed to load."}</div>
  }

  const plan = data?.user?.plan_name || "—"
  const expiry = data?.user?.expiryDate || "—"
  const price = data?.user?.price != null ? `${data?.user?.currency ?? ""} ${data?.user?.price}` : undefined
  const status = data?.user?.status || undefined
  const start = data?.user?.startDate || undefined

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-xl font-semibold">{plan}</div>
          {price && <div className="text-sm">Price: {price}</div>}
          {status && <div className="text-sm">Status: {status}</div>}
          {start && <div className="text-sm">Started: {new Date(start).toLocaleString()}</div>}
          <div className="text-muted-foreground text-sm">Renews / expires: {new Date(expiry).toLocaleString()}</div>
          <Button className="bg-blue-600 hover:bg-blue-700">Manage plan</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing history</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">No invoices yet.</CardContent>
      </Card>
    </div>
  )
}
