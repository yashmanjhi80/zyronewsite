"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <>
      <div className="relative rounded border bg-card text-card-foreground overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{language}</span>
          <Button size="sm" variant="secondary" onClick={onCopy}>
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="p-4 text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </>
  )
}
