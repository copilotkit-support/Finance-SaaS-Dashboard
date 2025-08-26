let transactions = require("./out.json")
let merchants = require("./j.json")

console.log(merchants);
mers = []
for (const key in merchants) {
    if (Object.prototype.hasOwnProperty.call(merchants, key)) {
        const element = merchants[key];
        mers.push({
            merchantId: key,
            merchantType: merchants[key]
        })
    }
}

console.log(mers);
