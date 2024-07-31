const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "business",
  },
  catalogusName: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  productPhoto: {
    type: String,
    required: false,
  },
  designNumber: {
    type: String,
    required: true,
  },
  availableAt: {
    type: String,
    required: true,
  },
  defaultPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  unit: {
    type: String,
  },
  stockAvailable: {
    type:Number,
    required: true,
    default: 0
  },
  totalquantityPerBox: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Middleware to convert all string fields to uppercase before saving
ProductSchema.pre("save", function (next) {
  const stringFields = [
    "catalogusName",
    "details",
    "productPhoto",
    "designNumber",
    "availableAt",
    "unit",
    "totalquantityPerBox",
  ];

  for (const field of stringFields) {
    if (this[field]) {
      this[field] = this[field].toUpperCase();
    }
  }

  next();
});

module.exports = mongoose.model("product", ProductSchema);
