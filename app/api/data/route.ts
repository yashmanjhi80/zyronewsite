import { type NextRequest, NextResponse } from "next/server"
import { FieldValue } from "firebase-admin/firestore"
import { getAdminServices } from "@/lib/firebase-admin"
import { getUserFromRequest } from "@/lib/get-user-from-auth-header"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// POST /api/data -> create a submission for the authenticated user
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

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const docRef = await adminDb.collection("submissions").add({
    userId: user.uid,
    payload,
    createdAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ id: docRef.id, ok: true }, { status: 201 })
}

// GET /api/data -> list current user's submissions (basic pagination via limit)
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

  const { searchParams } = new URL(req.url)
  const limit = Math.min(Number(searchParams.get("limit") ?? 25), 100)

  const snap = await adminDb
    .collection("submissions")
    .where("userId", "==", user.uid)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get()

  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  return NextResponse.json({ items })
}
