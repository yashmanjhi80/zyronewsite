export type UserDetailsPayload = {
  user?: {
    id?: number
    apiKey?: string
    gmail?: string
    plan_name?: string
    expiryDate?: string
    [k: string]: unknown
  }
  usage_logs?: Array<{
    id?: number
    apiKey?: string
    date?: string
    audio_requests?: number
    video_requests?: number
    remaining_audio?: number
    remaining_video?: number
    [k: string]: unknown
  }>
}

const KEY = "songsapi:userDetails"

export function saveUserDetailsToStorage(data: UserDetailsPayload) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {}
}

export function getUserDetailsFromStorage(): UserDetailsPayload | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as UserDetailsPayload) : null
  } catch {
    return null
  }
}
