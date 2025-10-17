"use client"

import type React from "react"

import { motion } from "framer-motion"

interface LogEntry {
  command: string
  output: string
  timestamp: string
  success: boolean
}

interface TerminalLogProps {
  logs: LogEntry[]
  logEndRef: React.RefObject<HTMLDivElement>
}

export default function TerminalLog({ logs, logEndRef }: TerminalLogProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">
            No commands executed yet. Use the buttons above to get started.
          </div>
        ) : (
          logs.map((log, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">[{log.timestamp}]</span>
                <span className={log.success ? "text-primary" : "text-secondary"}>$</span>
                <span className="text-foreground">{log.command}</span>
              </div>
              <div className={`pl-4 text-xs ${log.success ? "text-muted-foreground" : "text-secondary"}`}>
                {log.output}
              </div>
            </motion.div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}
