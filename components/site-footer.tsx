import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="font-semibold text-lg">
            <span className="text-blue-600">Songs</span> API
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Easily integrate song search and streaming metadata into your Telegram bots.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Product</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#features" className="text-slate-600 hover:text-foreground">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="text-slate-600 hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/docs" className="text-slate-600 hover:text-foreground">
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="text-slate-600 hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-slate-600 hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-slate-600 hover:text-foreground">
                Terms
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Account</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/login" className="text-slate-600 hover:text-foreground">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-slate-600 hover:text-foreground">
                Create account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600">
          © {new Date().getFullYear()} Songs API. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
