import Validation from "../validations/index";
import { validator } from "../middlewares";

import AuthController from "../controllers/auth";
const express = require("express");
const router = express.Router();

/**
 * @api {post} /users/register Register
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 *
 */
router.post(
  "/register",
  Validation.auth.validateRegister,
  validator,
  (req, res) => AuthController.register(req, res)
);

/**
 * @api {post} /users/login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 *
 *
 */
router.post("/login", Validation.auth.validateLogin, validator, (req, res) =>
  AuthController.login(req, res)
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
  (req, res) => AuthController.checkEmail(req, res)
);

/**
 * @api {post} /users/forgotPassword Forgot Password
 * @apiVersion 1.0.0
 * @apiName Forgot Password
 * @apiGroup Auth
 
 *
 */
router.post(
  "/forgotPassword",
  Validation.auth.validateForgotPassword,
  validator,
  (req, res) => AuthController.forgotPassword(req, res)
);

/**
 * @api {post} /users/resetPassword Reset Password
 * @apiVersion 1.0.0
 * @apiName Reset Password
 * @apiGroup Auth
 *
 */
router.post(
  "/resetPassword",
  Validation.auth.validateResetPassword,
  validator,
  (req, res) => AuthController.resetPassword(req, res)
);

module.exports = router;
