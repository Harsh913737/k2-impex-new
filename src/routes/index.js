const express = require("express");
const router = express.Router();
let auth = require("./auth");
let products = require("./products");
let customer = require("./customer");
let pricelist = require("./pricelist");
let orders = require("./orders");
let accounts = require("./accounts");
let csv = require("./csv");
let otp = require("./otp");
let business = require("./business");
let category = require("./category");

router.use("/api/auth", auth);
router.use("/api/product", products);
router.use("/api/customer", customer);
router.use("/api/pricelist", pricelist);
router.use("/api/order", orders);
router.use("/api/account", accounts);
router.use("/api/csv", csv);
router.use("/api/otp", otp);
router.use("/api/business", business);
router.use("/api/category", category);
router.use("/api/otp", otp);

module.exports = router;
