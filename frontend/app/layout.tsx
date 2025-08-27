import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LayoutProvider } from "./contexts/LayoutContext"
import Wrapper from "./wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CopilotKit Finance Dashboard",
  description: "Powered by CopilotKit",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <LayoutProvider>
        <Wrapper>
          <body className={inter.className}>
            {children}
          </body>
        </Wrapper>
      </LayoutProvider>
    </html>
  )
}
