const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("business", BusinessSchema);
