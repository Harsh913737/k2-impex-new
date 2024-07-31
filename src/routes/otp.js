import Validation from "../validations/index";
import { validator } from "../middlewares";
import OtpController from "../controllers/otp";
import CustomerController from "../controllers/customers";
const express = require("express");
const router = express.Router();

/**
 * @api {post} /otp/send-otp Otp
 * @apiVersion 1.0.0
 * @apiName sendOtp
 * @apiGroup Otp
 *
 */
router.post(
  "/send-otp",
  Validation.otp.validateSendOtp,
  validator,
  (req, res) => OtpController.getOtp(req, res)
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
  (req, res) => CustomerController.checkEmail(req, res)
);

/**
 * @api {post} /otp/send-otp Otp
 * @apiVersion 1.0.0
 * @apiName sendOtp
 * @apiGroup Otp
 *
 */
router.post(
  "/authenticateOtp",
  Validation.otp.validateAuthenticate,
  validator,
  (req, res) => OtpController.authenticate(req, res)
);

module.exports = router;
