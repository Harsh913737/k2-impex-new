const Product = require("../models/products");

async function addProduct(req, res, next) {
  try {
    const {
      adminId,
      categoryId,
      businessId,
      catalogusName,
      details,
      designNumber,
      availableAt,
      defaultPrice,
      quantity,
      unit,
      totalquantityPerBox,
      productPhoto,
    } = req.body;

    const product = new Product({
      adminId,
      categoryId,
      businessId,
      catalogusName,
      details,
      designNumber,
      availableAt,
      defaultPrice,
      quantity,
      unit,
      totalquantityPerBox,
      productPhoto,
    });

    const productSave = await product.save();

    return res.status(200).send(productSave);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

async function editProduct(req, res, next) {
  console.log("/////////////////////////////", req.body);
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      // req.body,
      { new: true }
    );
    console.log("updatedProduct", updatedProduct);
    return res.status(200).json({
      status: "success",
      message: "Successfully edited.",
    });
  } catch (err) {
    console.log("err", err);
    return res.json({
      status: "error",
      message: "Product edit failed.",
    });
  }
}

async function getAllProducts(req, res, next) {
  try {
    // const { adminId } = req.params;
    const productFound = await Product.find()
      .populate({
        path: "categoryId",
        options: { strictPopulate: false },
        model: "category",
      })
      .populate({
        path: "businessId",
        options: { strictPopulate: false },
        model: "business",
      });
    // console.log("productFound", productFound);
    return res.status(200).json(productFound);
  } catch (err) {
    console.log("err", err);
    return res.json(err);
  }
}

async function deleteProduct(req, res, next) {
  // try{
  //   const deleteProduct = Product.deleteOne({ _id: req.params.id })
  //   return res.json({
  //     "success": true,
  //     data: deleteProduct})
  // }
  try {
    console.log("req.params.id", req.params.id);
    await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        isDeleted: true,
      }
    );
    console.log("--------------------------");
    return res.json({
      status: "success",
      message: "Product successfully deleted!",
    });
  } catch (err) {
    console.log("err", err);
    return res.json({
      status: "error",
      message: "Product deletion failed.",
      data: err,
    });
  }
}

export default {
  addProduct,
  editProduct,
  getAllProducts,
  deleteProduct,
};
