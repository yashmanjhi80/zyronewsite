"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaUsageChart } from "@/components/charts/area-usage"
import { useMemo } from "react"
import { useUserDetails } from "@/hooks/use-user-details"
import { UsageTable } from "@/components/dashboard/usage-table"

export default function UsagePage() {
  const { data, error, isLoading, authed } = useUserDetails()
  const logs = data?.usage_logs ?? []
  const user = data?.user

  const points = useMemo(() => {
    if (logs.length > 0) {
      return logs
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((r) => ({
          label: r.date,
          audio: r.audio_requests || 0,
          video: r.video_requests || 0,
          requests: (r.audio_requests || 0) + (r.video_requests || 0),
        }))
    }
    const audio = user?.totalAudio ?? 0
    const video = user?.totalVideo ?? 0
    const requests = user?.totalAll ?? audio + video
    const label = new Date().toISOString().slice(0, 10)
    return [{ label, audio, video, requests }]
  }, [logs, user?.totalAudio, user?.totalVideo, user?.totalAll])

  if (!authed) {
    return <div className="text-sm text-muted-foreground">Sign in to view your usage.</div>
  }
  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading…</div>
  }
  if (error || data?.error) {
    return <div className="text-sm text-red-500">{data?.error || (error as any)?.message || "Failed to load."}</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Requests over time</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaUsageChart points={points} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent logs</CardTitle>
        </CardHeader>
        <CardContent>
          <UsageTable rows={logs} />
        </CardContent>
      </Card>
    </div>
  )
}
