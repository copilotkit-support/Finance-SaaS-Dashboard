let transactions = require("./out.json")
let fs = require("fs")
let a = [
  {
    merchantId: "1711",
    merchantType: "Heating, Plumbing, Air Conditioning Contractors",
  },
  {
    merchantId: "3000",
    merchantType: "Steelworks",
  },
  {
    merchantId: "3001",
    merchantType: "Steel Products Manufacturing",
  },
  {
    merchantId: "3005",
    merchantType: "Miscellaneous Metal Fabrication",
  },
  {
    merchantId: "3006",
    merchantType: "Miscellaneous Fabricated Metal Products",
  },
  {
    merchantId: "3007",
    merchantType: "Coated and Laminated Products",
  },
  {
    merchantId: "3008",
    merchantType: "Steel Drums and Barrels",
  },
  {
    merchantId: "3009",
    merchantType: "Fabricated Structural Metal Products",
  },
  {
    merchantId: "3058",
    merchantType: "Tools, Parts, Supplies Manufacturing",
  },
  {
    merchantId: "3066",
    merchantType: "Miscellaneous Metals",
  },
  {
    merchantId: "3075",
    merchantType: "Bolt, Nut, Screw, Rivet Manufacturing",
  },
  {
    merchantId: "3132",
    merchantType: "Leather Goods",
  },
  {
    merchantId: "3144",
    merchantType: "Floor Covering Stores",
  },
  {
    merchantId: "3174",
    merchantType: "Upholstery and Drapery Stores",
  },
  {
    merchantId: "3256",
    merchantType: "Brick, Stone, and Related Materials",
  },
  {
    merchantId: "3260",
    merchantType: "Pottery and Ceramics",
  },
  {
    merchantId: "3359",
    merchantType: "Non-Ferrous Metal Foundries",
  },
  {
    merchantId: "3387",
    merchantType: "Electroplating, Plating, Polishing Services",
  },
  {
    merchantId: "3389",
    merchantType: "Non-Precious Metal Services",
  },
  {
    merchantId: "3390",
    merchantType: "Miscellaneous Metalwork",
  },
  {
    merchantId: "3393",
    merchantType: "Heat Treating Metal Services",
  },
  {
    merchantId: "3395",
    merchantType: "Welding Repair",
  },
  {
    merchantId: "3405",
    merchantType: "Ironwork",
  },
  {
    merchantId: "3504",
    merchantType: "Gardening Supplies",
  },
  {
    merchantId: "3509",
    merchantType: "Industrial Equipment and Supplies",
  },
  {
    merchantId: "3596",
    merchantType: "Miscellaneous Machinery and Parts Manufacturing",
  },
  {
    merchantId: "3640",
    merchantType: "Lighting, Fixtures, Electrical Supplies",
  },
  {
    merchantId: "3684",
    merchantType: "Semiconductors and Related Devices",
  },
  {
    merchantId: "3722",
    merchantType: "Passenger Railways",
  },
  {
    merchantId: "3730",
    merchantType: "Ship Chandlers",
  },
  {
    merchantId: "3771",
    merchantType: "Railroad Passenger Transport",
  },
  {
    merchantId: "3775",
    merchantType: "Railroad Freight",
  },
  {
    merchantId: "3780",
    merchantType: "Computer Network Services",
  },
  {
    merchantId: "4111",
    merchantType: "Local and Suburban Commuter Transportation",
  },
  {
    merchantId: "4112",
    merchantType: "Passenger Railways",
  },
  {
    merchantId: "4121",
    merchantType: "Taxicabs and Limousines",
  },
  {
    merchantId: "4131",
    merchantType: "Bus Lines",
  },
  {
    merchantId: "4214",
    merchantType: "Motor Freight Carriers and Trucking",
  },
  {
    merchantId: "4411",
    merchantType: "Cruise Lines",
  },
  {
    merchantId: "4511",
    merchantType: "Airlines",
  },
  {
    merchantId: "4722",
    merchantType: "Travel Agencies",
  },
  {
    merchantId: "4784",
    merchantType: "Tolls and Bridge Fees",
  },
  {
    merchantId: "4814",
    merchantType: "Telecommunication Services",
  },
  {
    merchantId: "4829",
    merchantType: "Money Transfer",
  },
  {
    merchantId: "4899",
    merchantType: "Cable, Satellite, and Other Pay Television Services",
  },
  {
    merchantId: "4900",
    merchantType: "Utilities - Electric, Gas, Water, Sanitary",
  },
  {
    merchantId: "5045",
    merchantType: "Computers, Computer Peripheral Equipment",
  },
  {
    merchantId: "5094",
    merchantType: "Precious Stones and Metals",
  },
  {
    merchantId: "5192",
    merchantType: "Books, Periodicals, Newspapers",
  },
  {
    merchantId: "5193",
    merchantType: "Florists Supplies, Nursery Stock and Flowers",
  },
  {
    merchantId: "5211",
    merchantType: "Lumber and Building Materials",
  },
  {
    merchantId: "5251",
    merchantType: "Hardware Stores",
  },
  {
    merchantId: "5261",
    merchantType: "Lawn and Garden Supply Stores",
  },
  {
    merchantId: "5300",
    merchantType: "Wholesale Clubs",
  },
  {
    merchantId: "5310",
    merchantType: "Discount Stores",
  },
  {
    merchantId: "5311",
    merchantType: "Department Stores",
  },
  {
    merchantId: "5411",
    merchantType: "Grocery Stores, Supermarkets",
  },
  {
    merchantId: "5499",
    merchantType: "Miscellaneous Food Stores",
  },
  {
    merchantId: "5533",
    merchantType: "Automotive Parts and Accessories Stores",
  },
  {
    merchantId: "5541",
    merchantType: "Service Stations",
  },
  {
    merchantId: "5621",
    merchantType: "Women's Ready-To-Wear Stores",
  },
  {
    merchantId: "5651",
    merchantType: "Family Clothing Stores",
  },
  {
    merchantId: "5655",
    merchantType: "Sports Apparel, Riding Apparel Stores",
  },
  {
    merchantId: "5661",
    merchantType: "Shoe Stores",
  },
  {
    merchantId: "5712",
    merchantType: "Furniture, Home Furnishings, and Equipment Stores",
  },
  {
    merchantId: "5719",
    merchantType: "Miscellaneous Home Furnishing Stores",
  },
  {
    merchantId: "5722",
    merchantType: "Household Appliance Stores",
  },
  {
    merchantId: "5732",
    merchantType: "Electronics Stores",
  },
  {
    merchantId: "5733",
    merchantType: "Music Stores - Musical Instruments",
  },
  {
    merchantId: "5812",
    merchantType: "Eating Places and Restaurants",
  },
  {
    merchantId: "5813",
    merchantType: "Drinking Places (Alcoholic Beverages)",
  },
  {
    merchantId: "5814",
    merchantType: "Fast Food Restaurants",
  },
  {
    merchantId: "5815",
    merchantType: "Digital Goods - Media, Books, Apps",
  },
  {
    merchantId: "5816",
    merchantType: "Digital Goods - Games",
  },
  {
    merchantId: "5912",
    merchantType: "Drug Stores and Pharmacies",
  },
  {
    merchantId: "5921",
    merchantType: "Package Stores, Beer, Wine, Liquor",
  },
  {
    merchantId: "5932",
    merchantType: "Antique Shops",
  },
  {
    merchantId: "5941",
    merchantType: "Sporting Goods Stores",
  },
  {
    merchantId: "5942",
    merchantType: "Book Stores",
  },
  {
    merchantId: "5947",
    merchantType: "Gift, Card, Novelty Stores",
  },
  {
    merchantId: "5970",
    merchantType: "Artist Supply Stores, Craft Shops",
  },
  {
    merchantId: "5977",
    merchantType: "Cosmetic Stores",
  },
  {
    merchantId: "6300",
    merchantType: "Insurance Sales, Underwriting",
  },
  {
    merchantId: "7011",
    merchantType: "Lodging - Hotels, Motels, Resorts",
  },
  {
    merchantId: "7210",
    merchantType: "Laundry Services",
  },
  {
    merchantId: "7230",
    merchantType: "Beauty and Barber Shops",
  },
  {
    merchantId: "7276",
    merchantType: "Tax Preparation Services",
  },
  {
    merchantId: "7349",
    merchantType: "Cleaning and Maintenance Services",
  },
  {
    merchantId: "7393",
    merchantType: "Detective Agencies, Security Services",
  },
  {
    merchantId: "7531",
    merchantType: "Automotive Body Repair Shops",
  },
  {
    merchantId: "7538",
    merchantType: "Automotive Service Shops",
  },
  {
    merchantId: "7542",
    merchantType: "Car Washes",
  },
  {
    merchantId: "7549",
    merchantType: "Towing Services",
  },
  {
    merchantId: "7801",
    merchantType: "Athletic Fields, Commercial Sports",
  },
  {
    merchantId: "7802",
    merchantType: "Recreational Sports, Clubs",
  },
  {
    merchantId: "7832",
    merchantType: "Motion Picture Theaters",
  },
  {
    merchantId: "7922",
    merchantType: "Theatrical Producers",
  },
  {
    merchantId: "7995",
    merchantType: "Betting (including Lottery Tickets, Casinos)",
  },
  {
    merchantId: "7996",
    merchantType: "Amusement Parks, Carnivals, Circuses",
  },
  {
    merchantId: "8011",
    merchantType: "Doctors, Physicians",
  },
  {
    merchantId: "8021",
    merchantType: "Dentists and Orthodontists",
  },
  {
    merchantId: "8041",
    merchantType: "Chiropractors",
  },
  {
    merchantId: "8043",
    merchantType: "Optometrists, Optical Goods and Eyeglasses",
  },
  {
    merchantId: "8049",
    merchantType: "Podiatrists",
  },
  {
    merchantId: "8062",
    merchantType: "Hospitals",
  },
  {
    merchantId: "8099",
    merchantType: "Medical Services",
  },
  {
    merchantId: "8111",
    merchantType: "Legal Services and Attorneys",
  },
  {
    merchantId: "8931",
    merchantType: "Accounting, Auditing, and Bookkeeping Services",
  },
  {
    merchantId: "9402",
    merchantType: "Postal Services - Government Only",
  },
];

let modifiedTransactions = []
transactions.forEach((transaction)=>{
  modifiedTransactions.push({
    ...transaction,
    mcc: a.find(merchant => merchant.merchantId === transaction.mcc)?.merchantType
  })
})

console.log(modifiedTransactions);
fs.writeFileSync("modifiedTransactions.json", JSON.stringify(modifiedTransactions, null, 2))