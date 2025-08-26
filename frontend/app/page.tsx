"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CopilotChat, useCopilotChatSuggestions } from "@copilotkit/react-ui"
import "@copilotkit/react-ui/styles.css";
import { TextMessage, Role } from "@copilotkit/runtime-client-gql";
import {
  Search,
  Sparkles,
  FileText,
  Twitter,
  TrendingUp,
  Send,
  User,
  ExternalLink,
  Globe,
  Brain,
  Zap,
  Star,
  ChevronDown,
  Check,
} from "lucide-react"
import { useCoAgent, useCoAgentStateRender, useCopilotAction, useCopilotChat } from "@copilotkit/react-core"
import { ToolLogs } from "@/components/ui/tool-logs"
import { XPost, XPostPreview, XPostCompact } from "@/components/ui/x-post"
import { Button } from "@/components/ui/button"
import { initialPrompt, suggestionPrompt } from "./prompts/prompts"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useLayout } from "./contexts/LayoutContext"

const quickActions = [
  { label: "Recent Research", icon: Search, color: "text-blue-600", prompt: "Generate a post about recent research on String Theory" },
  { label: "Recent News", icon: FileText, color: "text-green-600", prompt: "Generate a post about recent news in United States" },
  { label: "Post about Social Media", icon: Twitter, color: "text-purple-600", prompt: "Generate a post about Instagram" },
  { label: "Post about Stocks", icon: TrendingUp, color: "text-orange-600", prompt: "Generate a post about Nvidia" },
]

export default function PostGenerator() {
  const [isAgentActive, setIsAgentActive] = useState(false)
  
  const { appendMessage, setMessages } = useCopilotChat() 



  useCopilotChatSuggestions({
    available: "enabled",
    instructions: suggestionPrompt,
  })


  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Sidebar */}
      <div className="flex flex-col min-h-screen w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-100/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Finance Agent
              </h1>
              <p className="text-sm text-gray-600">Advanced AI Canvas</p>
            </div>
          </div>

          {/* Enhanced Agent Selector */}
        </div>


        <div className="flex-1 overflow-auto">

          {/* Chat Input at Bottom */}
          <CopilotChat className="h-full p-2" labels={{
            initial: initialPrompt
          }}
            Input={({ onSend, inProgress }) => {
              useEffect(() => {
                if (inProgress) {
                  setIsAgentActive(true)
                } else {
                  setIsAgentActive(false)
                }
              }, [inProgress])
              const [input, setInput] = useState("")
              return (<>
                <div className="space-y-3">
                  <form className="flex flex-col gap-3">
                    <Textarea
                      value={input}
                      onKeyDown={(e) => {
                        if (e.key.toLowerCase() === 'enter' && !inProgress) {
                          appendMessage(new TextMessage({
                            role: Role.User,
                            content: input
                          }))
                        }
                      }}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="min-h-[80px] resize-none rounded-xl border-muted-foreground/20 p-3"
                    />
                    <Button disabled={inProgress}

                      onClick={(e) => {
                        e.preventDefault()
                        if (input.trim() === "") return
                        console.log("sending message")
                        onSend(input)
                        setInput("")
                      }} className="self-end rounded-xl px-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </form>
                </div>
              </>)
            }}
          />
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-6 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Finance Dashboards
                </h2>
                <p className="text-sm text-gray-600">Powered by CopilotKit</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isAgentActive && <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Live Research
              </Badge>}
              {/* <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div> */}
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 p-6 overflow-y-auto">

          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
              Ready to Explore
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              Harness the power of Google's most advanced AI models for generating interactive LinkedIn and X Posts.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {quickActions.slice(0, 4).map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  // disabled={running}

                  className="h-auto p-6 flex flex-col items-center gap-3 bg-white/50 backdrop-blur-sm border-gray-200/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 group"
                  onClick={() => appendMessage(new TextMessage({
                    role: Role.User,
                    content: action.prompt
                  }))}
                >
                  <action.icon
                    className={`w-6 h-6 ${action.color} group-hover:scale-110 transition-transform duration-200`}
                  />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
