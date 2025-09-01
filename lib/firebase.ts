import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  type Auth,
} from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

let app: FirebaseApp
let auth: Auth
let db: Firestore

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCh20t0xSIAeGnxLdFYQZklIgQITdOg1D0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dark-dream-network.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dark-dream-network",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dark-dream-network.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "940030703815",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:940030703815:web:0a1d31a1bde5eed87d26e2",
  // measurementId optional; fallback provided
  ...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-J50NRG0GVX"
    ? { measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-J50NRG0GVX" }
    : {}),
}

if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

auth = getAuth(app)
// ensure session persists across reloads
setPersistence(auth, browserLocalPersistence).catch(() => {
  // intentionally swallow; UI will still work with default persistence
})
db = getFirestore(app)

// configure a shared provider instance with friendly prompt
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: "select_account" })

/**
 * Try popup first; if popup blocked or cancelled, fall back to redirect.
 * keep popup in iframe contexts using browserPopupRedirectResolver, auto-fallback to redirect.
 */
export async function signInWithGoogle() {
  try {
    return await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver)
  } catch (e: any) {
    if (e?.code === "auth/popup-blocked" || e?.code === "auth/cancelled-popup-request") {
      await signInWithRedirect(auth, googleProvider)
      return
    }
    throw e
  }
}

/**
 * Dedicated redirect-based Google sign-in helper to avoid popup/COOP issues
 */
export async function signInWithGoogleRedirect() {
  return await signInWithRedirect(auth, googleProvider)
}

export { app, auth, db, GoogleAuthProvider, googleProvider }
