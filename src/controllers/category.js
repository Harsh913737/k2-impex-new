const Category = require("../models/category");

async function addCategory(req, res, next) {
  try {
    const category = new Category({
      ...req.body,
    });
    const savedCategory = await category.save();
    return res.status(200).json(savedCategory);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

async function editCategory(req, res, next) {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("updatedCategory", updatedCategory);
    return res.status(200).json({
      status: "success",
      message: "Successfully edited.",
    });
  } catch (err) {
    console.log("err", err);
    return res.json({
      status: "error",
      message: "Category edit failed.",
    });
  }
}

async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.find();
    console.log("categories", categories);
    return res.status(200).json(categories);
  } catch (err) {
    console.log("err", err);
    return res.json(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await Category.findByIdAndDelete(req.params.id);
    console.log("--------------------------");
    return res.json({
      status: "success",
      message: "Category successfully deleted!",
    });
  } catch (err) {
    console.log("err", err);
    return res.json({
      status: "error",
      message: "Category deletion failed.",
      data: err,
    });
  }
}

export default {
  addCategory,
  editCategory,
  getAllCategories,
  deleteCategory,
};
