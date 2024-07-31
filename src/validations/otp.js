const { check, param } = require("express-validator");

export default {
  validateSendOtp: [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("The Email Address is in an invalid format."),
  ],
  validateAuthenticate: [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("The Email Address is in an invalid format."),
    check("otpValue").exists().withMessage("otp is required"),
  ],
};
