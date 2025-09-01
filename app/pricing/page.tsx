import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const plans = [
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
    badge: "Most Popular",
    features: ["10,000 daily API requests", "200 daily video requests", "30 days validity"],
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
]

export default function PricingPage() {
  return (
    <main className="container mx-auto max-w-6xl py-10">
      <header className="mb-8 text-center">
        <h1 className="text-balance text-3xl font-semibold">Simple, scalable pricing</h1>
        <p className="mt-2 text-muted-foreground">Choose a plan that fits your usage. Upgrade or downgrade anytime.</p>
      </header>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {plans.map((p) => (
          <Card key={p.name} className={p.badge ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{p.name}</CardTitle>
                {p.badge ? (
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{p.badge}</span>
                ) : null}
              </div>
              <div className="mt-2 text-2xl">{p.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Button className="w-full">Subscribe</Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
