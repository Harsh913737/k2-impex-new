const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
  },
  orderId: {
    type: Number,
    unique: true,
    required: false,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  transportationCharges: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  rejectionMessage: {
    type: String,
  },
  orderedByName: {
    type: String,
  },
  orderedByPhone: {
    type: String,
  },

  createdAt: { type: Date, default: Date.now },
});

OrderSchema.pre("save", async function (next) {
  const latestOrder = await this.constructor.findOne(
    {},
    {},
    { sort: { orderId: -1 } }
  );

  if (latestOrder) {
    const latestOrderId = latestOrder.orderId;
    this.orderId = latestOrderId + 1;
  } else {
    this.orderId = 1;
  }

  next();
});

module.exports = mongoose.model("order", OrderSchema);
