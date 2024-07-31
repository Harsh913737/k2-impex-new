import Product from "../models/products";
const { check, param } = require("express-validator");

export default {
  validateAddProduct: [
    check("adminId").exists().withMessage("adminId is required"),
    check("name").exists().withMessage("name is required"),
    check("details").exists().withMessage("details are required"),
    check("code").exists().withMessage("code is required"),
    check("availableAt").exists().withMessage("availableAt is required"),
    check("price").exists().withMessage("price is required"),
  ],
  validateEditProduct: [
    check("adminId").exists().withMessage("adminId is required"),
    check("name").exists().withMessage("name is required"),
    check("details").exists().withMessage("details are required"),
    check("code").exists().withMessage("code is required"),
    check("availableAt").exists().withMessage("availableAt is required"),
  ],
  validateDeleteProduct: [
    param("id")
      .exists()
      .withMessage("id not found")
      .custom((value) => {
        return Product.findOne({ _id: value }).then((item) => {
          if (!item) {
            return Promise.reject(value + " not found");
          }
        });
      }),
  ],
};
