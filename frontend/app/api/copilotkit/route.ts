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
            enum: ["Heating, Plumbing, Air Conditioning Contractors", "Steelworks", "Steel Products Manufacturing", "Miscellaneous Metal Fabrication", "Miscellaneous Fabricated Metal Products", "Coated and Laminated Products", "Steel Drums and Barrels", "Fabricated Structural Metal Products", "Tools, Parts, Supplies Manufacturing", "Miscellaneous Metals", "Bolt, Nut, Screw, Rivet Manufacturing", "Leather Goods", "Floor Covering Stores", "Upholstery and Drapery Stores", "Brick, Stone, and Related Materials", "Pottery and Ceramics", "Non-Ferrous Metal Foundries", "Electroplating, Plating, Polishing Services", "Non-Precious Metal Services", "Miscellaneous Metalwork", "Heat Treating Metal Services", "Welding Repair", "Ironwork", "Gardening Supplies", "Industrial Equipment and Supplies", "Miscellaneous Machinery and Parts Manufacturing", "Lighting, Fixtures, Electrical Supplies", "Semiconductors and Related Devices", "Passenger Railways", "Ship Chandlers", "Railroad Passenger Transport", "Railroad Freight", "Computer Network Services", "Local and Suburban Commuter Transportation", "Taxicabs and Limousines", "Bus Lines", "Motor Freight Carriers and Trucking", "Cruise Lines", "Airlines", "Travel Agencies", "Tolls and Bridge Fees", "Telecommunication Services", "Money Transfer", "Cable, Satellite, and Other Pay Television Services", "Utilities - Electric, Gas, Water, Sanitary", "Computers, Computer Peripheral Equipment", "Precious Stones and Metals", "Books, Periodicals, Newspapers", "Florists Supplies, Nursery Stock and Flowers", "Lumber and Building Materials", "Hardware Stores", "Lawn and Garden Supply Stores", "Wholesale Clubs", "Discount Stores", "Department Stores", "Grocery Stores, Supermarkets", "Miscellaneous Food Stores", "Automotive Parts and Accessories Stores", "Service Stations", "Women's Ready-To-Wear Stores", "Family Clothing Stores", "Sports Apparel, Riding Apparel Stores", "Shoe Stores", "Furniture, Home Furnishings, and Equipment Stores", "Miscellaneous Home Furnishing Stores", "Household Appliance Stores", "Electronics Stores", "Music Stores - Musical Instruments", "Eating Places and Restaurants", "Drinking Places (Alcoholic Beverages)", "Fast Food Restaurants", "Digital Goods - Media, Books, Apps", "Digital Goods - Games", "Drug Stores and Pharmacies", "Package Stores, Beer, Wine, Liquor", "Antique Shops", "Sporting Goods Stores", "Book Stores", "Gift, Card, Novelty Stores", "Artist Supply Stores, Craft Shops", "Cosmetic Stores", "Insurance Sales, Underwriting", "Lodging - Hotels, Motels, Resorts", "Laundry Services", "Beauty and Barber Shops", "Tax Preparation Services", "Cleaning and Maintenance Services", "Detective Agencies, Security Services", "Automotive Body Repair Shops", "Automotive Service Shops", "Car Washes", "Towing Services", "Athletic Fields, Commercial Sports", "Recreational Sports, Clubs", "Motion Picture Theaters", "Theatrical Producers", "Betting (including Lottery Tickets, Casinos)", "Amusement Parks, Carnivals, Circuses", "Doctors, Physicians", "Dentists and Orthodontists", "Chiropractors", "Optometrists, Optical Goods and Eyeglasses", "Podiatrists", "Hospitals", "Medical Services", "Legal Services and Attorneys", "Accounting, Auditing, and Bookkeeping Services", "Postal Services - Government Only"],
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
            enum: ["Heating, Plumbing, Air Conditioning Contractors", "Steelworks", "Steel Products Manufacturing", "Miscellaneous Metal Fabrication", "Miscellaneous Fabricated Metal Products", "Coated and Laminated Products", "Steel Drums and Barrels", "Fabricated Structural Metal Products", "Tools, Parts, Supplies Manufacturing", "Miscellaneous Metals", "Bolt, Nut, Screw, Rivet Manufacturing", "Leather Goods", "Floor Covering Stores", "Upholstery and Drapery Stores", "Brick, Stone, and Related Materials", "Pottery and Ceramics", "Non-Ferrous Metal Foundries", "Electroplating, Plating, Polishing Services", "Non-Precious Metal Services", "Miscellaneous Metalwork", "Heat Treating Metal Services", "Welding Repair", "Ironwork", "Gardening Supplies", "Industrial Equipment and Supplies", "Miscellaneous Machinery and Parts Manufacturing", "Lighting, Fixtures, Electrical Supplies", "Semiconductors and Related Devices", "Passenger Railways", "Ship Chandlers", "Railroad Passenger Transport", "Railroad Freight", "Computer Network Services", "Local and Suburban Commuter Transportation", "Taxicabs and Limousines", "Bus Lines", "Motor Freight Carriers and Trucking", "Cruise Lines", "Airlines", "Travel Agencies", "Tolls and Bridge Fees", "Telecommunication Services", "Money Transfer", "Cable, Satellite, and Other Pay Television Services", "Utilities - Electric, Gas, Water, Sanitary", "Computers, Computer Peripheral Equipment", "Precious Stones and Metals", "Books, Periodicals, Newspapers", "Florists Supplies, Nursery Stock and Flowers", "Lumber and Building Materials", "Hardware Stores", "Lawn and Garden Supply Stores", "Wholesale Clubs", "Discount Stores", "Department Stores", "Grocery Stores, Supermarkets", "Miscellaneous Food Stores", "Automotive Parts and Accessories Stores", "Service Stations", "Women's Ready-To-Wear Stores", "Family Clothing Stores", "Sports Apparel, Riding Apparel Stores", "Shoe Stores", "Furniture, Home Furnishings, and Equipment Stores", "Miscellaneous Home Furnishing Stores", "Household Appliance Stores", "Electronics Stores", "Music Stores - Musical Instruments", "Eating Places and Restaurants", "Drinking Places (Alcoholic Beverages)", "Fast Food Restaurants", "Digital Goods - Media, Books, Apps", "Digital Goods - Games", "Drug Stores and Pharmacies", "Package Stores, Beer, Wine, Liquor", "Antique Shops", "Sporting Goods Stores", "Book Stores", "Gift, Card, Novelty Stores", "Artist Supply Stores, Craft Shops", "Cosmetic Stores", "Insurance Sales, Underwriting", "Lodging - Hotels, Motels, Resorts", "Laundry Services", "Beauty and Barber Shops", "Tax Preparation Services", "Cleaning and Maintenance Services", "Detective Agencies, Security Services", "Automotive Body Repair Shops", "Automotive Service Shops", "Car Washes", "Towing Services", "Athletic Fields, Commercial Sports", "Recreational Sports, Clubs", "Motion Picture Theaters", "Theatrical Producers", "Betting (including Lottery Tickets, Casinos)", "Amusement Parks, Carnivals, Circuses", "Doctors, Physicians", "Dentists and Orthodontists", "Chiropractors", "Optometrists, Optical Goods and Eyeglasses", "Podiatrists", "Hospitals", "Medical Services", "Legal Services and Attorneys", "Accounting, Auditing, and Bookkeeping Services", "Postal Services - Government Only"],
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