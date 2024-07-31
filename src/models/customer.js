const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "business",
  },
  companyName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  password: {
    type: String,
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
  isEnable: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  creditLimit: {
    type: Number,
    required: true,
  },
  periodLimit: {
    type: Number,
    required: true,
  },
  outstandingAmount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("customer", CustomerSchema);
