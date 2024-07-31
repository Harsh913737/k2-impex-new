import Validation from "../validations/index";
import { validator } from "../middlewares";

const ProductController = require("../controllers/products");
const CustomerController = require("../controllers/customers");
const express = require("express");
const router = express.Router();

/**
 * @api {post} /add addProduct
 * @apiVersion 1.0.0
 * @apiName addProduct
 * @apiGroup Product
 *
 */
router.post("/otp", (req, res) => CustomerController.getOtp(req, res));
router.post("/add-customers", (req, res) =>
  CustomerController.AddCustomer(req, res)
);

/**
 * @api {post} /users/login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 *
 *
 */
router.post(
  "/check-email",
  Validation.auth.validateCheckEmail,
  validator,
  (req, res) => authController.checkEmail(req, res)
);

/**
 * @api {put} /edit editProduct
 * @apiVersion 1.0.0
 * @apiName editProduct
 * @apiGroup Product
 *
 */
router.put("/edit/:id", (req, res) =>
  CustomerController.editCustomer(req, res)
);

/**
 * @api {put} /edit editProduct
 * @apiVersion 1.0.0
 * @apiName editProduct
 * @apiGroup Product
 *
 */
router.put("/updateGuestUser/:customerId", (req, res) =>
  CustomerController.updateGuestUser(req, res)
);

/**
 * @api {get} /get getProduct
 * @apiVersion 1.0.0
 * @apiName getAllProducts
 * @apiGroup Product
 *
 */
router.get("/get-all-customers/:adminId", (req, res) =>
  CustomerController.getAllCustomers(req, res)
);

/**
 * @api {delete} /delete addProduct
 * @apiVersion 1.0.0
 * @apiName deleteProduct
 * @apiGroup Product
 *
 */
router.put("/delete/:id", (req, res) =>
  CustomerController.deleteCustomer(req, res)
);

/**
 * @api {post} /otp/send-otp Otp
 * @apiVersion 1.0.0
 * @apiName sendOtp
 * @apiGroup Otp
 *
 */
router.post(
  "/authenticate",
  Validation.customer.validateAuthenticate,
  validator,
  (req, res) => CustomerController.authenticate(req, res)
);

module.exports = router;
