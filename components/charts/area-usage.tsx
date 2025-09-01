"use client"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"

type UsagePoint = { label: string; requests?: number; audio?: number; video?: number }

export function AreaUsageChart({ points }: { points?: UsagePoint[] }) {
  const data = Array.isArray(points) ? points : []
  const hasAudio = data.some((d) => typeof d.audio === "number")
  const hasVideo = data.some((d) => typeof d.video === "number")
  const hasTotal = data.some((d) => typeof d.requests === "number")

  if (!data.length) {
    return <div className="h-56 grid place-items-center text-sm text-muted-foreground">No data</div>
  }

  return (
    <div className="h-48 md:h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="usage-audio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--color-primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--color-primary))" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="usage-video" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--color-muted-foreground))" stopOpacity={0.6} />
              <stop offset="95%" stopColor="hsl(var(--color-muted-foreground))" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="usage-total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--color-foreground))" stopOpacity={0.7} />
              <stop offset="95%" stopColor="hsl(var(--color-foreground))" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 16% 47% / 0.15)" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--color-muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--color-muted-foreground))", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--color-popover))",
              color: "hsl(var(--color-popover-foreground))",
              border: "1px solid hsl(var(--color-border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          {hasAudio && (
            <Area
              type="monotone"
              dataKey="audio"
              name="Audio"
              stroke="hsl(var(--color-primary))"
              fill="url(#usage-audio)"
            />
          )}
          {hasVideo && (
            <Area
              type="monotone"
              dataKey="video"
              name="Video"
              stroke="hsl(var(--color-muted-foreground))"
              fill="url(#usage-video)"
            />
          )}
          {!hasAudio && !hasVideo && hasTotal && (
            <Area
              type="monotone"
              dataKey="requests"
              name="Total"
              stroke="hsl(var(--color-foreground))"
              fill="url(#usage-total)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
