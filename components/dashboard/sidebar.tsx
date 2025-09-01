"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, KeyRound, BarChart3, CreditCard, LifeBuoy, User } from "lucide-react"

const nav = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/api-keys", label: "API Keys", icon: KeyRound },
  { href: "/dashboard/usage", label: "Usage", icon: BarChart3 },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
  { href: "/dashboard/account", label: "Account", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:block w-64 border-r h-full">
      <div className="p-4 font-semibold">
        <Link href="/" className="text-xl">
          <span className="text-blue-600">Songs</span> API
        </Link>
      </div>
      <nav className="p-2 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded px-3 py-2 text-sm",
                active ? "bg-blue-600 text-white" : "hover:bg-slate-100 text-slate-700",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export function MobileBottomNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 border-t bg-background">
      <ul className="grid grid-cols-5">
        {nav.slice(0, 5).map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 text-xs",
                  active ? "text-blue-600" : "text-slate-600",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
