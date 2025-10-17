"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TerminalEntry {
  command: string
  output: string
  timestamp: string
  success: boolean
}

export default function TerminalPage() {
  const [entries, setEntries] = useState<TerminalEntry[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const executeCommand = async (command: string) => {
    if (!command.trim()) return

    setIsLoading(true)
    setInput("")
    setHistory((prev) => [...prev, command])
    setHistoryIndex(-1)

    try {
      const response = await fetch("/api/terminal/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      })
      const data = await response.json()

      const newEntry: TerminalEntry = {
        command,
        output: data.output,
        timestamp: new Date().toLocaleTimeString(),
        success: data.success,
      }
      setEntries((prev) => [...prev, newEntry])
    } catch (error) {
      const newEntry: TerminalEntry = {
        command,
        output: "Error: " + (error as Error).message,
        timestamp: new Date().toLocaleTimeString(),
        success: false,
      }
      setEntries((prev) => [...prev, newEntry])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const newIndex = historyIndex + 1
      if (newIndex < history.length) {
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [entries])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Navigation */}
        <div className="border-b border-border pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">GitPro Terminal</h1>
            <p className="text-muted-foreground text-sm mt-1">Execute any command directly</p>
          </div>
          <Link href="/" className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-border transition-colors">
            Dashboard
          </Link>
        </div>

        {/* macOS Terminal Style Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Terminal Header (macOS style) */}
          <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <span className="text-muted-foreground text-sm ml-4">gitpro — bash</span>
          </div>

          {/* Terminal Content */}
          <div className="bg-card p-6 font-mono text-sm h-96 overflow-y-auto space-y-3">
            {entries.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">
                <p>Welcome to GitPro Terminal</p>
                <p className="text-xs mt-2">Type any command and press Enter to execute</p>
              </div>
            ) : (
              entries.map((entry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <span className="text-foreground">{entry.command}</span>
                  </div>
                  <div
                    className={`pl-4 text-xs whitespace-pre-wrap break-words ${
                      entry.success ? "text-muted-foreground" : "text-secondary"
                    }`}
                  >
                    {entry.output}
                  </div>
                </motion.div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input */}
          <div className="bg-card border-t border-border px-6 py-4 flex items-center gap-2">
            <span className="text-primary">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Enter command..."
              className="flex-1 bg-transparent text-foreground outline-none placeholder-muted-foreground disabled:opacity-50"
            />
            {isLoading && <span className="text-primary animate-pulse">⟳</span>}
          </div>
        </motion.div>

        {/* Command Tips */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-primary mb-2">Quick Commands</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <code className="text-primary">git add .</code> - Stage all changes
            </div>
            <div>
              <code className="text-primary">git commit -m "msg"</code> - Create commit
            </div>
            <div>
              <code className="text-primary">git push</code> - Push to remote
            </div>
            <div>
              <code className="text-primary">git pull</code> - Pull from remote
            </div>
            <div>
              <code className="text-primary">git status</code> - Check status
            </div>
            <div>
              <code className="text-primary">git log</code> - View history
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
