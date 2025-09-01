"use client"

import useSWR from "swr"
import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { saveUserDetailsToStorage, getUserDetailsFromStorage } from "@/lib/user-storage"

type UsageLog = {
  id: number
  apiKey: string
  date: string
  audio_requests: number
  video_requests: number
  remaining_audio: number
  remaining_video: number
}

export type UserDetailsResponse = {
  user?: {
    id: number
    apiKey: string
    gmail: string
    plan_name: string
    expiryDate: string
    // new fields from backend response
    status?: string
    currency?: string
    price?: number
    startDate?: string
    createdAt?: string
    updatedAt?: string
    lastUsed?: string | null
    userId?: string
    totalAll?: number
    totalAudio?: number
    totalVideo?: number
    maxDailyAudio?: number
    maxDailyVideo?: number
    [k: string]: any
  }
  usage_logs?: UsageLog[]
  error?: string
}

function encodeBase64Utf8(input: string) {
  try {
    return btoa(unescape(encodeURIComponent(input)))
  } catch {
    // fallback: best effort
    return btoa(input)
  }
}

const EXTERNAL_BASE = "http://test.zyronetworks.shop"
const fetcher = async (_key: string, token: string | null, gmail: string | null) => {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (token) headers["Authorization"] = `Bearer ${token}`

  const res = await fetch("/api/user-details", {
    method: "POST",
    headers,
    body: JSON.stringify({
      // If no token (or Admin not configured), the API will accept gmail or sereq
      gmail: gmail || undefined,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error || `Request failed with ${res.status}`)
  }
  return (await res.json()) as UserDetailsResponse
}

export function useUserDetails() {
  const [gmail, setGmail] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const cached = typeof window !== "undefined" ? getUserDetailsFromStorage() : null

  useEffect(() => {
    const unsub = auth.onIdTokenChanged(async (u) => {
      if (!u || !u.email) {
        setGmail(null)
        setToken(null)
        return
      }
      setGmail(u.email)
      const t = await u.getIdToken().catch(() => null)
      setToken(t)
    })
    return () => unsub()
  }, [])

  const shouldFetch = !!gmail || !!token
  const { data, error, isValidating, mutate } = useSWR<UserDetailsResponse>(
    shouldFetch ? ["user-details", token, gmail] : null,
    ([key, t, g]) => fetcher(key as string, (t as string) || null, (g as string) || null),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: (err) => {
        const msg = (err as Error)?.message || ""
        const is4xx =
          / 400\b/.test(msg) ||
          / 401\b/.test(msg) ||
          / 403\b/.test(msg) ||
          / 404\b/.test(msg) ||
          / 405\b/.test(msg) ||
          /Request failed with 4\d\d/.test(msg)
        return !is4xx
      },
      errorRetryCount: 2,
      errorRetryInterval: 8000,
      fallbackData: cached || undefined,
    },
  )

  useEffect(() => {
    if (data && !data.error) {
      saveUserDetailsToStorage(data)
    }
  }, [data])

  return {
    data,
    error,
    isLoading: shouldFetch && !data && !error && isValidating,
    isValidating,
    refresh: mutate,
    authed: !!gmail,
  }
}
