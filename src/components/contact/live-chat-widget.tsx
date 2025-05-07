"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Send, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LiveChatWidgetProps {
  onClose: () => void
}

interface Message {
  id: number
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

export default function LiveChatWidget({ onClose }: LiveChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi there! How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate agent typing
    setIsTyping(true)

    // Simulate agent response after delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: messages.length + 2,
        text: getAgentResponse(inputValue),
        sender: "agent",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 1000) // Reduced delay
  }

  const getAgentResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase()

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I assist you today?"
    } else if (lowerCaseMessage.includes("help")) {
      return "I'd be happy to help. Could you please provide more details about what you need assistance with?"
    } else if (
      lowerCaseMessage.includes("contact") ||
      lowerCaseMessage.includes("email") ||
      lowerCaseMessage.includes("phone")
    ) {
      return "You can reach our team at contact@company.com or call us at +1 (555) 123-4567 during business hours."
    } else if (
      lowerCaseMessage.includes("location") ||
      lowerCaseMessage.includes("address") ||
      lowerCaseMessage.includes("office")
    ) {
      return "Our office is located at 123 Business Avenue, San Francisco, CA 94107. Feel free to visit us!"
    } else if (lowerCaseMessage.includes("hours") || lowerCaseMessage.includes("open")) {
      return "Our business hours are Monday to Friday, 9am to 5pm. We're closed on weekends."
    } else {
      return "Thank you for your message. One of our team members will get back to you shortly with more information."
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden"
    >
      {/* Chat header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Live Support</h3>
            <p className="text-xs text-blue-100">We typically reply in a few minutes</p>
          </div>
        </div>
        <button onClick={onClose} className="bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Chat messages - simplified animations */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "agent" && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-blue-100 text-blue-600">CS</AvatarFallback>
              </Avatar>
            )}

            <div
              className={`max-w-[80%] ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"} rounded-2xl px-4 py-2 shadow-sm`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                {formatTime(message.timestamp)}
              </p>
            </div>

            {message.sender === "user" && (
              <Avatar className="h-8 w-8 ml-2">
                <AvatarFallback className="bg-blue-600 text-white">ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center mb-4">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-blue-100 text-blue-600">CS</AvatarFallback>
            </Avatar>

            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 mr-2"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
