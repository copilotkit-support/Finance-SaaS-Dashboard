import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  OpenAIAdapter
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import { transactionsData } from "@/data/transactions-data";
// You can use any service adapter here for multi-agent support.
const serviceAdapter = new OpenAIAdapter();

const runtime = new CopilotRuntime({
  // @ts-ignore
  actions: ({ properties, url }) => {
    return [
      {
        name : "get_all_mcc_categories",
        description : "This will return all the mcc categories there is. If the user ask for a specific mcc category and if it is not in the list, you should pick the most similar mcc category from the list and use it in the next set of tools.",
        handler : async () => {
          console.log("utilizing get_all_mcc_categories")
          return ["Miscellaneous Food Stores","Department Stores","Money Transfer","Drinking Places (Alcoholic Beverages)","Book Stores","Tolls and Bridge Fees","Athletic Fields, Commercial Sports","Grocery Stores, Supermarkets","Taxicabs and Limousines","Service Stations","Automotive Service Shops","Wholesale Clubs","Package Stores, Beer, Wine, Liquor","Upholstery and Drapery Stores","Fast Food Restaurants","Discount Stores","Telecommunication Services","Utilities - Electric, Gas, Water, Sanitary","Eating Places and Restaurants","Betting (including Lottery Tickets, Casinos)","Recreational Sports, Clubs","Drug Stores and Pharmacies","Lodging - Hotels, Motels, Resorts","Books, Periodicals, Newspapers","Detective Agencies, Security Services","Family Clothing Stores","Computer Network Services","Theatrical Producers","Digital Goods - Media, Books, Apps","Cable, Satellite, and Other Pay Television Services","Beauty and Barber Shops","Sports Apparel, Riding Apparel Stores","Electronics Stores","Antique Shops","Artist Supply Stores, Craft Shops","Travel Agencies","Brick, Stone, and Related Materials","Cleaning and Maintenance Services","Medical Services", "Sales and Marketing Services"]

        }
      },
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
          return transactionsData.filter(transaction => transaction.use_chip.toLowerCase() == use_chip.toLowerCase());
        }
      },
      {
        name: "get_number_of_transactions_by_use_chip",
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
          console.log(use_chip, "use_chip")
          console.log(`There is ${transactionsData.filter(transaction => transaction.use_chip.toLowerCase() == use_chip.toLowerCase()).length} ${use_chip} transactions`)
          return `There is ${transactionsData.filter(transaction => transaction.use_chip.toLowerCase() == use_chip.toLowerCase()).length} ${use_chip} transactions`;
        }
      },
      {
        name: "get_money_earned_on_each_mcc",
        description: "Get transactions by use_chip. This use_chip indicates the type of transaction. Swipe Transaction is a transaction that was made with a physical card, and Online Transaction is a transaction that was made online.",
        parameters: [
          {
            name: "mcc",
            description: "The mcc of the transaction",
            type: "string",
            enum: ["Miscellaneous Food Stores","Department Stores","Money Transfer","Drinking Places (Alcoholic Beverages)","Book Stores","Tolls and Bridge Fees","Athletic Fields, Commercial Sports","Grocery Stores, Supermarkets","Taxicabs and Limousines","Service Stations","Automotive Service Shops","Wholesale Clubs","Package Stores, Beer, Wine, Liquor","Upholstery and Drapery Stores","Fast Food Restaurants","Discount Stores","Telecommunication Services","Utilities - Electric, Gas, Water, Sanitary","Eating Places and Restaurants","Betting (including Lottery Tickets, Casinos)","Recreational Sports, Clubs","Drug Stores and Pharmacies","Lodging - Hotels, Motels, Resorts","Books, Periodicals, Newspapers","Detective Agencies, Security Services","Family Clothing Stores","Computer Network Services","Theatrical Producers","Digital Goods - Media, Books, Apps","Cable, Satellite, and Other Pay Television Services","Beauty and Barber Shops","Sports Apparel, Riding Apparel Stores","Electronics Stores","Antique Shops","Artist Supply Stores, Craft Shops","Travel Agencies","Brick, Stone, and Related Materials","Cleaning and Maintenance Services","Medical Services", "Sales and Marketing Services"],
            required: true
          }
        ],
        handler: async ({ mcc }: { mcc: string }) => {
          console.log(mcc, "mcc")
          let result = []
          const mccData = transactionsData.filter(transaction => transaction.mcc == mcc)
          let totalMoneyEarned = 0
          for (const transaction of mccData) {
            totalMoneyEarned += parseFloat(transaction.amount.replace("$", ""))
          }
          console.log(`Total money earned on ${mcc} is $${totalMoneyEarned.toFixed(2)}`)
          result.push(`Total money earned on ${mcc} is $${totalMoneyEarned.toFixed(2)}`)
          return result;
        }
      },
      {
        name: "get_all_transactions_of_a_specific_mcc_for_a_given_month",
        description: "Get all transactions of a specific mcc for a given month",
        parameters: [
          {
            name: "mcc",
            description: "The mcc of the transaction",
            type: "string",
            enum: ["Miscellaneous Food Stores","Department Stores","Money Transfer","Drinking Places (Alcoholic Beverages)","Book Stores","Tolls and Bridge Fees","Athletic Fields, Commercial Sports","Grocery Stores, Supermarkets","Taxicabs and Limousines","Service Stations","Automotive Service Shops","Wholesale Clubs","Package Stores, Beer, Wine, Liquor","Upholstery and Drapery Stores","Fast Food Restaurants","Discount Stores","Telecommunication Services","Utilities - Electric, Gas, Water, Sanitary","Eating Places and Restaurants","Betting (including Lottery Tickets, Casinos)","Recreational Sports, Clubs","Drug Stores and Pharmacies","Lodging - Hotels, Motels, Resorts","Books, Periodicals, Newspapers","Detective Agencies, Security Services","Family Clothing Stores","Computer Network Services","Theatrical Producers","Digital Goods - Media, Books, Apps","Cable, Satellite, and Other Pay Television Services","Beauty and Barber Shops","Sports Apparel, Riding Apparel Stores","Electronics Stores","Antique Shops","Artist Supply Stores, Craft Shops","Travel Agencies","Brick, Stone, and Related Materials","Cleaning and Maintenance Services","Medical Services", "Sales and Marketing Services"],
            required: true
          },
          {
            name: "month",
            description: "The month of the transaction",
            type: "string",
            enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            required: true
          }
        ],
        handler: async ({ mcc, month }: { mcc: string, month: string }) => {
          console.log(mcc, "mcc")
          console.log(month, "month")
          console.log(`There is ${transactionsData.filter(transaction => transaction.mcc.toLowerCase() == mcc.toLowerCase() && new Date(transaction.date).getMonth() + 1 == parseInt(month)).length} ${mcc} transactions in ${month}`)
          // return `These are the transactions of ${mcc} in ${month}: ${transactionsData.filter(transaction => transaction.mcc.toLowerCase() == mcc.toLowerCase() && new Date(transaction.date).getMonth() + 1 == parseInt(month)).map((transaction: any) => ({
          //   date: new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          //   amount: transaction.amount,
          //   merchant_city: transaction.merchant_city,
          //   id: transaction.id,
          //   client_id: transaction.client_id,
          //   mcc: transaction.mcc,
          // }))}`;
          return transactionsData.filter(transaction => transaction.mcc.toLowerCase() == mcc.toLowerCase() && new Date(transaction.date).getMonth() + 1 == parseInt(month)).map((transaction: any) => ({
            date: new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            amount: transaction.amount,
            merchant_city: transaction.merchant_city,
            id: transaction.id,
            client_id: transaction.client_id,
            mcc: transaction.mcc,
          }))
        }
      },
      {
        name : "get_all_spending_by_all_mcc_for_a_given_month",
        description : "Get all spending by all mcc for a given month",
        parameters : [
          {
            name : "month",
            description : "The month of the transaction",
            enum : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            required : true
          }
        ],
        handler : async ({ month }: { month: string }) => {
          console.log(month, "month")
          let mccCategory = ["Miscellaneous Food Stores","Department Stores","Money Transfer","Drinking Places (Alcoholic Beverages)","Book Stores","Tolls and Bridge Fees","Athletic Fields, Commercial Sports","Grocery Stores, Supermarkets","Taxicabs and Limousines","Service Stations","Automotive Service Shops","Wholesale Clubs","Package Stores, Beer, Wine, Liquor","Upholstery and Drapery Stores","Fast Food Restaurants","Discount Stores","Telecommunication Services","Utilities - Electric, Gas, Water, Sanitary","Eating Places and Restaurants","Betting (including Lottery Tickets, Casinos)","Recreational Sports, Clubs","Drug Stores and Pharmacies","Lodging - Hotels, Motels, Resorts","Books, Periodicals, Newspapers","Detective Agencies, Security Services","Family Clothing Stores","Computer Network Services","Theatrical Producers","Digital Goods - Media, Books, Apps","Cable, Satellite, and Other Pay Television Services","Beauty and Barber Shops","Sports Apparel, Riding Apparel Stores","Electronics Stores","Antique Shops","Artist Supply Stores, Craft Shops","Travel Agencies","Brick, Stone, and Related Materials","Cleaning and Maintenance Services","Medical Services"]
          let data = transactionsData.filter(transaction => new Date(transaction.date).getMonth() + 1 == parseInt(month))
          let result = []
          for (const mcc of mccCategory) {
            let mccData = data.filter(transaction => transaction.mcc == mcc)
            let totalMoneyEarned = 0
            for (const transaction of mccData) {
              totalMoneyEarned += parseFloat(transaction.amount.replace("$", ""))
            }
            console.log(`Total money earned on ${mcc} is $${totalMoneyEarned.toFixed(2)}`)
            result.push({
              mcc : mcc,
              totalMoneyEarned : totalMoneyEarned.toFixed(2)
            })
          }
          result.sort((a, b) => parseFloat(b.totalMoneyEarned) - parseFloat(a.totalMoneyEarned))
          return result.map((item: any) => (
            `Total money earned on ${item.mcc} is $${item.totalMoneyEarned}`
          ))
        }
      }

    ]
  },
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};