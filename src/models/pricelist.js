const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceList = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("pricelist", PriceList);
