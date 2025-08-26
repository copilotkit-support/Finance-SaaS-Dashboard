import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  GoogleGenerativeAIAdapter,
  LangGraphAgent
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import { transactionsData } from "@/data/transactions-data";
// You can use any service adapter here for multi-agent support.
const serviceAdapter = new GoogleGenerativeAIAdapter();

const runtime = new CopilotRuntime({
  actions: ({ properties, url }) => {
    return [
      {
        name: "get_transactions_by_use_chip",
        description: "Get transactions by use_chip. This use_chip indicates the type of transaction. Swipe Transaction is a transaction that was made with a physical card, and Online Transaction is a transaction that was made online.",
        parameters: [
          {
            name: "use_chip",
            description: "The use_chip of the transaction",
            type: "string",
            enum: ["Swipe Transaction", "Online Transaction"],
            required: true
          }
        ],
        handler: async ({ use_chip }: { use_chip: string }) => {
          return transactionsData.filter(transaction => transaction.use_chip === use_chip);
        }
      }
    ]
  }
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};