import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-teal-500 opacity-20" aria-hidden />
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-semibold text-balance">Zyronetworks APIs for creators</h1>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-600">
                Fast, reliable endpoints and usage analytics. Integrate in minutes, scale confidently.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/signup">Get started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Read the docs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Features built for speed</h2>
          <p className="mt-2 text-slate-600 max-w-xl">Everything you need to ship a high-performance bot experience.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Fast song search", desc: "Low-latency search with accurate results." },
              { title: "High-performance API", desc: "Optimized endpoints with generous rate limits." },
              { title: "Easy key management", desc: "Create, rotate, and revoke API keys in one place." },
              { title: "Usage analytics", desc: "Real-time charts, logs, and status insights." },
            ].map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Simple, transparent pricing</h2>
          <p className="mt-2 text-slate-600 max-w-xl">Start free. Upgrade as you scale.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Free",
                price: "Free/month",
                features: ["100 daily API requests", "2 daily video requests", "30 days validity"],
              },
              {
                name: "Basic",
                price: "₹49/month",
                features: ["2,000 daily API requests", "40 daily video requests", "30 days validity"],
              },
              {
                name: "Starter",
                price: "₹109/month",
                features: ["5,000 daily API requests", "100 daily video requests", "30 days validity"],
              },
              {
                name: "Standard",
                price: "₹219/month",
                features: ["10,000 daily API requests", "200 daily video requests", "30 days validity"],
                highlight: true, // Most Popular
              },
              {
                name: "Pro",
                price: "₹439/month",
                features: ["25,000 daily API requests", "500 daily video requests", "30 days validity"],
              },
              {
                name: "Business",
                price: "₹889/month",
                features: ["50,000 daily API requests", "1,000 daily video requests", "30 days validity"],
              },
              {
                name: "Enterprise",
                price: "₹1489/month",
                features: ["100,000 daily API requests", "2,000 daily video requests", "30 days validity"],
              },
              {
                name: "Ultra",
                price: "₹1889/month",
                features: ["150,000 daily API requests", "3,000 daily video requests", "30 days validity"],
              },
            ].map((plan) => (
              <Card key={plan.name} className={plan.highlight ? "border-blue-600" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {plan.highlight && (
                      <span className="text-xs bg-blue-600/15 text-blue-400 px-2 py-1 rounded">Most Popular</span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-2xl font-semibold">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/pricing">Choose {plan.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Logos / Testimonials */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Trusted by builders</h2>
          <p className="mt-2 text-slate-600 max-w-xl">From indie hackers to large Telegram communities.</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-slate-200/50 rounded" aria-hidden />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
