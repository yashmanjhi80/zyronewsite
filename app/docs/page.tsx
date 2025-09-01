import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CodeBlock } from "@/components/docs/code-block"

const nav = [
  { href: "#intro", label: "Introduction" },
  { href: "#auth", label: "Authentication" },
  { href: "#audio", label: "Get Audio (MP3)" },
  { href: "#video", label: "Get Video (MP4)" },
  { href: "#notes", label: "Notes" },
]

export default function DocsPage() {
  const curlAuth = `curl -H "x-api-key: <your_api_key>" \\
  "https://api.songs.example.com/audio/dQw4w9WgXcQ"`

  const errorJson = `{
  "status": "error",
  "message": "Invalid or expired API key"
}`

  const audioSuccess = `{
  "status": "success",
  "audio_url": "<base64_encoded_download_url>"
}`

  const audioProgress = `{
  "status": "downloading",
  "progress": 42.7,
  "cookies": "<base64_encoded_cookie_file>",
  "video_id": "dQw4w9WgXcQ"
}`

  const audioError = `{
  "status": "error",
  "message": "Some error details"
}`

  const videoSuccess = `{
  "status": "success",
  "video_sd": "<base64_encoded_download_url>"
}`

  const videoProgress = `{
  "status": "downloading",
  "progress": 65.3,
  "cookies": "<base64_encoded_cookie_file>",
  "video_id": "dQw4w9WgXcQ"
}`

  const videoError = `{
  "status": "error",
  "message": "Some error details"
}`

  const jsDecode = `// decode base64-encoded URLs in the browser
const decoded = atob("<base64_encoded_download_url>");
console.log(decoded); // usable https://... link`

  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-8">
          <aside className="md:sticky md:top-4 h-fit">
            <div className="font-semibold mb-3">Docs</div>
            <nav className="space-y-2 text-sm">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="block text-slate-600 hover:text-foreground">
                  {n.label}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="prose prose-slate max-w-none">
            <h1 id="intro">API Documentation</h1>
            <p>Download YouTube Audio (MP3) and Video (MP4 up to 4K) with ease.</p>

            <h2 id="auth">Authentication</h2>
            <p>
              Every request must include a valid API key in the <code>x-api-key</code> header.
            </p>
            <CodeBlock language="bash" code={curlAuth} />
            <p>If the key is missing, invalid, or expired, the API will respond with:</p>
            <CodeBlock language="json" code={errorJson} />

            <h2 id="audio">Get Audio (MP3)</h2>
            <p>
              <strong>GET</strong> <code>/audio/&lt;video_id&gt;</code>
            </p>
            <p>Starts or fetches the download of a YouTube video’s audio track in MP3 (192 kbps) format.</p>
            <p className="mt-4">Success Response (already downloaded):</p>
            <CodeBlock language="json" code={audioSuccess} />
            <p>In Progress Response:</p>
            <CodeBlock language="json" code={audioProgress} />
            <p>Error Response:</p>
            <CodeBlock language="json" code={audioError} />

            <h2 id="video">Get Video (MP4)</h2>
            <p>
              <strong>GET</strong> <code>/beta/&lt;video_id&gt;</code>
            </p>
            <p>Starts or fetches the download of a YouTube video in MP4 format (up to 4K).</p>
            <p className="mt-4">Success Response (already downloaded):</p>
            <CodeBlock language="json" code={videoSuccess} />
            <p>In Progress Response:</p>
            <CodeBlock language="json" code={videoProgress} />
            <p>Error Response:</p>
            <CodeBlock language="json" code={videoError} />

            <h2 id="notes">Notes</h2>
            <ul>
              <li>
                <code>audio_url</code> and <code>video_sd</code> values are base64-encoded URLs. You must decode them
                before use.
              </li>
              <li>
                <code>cookies</code> is a base64-encoded cookie file for client-side fallback downloads.
              </li>
              <li>Polling an endpoint multiple times will update the progress field until the download is complete.</li>
            </ul>
            <p>Client-side base64 decode example:</p>
            <CodeBlock language="js" code={jsDecode} />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
