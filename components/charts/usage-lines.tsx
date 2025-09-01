"use client"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Point = { date: string; audio: number; video: number }

export function UsageLines({ data, title = "Requests over time" }: { data: Point[]; title?: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="audio"
                name="Audio"
                stroke="hsl(var(--chart-1, var(--primary)))"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="video"
                name="Video"
                stroke="hsl(var(--chart-2, var(--primary-foreground)))"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
