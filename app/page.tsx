"use client"

import { useState, useRef, useEffect } from "react"
import GitButtons from "@/components/git-buttons"
import CommitModal from "@/components/commit-modal"
import TerminalLog from "@/components/terminal-log"
import CommitGraph from "@/components/commit-graph"
import Link from "next/link"

interface LogEntry {
  command: string
  output: string
  timestamp: string
  success: boolean
}

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [commits, setCommits] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const logEndRef = useRef<HTMLDivElement>(null)

  const addLog = (command: string, output: string, success: boolean) => {
    const newLog: LogEntry = {
      command,
      output,
      timestamp: new Date().toLocaleTimeString(),
      success,
    }
    setLogs((prev) => [...prev, newLog])
  }

  const handleCommit = async (message: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/git/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const data = await response.json()
      addLog(`git commit -m "${message}"`, data.output, data.success)
      if (data.success) {
        fetchCommitHistory()
      }
    } catch (error) {
      addLog(`git commit -m "${message}"`, "Error: " + (error as Error).message, false)
    } finally {
      setIsLoading(false)
      setIsModalOpen(false)
    }
  }

  const handlePush = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/git/push", { method: "POST" })
      const data = await response.json()
      addLog("git push origin main", data.output, data.success)
    } catch (error) {
      addLog("git push origin main", "Error: " + (error as Error).message, false)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePull = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/git/pull", { method: "POST" })
      const data = await response.json()
      addLog("git pull origin main", data.output, data.success)
      if (data.success) {
        fetchCommitHistory()
      }
    } catch (error) {
      addLog("git pull origin main", "Error: " + (error as Error).message, false)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCommitHistory = async () => {
    try {
      const response = await fetch("/api/git/history")
      const data = await response.json()
      if (data.success) {
        setCommits(data.commits)
      }
    } catch (error) {
      console.error("Failed to fetch commit history:", error)
    }
  }

  useEffect(() => {
    fetchCommitHistory()
  }, [])

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Navigation */}
        <div className="border-b border-border pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">GitPro</h1>
            <p className="text-muted-foreground text-sm mt-1">Advanced Git Terminal with Interactive GUI</p>
          </div>
          {/* Navigation Link to Terminal Page */}
          <Link
            href="/terminal"
            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-border transition-colors"
          >
            Terminal
          </Link>
        </div>

        {/* Git Controls */}
        <GitButtons
          onCommit={() => setIsModalOpen(true)}
          onPush={handlePush}
          onPull={handlePull}
          isLoading={isLoading}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Terminal Log */}
          <div className="lg:col-span-2">
            <TerminalLog logs={logs} logEndRef={logEndRef} />
          </div>

          {/* Commit Graph */}
          <div className="lg:col-span-1">
            <CommitGraph commits={commits} />
          </div>
        </div>
      </div>

      {/* Commit Modal */}
      <CommitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCommit}
        isLoading={isLoading}
      />
    </main>
  )
}
