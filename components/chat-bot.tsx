"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"

interface Message {
  type: "user" | "bot" | "typing" | "connecting"
  content: string
  timestamp: Date
  agentName?: string
}

// List of agent names for randomization
const agentNames = [
  "Sarah Thompson",
  "Michael Chen",
  "Emma Rodriguez",
  "David Kim",
  "Rachel Foster",
  "James Wilson",
  "Sophia Patel",
  "Alex Morgan",
  "Lisa Zhang",
  "Marcus Johnson"
]

const MAX_MESSAGES = 40

export default function Chatbot() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "👋 Hi! How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [currentAgent, setCurrentAgent] = useState("")
  const [isAgentConnected, setIsAgentConnected] = useState(false)

  const setMessagesCapped = useCallback((updater: (prev: Message[]) => Message[]) => {
    setMessages((prev) => {
      const next = updater(prev)
      if (next.length <= MAX_MESSAGES) return next
      return next.slice(next.length - MAX_MESSAGES)
    })
  }, [])

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getRandomAgent = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * agentNames.length)
    return agentNames[randomIndex]
  }, [])

  const formatResponse = (response: string) => {
    // Don't format greetings, short responses, or simple answers
    if (
      response.length < 100 || // Short responses
      response.startsWith("Hi") ||
      response.startsWith("Hello") ||
      response.startsWith("Thanks") ||
      response.startsWith("Thank you") ||
      response.startsWith("Sure") ||
      response.startsWith("Yes") ||
      response.startsWith("No") ||
      !response.includes(".") // Single sentence responses
    ) {
      return response;
    }

    // If the response is very long (> 300 characters), try to structure it
    if (response.length > 300) {
      // Split into paragraphs first
      const paragraphs = response.split(/\n\n|\r\n\r\n/);
      
      // If it's a single long paragraph, split by topics
      if (paragraphs.length === 1) {
        const topics = response.split(/\. (?=[A-Z])/);
        
        // Group related sentences into sections
        const sections: string[] = [];
        let currentSection = "";
        
        topics.forEach((topic, index) => {
          // Add period if it was removed by split
          const topicText = topic.endsWith(".") ? topic : topic + ".";
          
          // Start new section for key indicators
          const startNewSection = 
            topicText.includes("offer") ||
            topicText.includes("provide") ||
            topicText.includes("solution") ||
            topicText.includes("product") ||
            topicText.includes("service") ||
            topicText.toLowerCase().includes("what sets us apart") ||
            topicText.includes("expertise");
          
          if (startNewSection && currentSection) {
            sections.push(currentSection.trim());
            currentSection = topicText;
          } else {
            currentSection += " " + topicText;
          }
          
          // Push last section
          if (index === topics.length - 1 && currentSection) {
            sections.push(currentSection.trim());
          }
        });
        
        // Format sections with bullets for better readability
        return sections
          .map((section, index) => {
            // Keep first section (usually introduction) as is
            if (index === 0) return section;
            // Format other sections with bullets
            return `\n• ${section}`;
          })
          .join("\n");
      }
    }

    // For shorter responses or when the above structuring isn't applicable
    // Check if the response is listing features, benefits, steps, or similar
    const sentences = response
      .split(/[.!?]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const hasListIndicators = response.toLowerCase().includes("following") ||
      response.toLowerCase().includes("features") ||
      response.toLowerCase().includes("benefits") ||
      response.toLowerCase().includes("steps") ||
      response.toLowerCase().includes("points") ||
      sentences.some(s => s.match(/^\d+\.|first|second|third|finally/i));

    if (hasListIndicators) {
      // Format as bullet points
      const formattedPoints = sentences
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .map(sentence => {
          // Remove numbering if it exists
          sentence = sentence.replace(/^\d+\.\s*/, '');
          // Remove transitional phrases
          sentence = sentence.replace(/^(First,|Second,|Third,|Finally,|Moreover,|Furthermore,|In addition,)\s*/i, '');
          return `• ${sentence}`;
        })
        .join('\n');

      return formattedPoints;
    }

    return response;
  };

  const sendMessageToGroq = async (userInput: string) => {
    try {
      setIsSending(true)
      console.log('Sending request to Groq:', userInput);
      
      const res = await fetch('https://groq-backend-coyq.onrender.com/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message: userInput,
          instruction: "Provide natural, conversational responses. When explaining features, benefits, or steps, present them in a clear, structured manner."
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to get response: ${res.status} ${errorText}`);
      }
      
      const data = await res.json();
      return formatResponse(data.response);
    } catch (error: any) {
      console.error('Error in sendMessageToGroq:', error);
      return `Sorry, I encountered an error: ${error?.message || 'Unknown error'}. Please try again.`;
    } finally {
      setIsSending(false)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // Add user message
    setMessagesCapped(prev => [
      ...prev,
      { type: "user", content: userMessage, timestamp: new Date() }
    ])

    // If no agent is connected yet, do the initial connection
    if (!isAgentConnected) {
      await delay(2000)

      // Generate random agent name
      const agentName = getRandomAgent()
      setCurrentAgent(agentName)

      // Add connecting message
      setMessagesCapped(prev => [
        ...prev,
        { 
          type: "connecting", 
          content: "Connecting you to an available agent...", 
          timestamp: new Date() 
        }
      ])

      await delay(2000)

      // Add agent connected message
      setMessagesCapped(prev => {
        const withoutConnecting = prev.filter(msg => msg.type !== "connecting")
        return [
          ...withoutConnecting,
          { 
            type: "bot", 
            content: `Hello! I'm ${agentName}, and I'll be assisting you today.`, 
            timestamp: new Date(),
            agentName 
          }
        ]
      })

      setIsAgentConnected(true)
      await delay(2000)
    }

    // Add a natural delay as if agent is reading the message
    await delay(2500)

    // Then show typing indicator
    setMessagesCapped(prev => [
      ...prev,
      { 
        type: "typing", 
        content: `${currentAgent} is typing...`, 
        timestamp: new Date(),
        agentName: currentAgent 
      }
    ])

    try {
      const response = await sendMessageToGroq(userMessage)
      // Add a delay before showing the response
      await delay(2000)
      
      setMessagesCapped(prev => {
        const withoutTyping = prev.filter(msg => msg.type !== "typing")
        return [
          ...withoutTyping,
          { 
            type: "bot", 
            content: response, 
            timestamp: new Date(),
            agentName: currentAgent 
          }
        ]
      })
    } catch (error: any) {
      console.error('Error in handleSubmit:', error)
      
      await delay(2000)
      
      setMessagesCapped(prev => {
        const withoutTyping = prev.filter(msg => msg.type !== "typing")
        return [
          ...withoutTyping,
          { 
            type: "bot", 
            content: "Sorry, I encountered an error. Please try again.", 
            timestamp: new Date(),
            agentName: currentAgent 
          }
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Reset only agent connection when chat is closed
  const handleClose = () => {
    setIsOpen(false)
    setIsAgentConnected(false)
    setCurrentAgent("")
  }

  // Handle chat opening
  const handleOpen = () => {
    setIsOpen(true)
    // If there are no messages, add the initial greeting
    if (messages.length === 0) {
      setMessagesCapped(() => [
        {
          type: "bot",
          content: "👋 Hi! How can I help you today?",
          timestamp: new Date()
        }
      ])
    }
  }

  // Auto scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const renderMessage = (message: Message, index: number) => {
    if (message.type === "connecting") {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-white/5 border border-finova-teal/15">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-finova-teal border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium">{message.content}</p>
            </div>
          </div>
        </motion.div>
      )
    }

    if (message.type === "typing") {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 bg-white/5 border border-finova-teal/15">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-finova-teal animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-finova-teal animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-finova-teal animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-sm opacity-70">{message.content}</p>
            </div>
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 ${
            message.type === "user"
              ? "finova-gradient text-white"
              : "bg-white/5 border border-finova-teal/15"
          }`}
        >
          {message.type === "bot" && message.agentName && (
            <p className="text-xs font-medium text-finova-teal mb-1">
              {message.agentName}
            </p>
          )}
          <div className="text-sm whitespace-pre-line">
            {message.content}
          </div>
          <p className="text-[10px] mt-1 opacity-70">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={handleOpen}
        aria-label="Open chat"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 rounded-full finova-gradient text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-0 right-0 sm:bottom-24 sm:right-6 z-50
              w-full sm:w-[380px]
              flex flex-col
              h-[85dvh] sm:h-auto sm:max-h-[min(560px,calc(100dvh-7rem))]
              rounded-t-2xl sm:rounded-2xl
              overflow-hidden
              bg-[#0a1628]/90 backdrop-blur-xl
              border border-finova-teal/20
              shadow-2xl shadow-finova-teal/10"
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-finova-teal/15 bg-gradient-to-r from-finova-teal/10 to-finova-blue/10">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-full finova-gradient">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-sm finova-text-gradient">
                  {isAgentConnected ? currentAgent : 'Finova Assistant'}
                </h3>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close chat"
                className="flex items-center justify-center w-7 h-7 rounded-full text-foreground/50 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 scroll-smooth">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => renderMessage(message, index))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 px-3 py-3 sm:px-4 border-t border-finova-teal/15 bg-gradient-to-r from-finova-teal/5 to-finova-blue/5">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border-finova-teal/20 focus:border-finova-teal/60 text-sm h-9 sm:h-10 placeholder:text-foreground/30"
                  disabled={isSending}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isSending || !input.trim()}
                  className="finova-gradient hover:opacity-90 text-white border-0 h-9 w-9 sm:h-10 sm:w-10 shrink-0"
                >
                  {isSending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 