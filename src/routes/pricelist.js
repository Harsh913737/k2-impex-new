const PriceListController = require("../controllers/pricelist");
const express = require("express");
const router = express.Router();

const { validator } = require("../middlewares");
const Validation = require("../validations/index");

router.post("/add-price-list", (req, res) =>
  PriceListController.addPriceList(req, res)
);

router.put("/edit-price-list", (req, res) =>
  PriceListController.editPriceList(req, res)
);

router.get("/get-price-list/:adminId", (req, res) =>
  PriceListController.getPriceList(req, res)
);

router.get("/get-price-list-by-customerId/:customerId", (req, res) =>
  PriceListController.getPriceByCustomerId(req, res)
);
module.exports = router;
