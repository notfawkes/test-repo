"use client"

import { motion } from "framer-motion"

interface GitButtonsProps {
  onCommit: () => void
  onPush: () => void
  onPull: () => void
  isLoading: boolean
}

export default function GitButtons({ onCommit, onPush, onPull, isLoading }: GitButtonsProps) {
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 20px rgba(0, 209, 178, 0.5)" },
    tap: { scale: 0.95 },
  }

  return (
    <div className="flex gap-4 flex-wrap">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onCommit}
        disabled={isLoading}
        className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Commit
      </motion.button>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onPush}
        disabled={isLoading}
        className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Push
      </motion.button>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onPull}
        disabled={isLoading}
        className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Pull
      </motion.button>
    </div>
  )
}
