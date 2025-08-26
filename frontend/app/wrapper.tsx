"use client"
import { CopilotKit } from "@copilotkit/react-core";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      {children}
    </CopilotKit>
  )
}