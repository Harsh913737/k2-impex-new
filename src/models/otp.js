const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
  },
  otp: {
    type: String,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: "15m" }, // TTL index that automatically deletes expired documents after 1 minute
  },
});

module.exports = mongoose.model("otp", OtpSchema);
