import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 space-y-8">
          <div>
            <h1 className="text-3xl font-semibold">Contact us</h1>
            <p className="text-slate-600 mt-2">We typically respond within 1 business day.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input placeholder="Your name" />
                <Input placeholder="Your email" type="email" />
              </div>
              <Textarea placeholder="How can we help?" rows={6} />
              <Button className="bg-blue-600 hover:bg-blue-700 w-fit">Send</Button>
            </CardContent>
          </Card>

          <div className="text-sm text-slate-600">
            <div>Business email: hello@songsapi.dev</div>
            <div>Twitter: @songsapi</div>
            <div>Telegram: t.me/songsapi</div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
