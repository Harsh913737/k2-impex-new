import statics from "../statics/business";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require("../common/constants");

const Business = new Schema(
  {
    name: { type: String, default: "" },
    enable: { type: Boolean, default: true },
    // category: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
  },
  {
    toObject: {
      transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.enable;
        delete ret.createdAt;
        return ret;
      },
    },
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.enable;
        delete ret.createdAt;
        return ret;
      },
    },
  }
);
Business.statics = statics;
module.exports = mongoose.model("Business", Business);
