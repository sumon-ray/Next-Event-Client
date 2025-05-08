"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react"

export default function PasswordTips() {
  const tips = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      title: "Use a unique password",
      description: "Never reuse passwords across different accounts.",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      title: "Create a passphrase",
      description: "Consider using a memorable phrase with substitutions.",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: "Avoid personal information",
      description: "Don't use names, birthdays, or common words.",
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-blue-500" />,
      title: "Use a password manager",
      description: "Consider using a secure password manager to store your credentials.",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      {tips.map((tip, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex gap-3"
        >
          <div className="flex-shrink-0 mt-0.5">{tip.icon}</div>
          <div>
            <h4 className="text-sm font-medium text-gray-800">{tip.title}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{tip.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
