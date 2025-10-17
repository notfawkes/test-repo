"use client"

import { motion } from "framer-motion"

interface Commit {
  hash: string
  message: string
  author: string
  date: string
}

interface CommitGraphProps {
  commits: Commit[]
}

export default function CommitGraph({ commits }: CommitGraphProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold text-primary mb-4">Recent Commits</h3>

      {commits.length === 0 ? (
        <div className="text-muted-foreground text-center py-8 text-sm">No commits yet</div>
      ) : (
        <div className="space-y-3">
          {commits.map((commit, idx) => (
            <motion.div
              key={commit.hash}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex gap-3 pb-3 border-b border-border last:border-b-0"
            >
              {/* Commit dot */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-1"
              />

              {/* Commit info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-primary truncate">{commit.hash.substring(0, 7)}</p>
                <p className="text-xs text-foreground truncate">{commit.message}</p>
                <p className="text-xs text-muted-foreground">
                  {commit.author} • {commit.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
