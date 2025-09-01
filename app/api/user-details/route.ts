import { type NextRequest, NextResponse } from "next/server"
import { getUserFromAuthHeader } from "@/lib/get-user-from-auth-header"

const EXTERNAL_BASE = "https://test.zyronetworks.shop"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    // Try to parse body, but don't require it
    const body = await req.json().catch(() => ({}) as any)
    let gmail: string | undefined
    let sereq: string | undefined = typeof body?.sereq === "string" ? body.sereq : undefined

    // Try Firebase Admin verification if available; ignore if not configured
    try {
      const { user } = await getUserFromAuthHeader(req.headers)
      if (user?.email) gmail = user.email
    } catch {
      // Admin not configured or missing token – continue with body fallback
    }

    // If not from token, accept gmail from body
    if (!gmail && typeof body?.gmail === "string") {
      gmail = body.gmail
    }

    // Ensure we have sereq
    if (!sereq) {
      if (!gmail) {
        return NextResponse.json(
          {
            error: "Missing credentials: provide Authorization with Firebase ID token, or include gmail/sereq in body",
          },
          { status: 400 },
        )
      }
      sereq = Buffer.from(gmail, "utf-8").toString("base64")
    }

    const res = await fetch(`${EXTERNAL_BASE}/user-details`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sereq }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json({ error: data?.error || "Upstream error", status: res.status }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, authorization",
    },
  })
}

export async function GET() {
  return new NextResponse(
    JSON.stringify({
      error: "Method Not Allowed. Use POST to fetch user details.",
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "POST, OPTIONS",
      },
    },
  )
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 405,
    headers: {
      Allow: "POST, OPTIONS",
    },
  })
}
