import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/get-user-from-auth-header"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  return NextResponse.json({ valid: true, uid: user.uid, email: user.email })
}
