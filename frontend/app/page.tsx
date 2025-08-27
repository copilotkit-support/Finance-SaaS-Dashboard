"use client"

import { useEffect, useState } from "react"
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
  ChartBar,
  ChartPie,
  Table,
  User,
  ExternalLink,
  Globe,
  Brain,
  Zap,
  Star,
  ChevronDown,
  Check,
} from "lucide-react"
import {useCopilotAction, useCopilotChat } from "@copilotkit/react-core"
import { Button } from "@/components/ui/button"
import { initialPrompt, instructions, suggestionPrompt } from "./prompts/prompts"
import { Textarea } from "@/components/ui/textarea"
import { PieData } from "@/components/visulization/pie-chart"
import { BarData } from "@/components/visulization/bar-chart"
import { AppTable } from "@/components/visulization/table"

const quickActions = [
  { label: "Type of Transactions", icon: ChartPie, color: "text-blue-600", prompt: "Get me the number of transactions in each type of mcc and show it in pie chart" },
  { label: "Department and Food Industry", icon: ChartBar, color: "text-green-600", prompt: "Get me the money earned from department and food industry and show it in bar chart" },
  { label: "Transactions on January", icon: Table, color: "text-purple-600", prompt: "Get me the transactions of Miscellaneous Food Stores from January and show it in table" },
  { label: "Grocery and Apparel", icon: ChartBar, color: "text-orange-600", prompt: "Get me the money earned from Grocery and Apparel industry and show it in bar chart" },
]

export default function DashboardGenerator() {
  const [dashboardData, setDashboardData] = useState<any>([])
  const { appendMessage } = useCopilotChat()


  useCopilotAction({
    name: "render_pie_chart",
    description: "You need to render a pie chart with the data provided. The data provided will be generic. EXAMPLE FORMAT: {items : [{name: 'Online Transaction', shortName: 'online', value: 10, color: 'red'}, {name: 'Offline Transaction', shortName: 'offline', value: 20, color: 'blue'}], title : 'Transaction Distribution'}",
    parameters: [
      {
        name: "items",
        type: "object[]",
        description: "Array of items to be displayed in the pie chart",
        required: true,
        attributes: [
          {
            name: "name",
            type: "string",
            description: "Name of the item",
            required: true
          },
          {
            name: "shortName",
            type: "string",
            description: "Short Name of the item",
            required: true
          },
          {
            name: "value",
            type: "number",
            description: "Value of the item",
            required: true
          },
          {
            name: "color",
            type: "string",
            description: "Color of the item",
            required: true
          }
        ]
      },
      {
        name: "title_of_chart",
        type: "string",
        description: "Title of the chart",
        required: true
      }
    ],
    render: ({ args }: any) => {
      useEffect(() => {
        console.log(args, "argsfromcpa")
      }, [args])
      return <PieData args={args.items} title={args.title_of_chart} />
    },
    handler: async ({ items, title_of_chart }: any) => {
      // Append new widget to dashboard sequentially
      setDashboardData((prev: any[]) => [
        ...prev,
        { items, title_of_chart, type: "pie_chart" },
      ])
      return { items, title_of_chart }
    }
  })

  useCopilotAction({
    name: "render_bar_chart",
    description: `You need to render a bar chart with the data provided. The data provided will be generic. EXAMPLE FORMAT: {items : [{"name": "Miscellaneous Food Stores", "value": 86000, "color": "rgb(134 239 172)"}, {"name": "Department Stores", "value": 15, "color": "rgb(216 180 254)"}, {"name": "Miscellaneous Food Stores", "value": 10, "color": "rgb(253 224 71)"}, {"name": "Wholesale Clubs", "value": 5, "color": "rgb(147 197 253)"}], title : 'Transaction Distribution'}`,
    parameters: [
      {
        name: "items",
        type: "object[]",
        description: "Array of items to be displayed in the bar chart",
        required: true,
        attributes: [
          {
            name: "name",
            type: "string",
            description: "Name of the entity",
            required: true
          },
          {
            name: "value",
            type: "number",
            description: "Value of the entity",
            required: true
          },
          {
            name: "color",
            type: "string",
            description: "Color of the entity",
            required: true
          }
        ]
      },
      {
        name: "title_of_chart",
        type: "string",
        description: "Title of the chart. It should be a short title",
        required: true
      }
    ],
    render: ({ args }: any) => {
      return <BarData args={args} from="action" />
    },
    handler: async ({ items, title_of_chart }: any) => {
      setDashboardData((prev: any[]) => [
        ...prev,
        { items, title_of_chart, type: "bar_chart" },
      ])
      return { items, title_of_chart }
    }
  })

  useCopilotAction({
    name: "render_table",
    description: `You need to render a Table with the data provided. The data provided will be generic. EXAMPLE FORMAT: {columns: ['title', 'amount'], data: [{key: 'title', value: 'John'}, {key: 'value', value: '10'}]}`,
    parameters: [
      {
        name: "columns",
        type: "string[]",
        description: "The name of the columns that need to be displayed in the table",
        required: true,
      },
      {
        name: "data",
        type: "object[]",
        description: "The data that needs to be displayed in the table",
        required: true,
        attributes: [
          {
            name: "rows",
            type: "object[]",
            required: true,
            attributes: [
              {
                name: "cells",
                type: "string[]",
                required: true,
                description: "One row as an array of strings. Make sure the number of cells is equal to the number of columns, if some data is missing, use empty string"
              }
            ]
          }
        ]
      },
      {
        name: "title_of_chart",
        type: "string",
        description: "Title of the chart. It should be a short title",
        required: true
      }
    ],
    render: ({ args }: any) => {
      useEffect(() => {
        console.log(args, "argsfromtable")
      }, [args])
      return <AppTable title={args?.title_of_chart} data={args?.data} columns={args?.columns?.map((column: string) => ({ key: column }))} />
    },
    handler: async ({ columns, data, title_of_chart }: any) => {  
      setDashboardData((prev: any[]) => [
        ...prev,
        { columns, data, title_of_chart, type: "table" },
      ])
      return { columns, data, title_of_chart }
    }
  })


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
          <CopilotChat className="h-full p-2" instructions={instructions} labels={{
            initial: initialPrompt
          }}
            Input={({ onSend, inProgress }) => {
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
                  Finance Dashboard
                </h2>
                <p className="text-sm text-gray-600">Powered by CopilotKit</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* {isAgentActive && <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Live Research
              </Badge>} */}
              {/* <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div> */}
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 p-6 overflow-y-auto">
          {dashboardData?.length === 0 ? (
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
                Harness the power of CopilotKit for generating interactive Dashboard over your financial data.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {quickActions.slice(0, 4).map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
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
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 grid-flow-row-dense"
            >
              {dashboardData.map((widget: any, index: number) => {
                if (widget?.type === "pie_chart") {
                  return (
                    <div key={index} className="col-span-1">
                      <PieData
                        args={widget.items}
                        title={widget.title_of_chart}
                      />
                    </div>
                  )
                }
                if (widget?.type === "bar_chart") {
                  const isWide = (widget?.items?.length || 0) > 5
                  console.log(widget?.items?.length, "isWide")
                  return (
                    <div
                      key={index}
                      className={`${isWide ? "col-span-2 sm:col-span-2 xl:col-span-2" : "col-span-1"}`}
                    >
                      <BarData args={widget} from="canvas" />
                    </div>
                  )
                }
                if (widget?.type === "table") {
                  return (
                    <div key={index} className="col-span-1 sm:col-span-2 xl:col-span-2">
                      <AppTable
                        data={widget.data}
                        columns={widget.columns.map((column: string) => ({ key: column }))}
                        title={widget.title_of_chart}
                        width="100%"
                        minWidth={0}
                        maxWidth="none"
                        className="w-full"
                      />
                    </div>
                  )
                }
                return <div key={index} className="text-sm text-gray-600">Unsupported widget type</div>
              })}
            </div>
          )}
        </div>
      </div>
    </div >
  )
}
