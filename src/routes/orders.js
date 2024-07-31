// this will be root for all routes related to orders
//
const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orders");
const { validator } = require("../middlewares");
const Validation = require("../validations/index");

router.post(
  "/create-order",

  (req, res) => OrderController.createOrder(req, res)
);

router.put("/edit-order", (req, res) =>
  OrderController.updateOrderById(req, res)
);

router.get("/get-order", (req, res) => OrderController.getOrder(req, res));

router.get("/get-order-by-id", (req, res) =>
  OrderController.getOrderById(req, res)
);

router.get("/get-order-by-customer", (req, res) =>
  OrderController.getOrderByCustomer(req, res)
);

router.get("/get-all-orders", (req, res) =>
  OrderController.getAllOrders(req, res)
);

router.get("/get-orders-by-customerId/:customerId", (req, res) =>
  OrderController.getOrderByCustomerId(req, res)
);
router.get("/generate-invoice/:orderId", (req, res) => {
  const { orderId } = req.params;
  OrderController.generateInvoice(orderId, (error, invoicePath) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to generate invoice",
        error: error.message,
      });
    }

    return res.download(invoicePath, "invoice.pdf", (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to download invoice",
          error: err.message,
        });
      }

      // Delete the generated invoice file after it has been downloaded
      fs.unlinkSync(invoicePath);
    });
  });
});

module.exports = router;
