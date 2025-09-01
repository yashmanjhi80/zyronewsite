import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <div className="font-medium">How do I get an API key?</div>
            <div className="text-slate-600">Create one in Dashboard → API Keys.</div>
          </div>
          <div>
            <div className="font-medium">What are the rate limits?</div>
            <div className="text-slate-600">Depends on your plan. See Pricing or your plan details in Billing.</div>
          </div>
          <div>
            <div className="font-medium">Is there a free plan?</div>
            <div className="text-slate-600">Yes! Includes 1K requests per month.</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Your email" type="email" />
          <Textarea placeholder="How can we help?" />
          <Button className="bg-blue-600 hover:bg-blue-700">Send</Button>
        </CardContent>
      </Card>
    </div>
  )
}
