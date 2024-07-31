const Business = require("../models/business");

async function addBusiness(req, res, next) {
  try {
    const business = new Business({
      ...req.body,
    });
    const savedBusiness = await business.save();
    return res.status(200).json(savedBusiness);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

async function editBusiness(req, res, next) {
  try {
    const updatedBusiness = await Business.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("updatedBusiness", updatedBusiness);
    return res.status(200).json({
      status: "success",
      message: "Successfully edited.",
    });
  } catch (err) {
    console.log("err", err);
    return res.json({
      status: "error",
      message: "Business edit failed.",
    });
  }
}

async function getAllBusinesses(req, res, next) {
  try {
    const businesses = await Business.find();
    console.log("businesses", businesses);
    return res.status(200).json(businesses);
  } catch (err) {
    console.log("err", err);
    return res.json(err);
  }
}

async function deleteBusiness(req, res, next) {
  try {
    await Business.findByIdAndDelete(req.params.id);
    console.log("--------------------------");
    return res.json({
      status: "success",
      message: "Business successfully deleted!",
    });
  } catch (err) {
    console.log("err", err);
    return res.json({
      status: "error",
      message: "Business deletion failed.",
      data: err,
    });
  }
}

export default {
  addBusiness,
  editBusiness,
  getAllBusinesses,
  deleteBusiness,
};
