import Validation from "../validations/index";
import { validator } from "../middlewares";
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const ProductController = require("../controllers/products");
const express = require("express");
const router = express.Router();

/**
 * @api {post} /add addProduct
 * @apiVersion 1.0.0
 * @apiName addProduct
 * @apiGroup Product
 *
 */

const spacesEndpoint = new aws.Endpoint("https://sgp1.digitaloceanspaces.com");
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "zoommantra",
    acl: "public-read",
    region: "BLR1",
    key: function (request, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.post(
  "/add",
  upload.single("productPhoto"),
  (req, res, next) => {
    req.body.productPhoto = req.file ? req.file.location : null; // Set the productPhoto field with the uploaded image URL or null if no file uploaded
    next();
  },
  (req, res) => {
    ProductController.default.addProduct(req, res);
  }
);

/**
 * @api {put} /edit editProduct
 * @apiVersion 1.0.0
 * @apiName editProduct
 * @apiGroup Product
 *
 */
router.put("/edit/:id", Validation.product.validateEditProduct, (req, res) =>
  ProductController.default.editProduct(req, res)
);

/**
 * @api {get} /get getProduct
 * @apiVersion 1.0.0
 * @apiName getAllProducts
 * @apiGroup Product
 *
 */
router.get("/get-all-products/:adminId", (req, res) =>
  ProductController.default.getAllProducts(req, res)
);


/**
 * @api {get} /get getProduct
 * @apiVersion 1.0.0
 * @apiName getAllProducts
 * @apiGroup Product
 *
 */
router.get("/get-all-products/user", (req, res) =>
  ProductController.default.getAllProducts(req, res)
);



/**
 * @api {get} /getByAdminId getProduct
 * @apiVersion 1.0.0
 * @apiName getByAdminId
 * @apiGroup Product
 *
 */

/**
 * @api {delete} /delete addProduct
 * @apiVersion 1.0.0
 * @apiName deleteProduct
 * @apiGroup Product
 *
 */
router.put(
  "/delete/:id",
  Validation.product.validateDeleteProduct,
  (req, res) => ProductController.default.deleteProduct(req, res)
);

module.exports = router;
