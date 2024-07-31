const CategoryController = require("../controllers/category");
const express = require("express");
const router = express.Router();

/**
 * @api {post} /categories/add AddCategory
 * @apiVersion 1.0.0
 * @apiName AddCategory
 * @apiGroup Category
 *
 */
router.post("/add", (req, res) =>
  CategoryController.default.addCategory(req, res)
);

/**
 * @api {get} /categories/get/:id GetCategory
 * @apiVersion 1.0.0
 * @apiName GetCategory
 * @apiGroup Category
 *
 */
router.get("/getAllCategories", (req, res) =>
  CategoryController.default.getAllCategories(req, res)
);

/**
 * @api {put} /categories/edit/:id EditCategory
 * @apiVersion 1.0.0
 * @apiName EditCategory
 * @apiGroup Category
 *
 */
router.put("/edit/:id", (req, res) =>
  CategoryController.default.editCategory(req, res)
);

/**
 * @api {delete} /categories/delete/:id DeleteCategory
 * @apiVersion 1.0.0
 * @apiName DeleteCategory
 * @apiGroup Category
 *
 */
router.delete("/delete/:id", (req, res) =>
  CategoryController.default.deleteCategory(req, res)
);

module.exports = router;
