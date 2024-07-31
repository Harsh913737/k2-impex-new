const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestUser = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
  },
  guestName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("guestUser", guestUser);
