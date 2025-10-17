"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CommitModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (message: string) => void
  isLoading: boolean
}

export default function CommitModal({ isOpen, onClose, onSubmit, isLoading }: CommitModalProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit()
    }
    if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-card border border-border rounded-lg p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-foreground mb-4">Create Commit</h2>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter commit message..."
                disabled={isLoading}
                className="w-full h-24 bg-input border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50"
              />

              <p className="text-xs text-muted-foreground mt-2">Tip: Press Ctrl+Enter to submit, Esc to cancel</p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-border transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !message.trim()}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-semibold"
                >
                  {isLoading ? "Committing..." : "Commit"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
