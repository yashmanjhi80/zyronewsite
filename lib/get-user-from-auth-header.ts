import type { NextRequest } from "next/server"
import { getAdminServices } from "./firebase-admin"

// Verify Firebase ID token from Authorization header and return normalized result
export async function getUserFromAuthHeader(headers: Headers) {
  const authHeader = headers.get("authorization") || headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Missing Authorization header", status: 401 } as const
  }
  const token = authHeader.slice("Bearer ".length)

  const services = getAdminServices()
  if (!services) {
    return { error: "Server misconfigured (Firebase Admin not initialized)", status: 500 } as const
  }

  try {
    const decoded = await services.adminAuth.verifyIdToken(token)
    return { user: { uid: decoded.uid, email: decoded.email ?? null } } as const
  } catch (err) {
    return { error: "Invalid or expired token", status: 401 } as const
  }
}

// Backwards-compatible helper that returns just user|null (used by older code)
export async function getUserFromRequest(req: NextRequest) {
  const res = await getUserFromAuthHeader(req.headers)
  return "user" in res ? res.user : null
}
