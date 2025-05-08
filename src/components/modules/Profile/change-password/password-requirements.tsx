"use client"

import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

interface PasswordRequirementsProps {
  password: string
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const requirements = [
    {
      id: "length",
      label: "At least 8 characters",
      check: (pwd: string) => pwd.length >= 8,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter (A-Z)",
      check: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter (a-z)",
      check: (pwd: string) => /[a-z]/.test(pwd),
    },
    {
      id: "number",
      label: "At least one number (0-9)",
      check: (pwd: string) => /[0-9]/.test(pwd),
    },
    {
      id: "special",
      label: "At least one special character (recommended)",
      check: (pwd: string) => /[^A-Za-z0-9]/.test(pwd),
      optional: true,
    },
  ]

  const getStatusIcon = (requirement: (typeof requirements)[0], password: string) => {
    if (!password) return <div className="h-5 w-5" />

    const passed = requirement.check(password)

    if (passed) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <CheckCircle className="h-5 w-5 text-green-500" />
        </motion.div>
      )
    }

    if (requirement.optional) {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }

    return <XCircle className="h-5 w-5 text-red-500" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-medium text-blue-800 flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
          Password Requirements
        </h4>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isExpanded ? "Hide" : "Show"}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="space-y-2">
          {requirements.map((requirement) => (
            <motion.li
              key={requirement.id}
              className={`flex items-center text-sm ${
                !password
                  ? "text-gray-600"
                  : requirement.check(password)
                    ? "text-green-700"
                    : requirement.optional
                      ? "text-yellow-700"
                      : "text-red-600"
              } transition-colors duration-300`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mr-2 flex-shrink-0">{getStatusIcon(requirement, password)}</div>
              <span>{requirement.label}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
