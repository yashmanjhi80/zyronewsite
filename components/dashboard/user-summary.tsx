"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UserDetailsResponse } from "@/hooks/use-user-details"

function formatDate(date?: string) {
  if (!date) return "—"
  try {
    return new Date(date).toLocaleString()
  } catch {
    return date
  }
}

export function UserSummary({ user }: { user: NonNullable<UserDetailsResponse["user"]> }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-pretty">Account</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {user.plan_name || "Unknown Plan"}
          </Badge>
          {user.status && <Badge className="text-xs">{user.status}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Email</span>
          <span className="font-medium">{user.gmail}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">API Key</span>
          <span className="font-mono text-xs">{user.apiKey}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Audio (used / daily)</span>
          <span className="font-medium">
            {(user.totalAudio ?? 0).toLocaleString()} / {(user.maxDailyAudio ?? 0).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Video (used / daily)</span>
          <span className="font-medium">
            {(user.totalVideo ?? 0).toLocaleString()} / {(user.maxDailyVideo ?? 0).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Plan price</span>
          <span className="font-medium">{user.price != null ? `${user.currency ?? ""} ${user.price}` : "—"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Starts</span>
          <span className="font-medium">{formatDate(user.startDate)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Expires</span>
          <span className="font-medium">{formatDate(user.expiryDate)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
