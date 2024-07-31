const csvtojson = require("csvtojson");
const products = require("../models/products");
const customer = require("../models/customer");

const collectionName = "products"; // Replace with the name of your collection

async function UploadProductsCsv(req, res) {
  try {
    const jsonArray = await csvtojson().fromFile(req.file.path);
    const result = await products.insertMany(jsonArray); // Insert the JSON data into MongoDB

    console.log(result);

    res
      .status(200)
      .json({ message: "CSV products data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading CSV:", error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the CSV" });
  }
}

async function UploadCustomersCsv(req, res) {
  try {
    const jsonArray = await csvtojson().fromFile(req.file.path);

    const result = await customer.insertMany(jsonArray); // Insert the JSON data into MongoDB

    console.log(result);

    res
      .status(200)
      .json({ message: "CSV customer data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading CSV:", error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the CSV" });
  }
}

module.exports = {
  UploadProductsCsv,
  UploadCustomersCsv,
};
