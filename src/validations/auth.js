/* eslint-disable prefer-promise-reject-errors */
import Constants from "../common/constants";
const Admin = require("../models/admin");
import Business from "../models/business1";
const { check, param } = require("express-validator");

export default {
  validateRegister: [
    check("fullName").exists().withMessage("fullName is required"),
    check("role").exists().withMessage("role is required"),
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("The Email Address is in an invalid format.")
      .custom((value) => {
        return Admin.findOne({ email: value }).then((item) => {
          console.log(item);
          if (item) {
            return Promise.reject(value + " is existed");
          }
        });
      }),
    check("password").exists().withMessage("password is required"),
  ],
  validateCheckEmail: [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("The Email Address is in an invalid format."),
  ],
  validateLogin: [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("The Email Address is in an invalid format."),
    check("password").exists().withMessage("password is required"),
  ],
  validateForgotPassword: [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("The Email Address is in an invalid format.")
      .custom((value) => {
        return Admin.findOne({ email: value }).then((item) => {
          if (!item) {
            return Promise.reject(value + " is not existed");
          }
        });
      }),
  ],
  validateResetPassword: [
    check("token")
      .exists()
      .withMessage("token is required")
      .custom((value) => {
        return Admin.findOne({ _id: value }).then((item) => {
          if (!item) {
            return Promise.reject(value + " is not existed");
          }
        });
      }),
    check("code")
      .exists()
      .withMessage("code is required")
      .custom((value, { req }) => {
        return Admin.findOne({ _id: req.body.token, resetCode: value }).then(
          (item) => {
            if (!item) {
              return Promise.reject("The code is incorrect.");
            }
          }
        );
      }),
    check("password").exists().withMessage("password is required"),
  ],
  validateChangePass: [
    check("oldPass").exists().withMessage("oldPass is required"),
    check("newPass").exists().withMessage("newPass is required"),
    check("confirmPass")
      .exists()
      .withMessage("confirmPass is required")
      .custom((value, { req }) => value == req.body.newPass)
      .withMessage("The password is not match."),
  ],
  validateUpdateAdmin: [
    check("email")
      .optional()
      .isEmail()
      .withMessage("The Email Address is in an invalid format.")
      .custom((value, { req }) => {
        return Admin.findOne({ email: value, _id: { $ne: req.adminId } }).then(
          (item) => {
            console.log("item", item);
            if (item) {
              return Promise.reject(value + " is existed");
            }
          }
        );
      }),
    check("role")
      .optional()
      .custom((value) => Object.values(Constants.Role).indexOf(value) > -1)
      .withMessage("Invalid role"),
    check("avatar")
      .optional()
      .custom((value) => {
        // return File.findOne({ file: value }).then((file) => {
        //   if (!file) {
        //     return Promise.reject('File not found')
        //   }
        // })
      }),
  ],
  validateUpdateStaff: [
    check("email")
      .optional()
      .isEmail()
      .withMessage("The Email Address is in an invalid format.")
      .custom((value, { req }) => {
        return User.findOne({ email: value, _id: { $ne: req.params.id } }).then(
          (item) => {
            if (item) {
              return Promise.reject(value + " is existed");
            }
          }
        );
      }),
    check("role")
      .optional()
      .custom((value) => Object.values(Constants.Role).indexOf(value) > -1)
      .withMessage("Invalid role"),
    check("avatar")
      .optional()
      .custom((value) => {
        // return File.findOne({ file: value }).then((file) => {
        //   if (!file) {
        //     return Promise.reject('File not found')
        //   }
        // })
      }),
  ],
  validateDeleteStaff: [
    param("id")
      .exists()
      .withMessage("id not found")
      .custom((value) => {
        return Admin.findOne({ _id: value, role: Constants.Role.Staff }).then(
          (item) => {
            if (!item) {
              return Promise.reject(value + " not found");
            }
          }
        );
      }),
  ],
};
