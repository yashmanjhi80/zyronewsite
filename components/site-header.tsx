"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="w-full bg-background border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl tracking-tight">
          <span className="text-blue-600">Zyro</span>networks
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm ${pathname === l.href ? "text-foreground" : "text-slate-600 hover:text-foreground"} transition-colors`}
            >
              {l.label}
            </Link>
          ))}
          {/* Updated Pricing link to point to dedicated page */}
          <Link href="/pricing" className="text-sm text-slate-600 hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="text-sm text-slate-600 hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
