import statics from "../statics/user";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require("../common/constants");

const Admin = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "business",
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    // required: true,
    default: "admin",
  },
  password: {
    type: String,
    required: true,
  },
  enable: { type: Boolean, default: true },
  authType: {
    type: String,
    default: "email",
  },
  createdAt: { type: Date, default: Date.now },
});
Admin.statics = statics;
module.exports = mongoose.model("admin", Admin);
