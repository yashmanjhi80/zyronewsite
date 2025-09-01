import type React from "react"
import { Sidebar, MobileBottomNav } from "@/components/dashboard/sidebar"
import { AuthGate } from "@/components/auth/auth-gate"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid md:grid-cols-[16rem_1fr]">
      <Sidebar />
      <AuthGate>
        <div className="flex flex-col">
          <header className="border-b px-4 py-3">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </header>
          <main className="flex-1 p-4 pb-16 md:pb-4">{children}</main>
        </div>
      </AuthGate>
      <MobileBottomNav />
    </div>
  )
}
