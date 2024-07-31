const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
  },
  orders: [
    {
      orderId: {
        type: Schema.Types.ObjectId,
        ref: "order",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("account", AccountSchema);
