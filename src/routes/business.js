const BusinessController = require("../controllers/business");
const express = require("express");
const router = express.Router();

/**
 * @api {post} /business/add AddBusiness
 * @apiVersion 1.0.0
 * @apiName AddBusiness
 * @apiGroup Business
 *
 */
router.post("/add", (req, res) =>
  BusinessController.default.addBusiness(req, res)
);

/**
 * @api {get} /business/get/:id GetBusiness
 * @apiVersion 1.0.0
 * @apiName GetBusiness
 * @apiGroup Business
 *
 */
router.get("/getAllBusiness", (req, res) =>
  BusinessController.default.getAllBusinesses(req, res)
);

/**
 * @api {put} /business/edit/:id EditBusiness
 * @apiVersion 1.0.0
 * @apiName EditBusiness
 * @apiGroup Business
 *
 */
router.put("/edit/:id", (req, res) =>
  BusinessController.default.editBusiness(req, res)
);

/**
 * @api {delete} /business/delete/:id DeleteBusiness
 * @apiVersion 1.0.0
 * @apiName DeleteBusiness
 * @apiGroup Business
 *
 */
router.delete("/delete/:id", (req, res) =>
  BusinessController.default.deleteBusiness(req, res)
);

module.exports = router;
