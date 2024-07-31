const { check, param } = require("express-validator");

export default {
  validateAuthenticate: [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("The Email Address is in an invalid format."),
    check("password").exists().withMessage("password is required"),
  ],
};
