"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserDetailsResponse } from "@/hooks/use-user-details"

export function UsageTable({ rows }: { rows: NonNullable<UserDetailsResponse["usage_logs"]> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">Usage Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Audio</th>
                <th className="py-2 pr-4">Video</th>
                <th className="py-2 pr-4">Remaining Audio</th>
                <th className="py-2 pr-0">Remaining Video</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td className="py-4 text-muted-foreground" colSpan={5}>
                    No usage yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={`${r.id}-${r.date}`} className="border-b last:border-b-0">
                    <td className="py-2 pr-4">{r.date}</td>
                    <td className="py-2 pr-4">{r.audio_requests}</td>
                    <td className="py-2 pr-4">{r.video_requests}</td>
                    <td className="py-2 pr-4">{r.remaining_audio}</td>
                    <td className="py-2 pr-0">{r.remaining_video}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
