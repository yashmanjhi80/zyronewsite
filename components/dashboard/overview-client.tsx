"use client"

import { useMemo } from "react"
import { useUserDetails } from "@/hooks/use-user-details"
import { UserSummary } from "@/components/dashboard/user-summary"
import { UsageTable } from "@/components/dashboard/usage-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaUsageChart } from "@/components/charts/area-usage"

export function OverviewClient() {
  const { data, error, isLoading, authed } = useUserDetails()
  const user = data?.user
  const logs = data?.usage_logs ?? []

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
    // Fallback from user totals (when usage_logs is empty)
    const audio = user?.totalAudio ?? 0
    const video = user?.totalVideo ?? 0
    const requests = user?.totalAll ?? audio + video
    const label = new Date().toISOString().slice(0, 10)
    return [{ label, audio, video, requests }]
  }, [logs, user?.totalAudio, user?.totalVideo, user?.totalAll])

  const today = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10)
    const r = logs.find((x) => x?.date === todayStr)
    const audio = (r?.audio_requests ?? null) !== null ? (r?.audio_requests ?? 0) : (user?.totalAudio ?? 0)
    const video = (r?.video_requests ?? null) !== null ? (r?.video_requests ?? 0) : (user?.totalVideo ?? 0)
    const requests = (r ? audio + video : (user?.totalAll ?? audio + video)) as number
    const remainingAudio = Math.max(0, (user?.maxDailyAudio ?? 0) - audio)
    const remainingVideo = Math.max(0, (user?.maxDailyVideo ?? 0) - video)
    return { audio, video, requests, remainingAudio, remainingVideo }
  }, [logs, user?.totalAudio, user?.totalVideo, user?.totalAll, user?.maxDailyAudio, user?.maxDailyVideo])

  if (!authed) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-muted-foreground">
          Sign in to view your account details and usage.
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-muted-foreground">Loading your details…</CardContent>
      </Card>
    )
  }

  if (error || data?.error) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-red-500">
          {data?.error || (error as any)?.message || "Failed to load your details."}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today Total Requests", value: today.requests.toLocaleString() },
          { label: "Today Audio Requests", value: today.audio.toLocaleString() },
          { label: "Today Video Requests", value: today.video.toLocaleString() },
          { label: "Plan", value: user?.plan_name || "—" },
        ].map((s) => (
          <Card key={s.label}>
            <CardHeader className="py-3">
              <CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xl font-semibold">{s.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* Real chart */}
      <Card>
        <CardHeader>
          <CardTitle>Requests over time</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaUsageChart points={points} />
        </CardContent>
      </Card>

      {/* Summary and Logs */}
      <div className="grid gap-6">
        {user && <UserSummary user={user} />}
        <UsageTable rows={logs} />
      </div>
    </div>
  )
}
