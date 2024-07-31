const CsvController = require("../controllers/csv");
const express = require("express");
const router = express.Router();
const csvtojson = require("csvtojson");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set the original filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

/**
 * @api {post} /upload uploadCsv
 * @apiVersion 1.0.0
 * @apiName uploadCsv
 * @apiGroup Csv
 *
 */
router.post("/upload-products-csv", upload.single("csvFile"), (req, res) =>
  CsvController.UploadProductsCsv(req, res)
);

/**
 * @api {post} /upload uploadCsv
 * @apiVersion 1.0.0
 * @apiName uploadCsv
 * @apiGroup Csv
 *
 */
router.post("/upload-customers-csv", upload.single("csvFile"), (req, res) =>
  CsvController.UploadCustomersCsv(req, res)
);

module.exports = router;
