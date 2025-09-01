import { getApps, initializeApp, cert, type App } from "firebase-admin/app"
import { getAuth, type Auth } from "firebase-admin/auth"
import { getFirestore, type Firestore } from "firebase-admin/firestore"
import "server-only"

let cachedApp: App | null = null

function ensureAdminApp(): App | null {
  if (cachedApp) return cachedApp
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    if (!projectId || !clientEmail || !privateKey) {
      // Return null instead of throwing so build doesn’t crash
      return null
    }

    if (!getApps().length) {
      cachedApp = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      })
    } else {
      cachedApp = getApps()[0]!
    }
    return cachedApp
  } catch {
    // Fail safe: don’t throw at import/build time
    return null
  }
}

export function getAdminServices(): { adminApp: App; adminAuth: Auth; adminDb: Firestore } | null {
  const app = ensureAdminApp()
  if (!app) return null
  return {
    adminApp: app,
    adminAuth: getAuth(app),
    adminDb: getFirestore(app),
  }
}
