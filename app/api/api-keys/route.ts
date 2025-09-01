import { type NextRequest, NextResponse } from "next/server"
import { FieldValue } from "firebase-admin/firestore"
import { getAdminServices } from "@/lib/firebase-admin"
import { getUserFromRequest } from "@/lib/get-user-from-auth-header"
import { randomBytes, createHash } from "crypto"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function generateKey() {
  // sk_live_ + 48 hex chars (~192 bits)
  return `sk_live_${randomBytes(24).toString("hex")}`
}

function sha256(input: string) {
  return createHash("sha256").update(input).digest("hex")
}

// GET /api/api-keys -> list user's keys (no plaintext)
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const services = getAdminServices()
  if (!services) {
    return NextResponse.json({ error: "Server misconfigured (Firebase Admin not initialized)" }, { status: 500 })
  }
  const { adminDb } = services

  const col = adminDb.collection("users").doc(user.uid).collection("apiKeys")
  const snap = await col.orderBy("createdAt", "desc").get()
  const items = snap.docs.map((d) => d.data())
  return NextResponse.json({ items })
}

// POST /api/api-keys -> create new key; returns plaintext once
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const services = getAdminServices()
  if (!services) {
    return NextResponse.json({ error: "Server misconfigured (Firebase Admin not initialized)" }, { status: 500 })
  }
  const { adminDb } = services

  const { name = "Default" } = await req.json().catch(() => ({}) as any)

  const plaintext = generateKey()
  const hash = sha256(plaintext)
  const last4 = plaintext.slice(-4)

  const col = adminDb.collection("users").doc(user.uid).collection("apiKeys")

  const doc = {
    id: hash, // use hash as the id
    name,
    hash,
    last4,
    createdAt: FieldValue.serverTimestamp(),
    active: true,
  }

  await col.doc(hash).set(doc)
  return NextResponse.json({ key: plaintext, meta: { name, last4, active: true } }, { status: 201 })
}
