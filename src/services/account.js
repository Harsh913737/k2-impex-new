// const Business = require('../models/business')
const User = require("../models/guestUser");
const Admin = require("../models/admin");

const getAuthAdminInfo = async (adminId) => {
  let admin = await Admin.findById(adminId).exec();
  admin = Admin.detailForAuth(admin);
  // admin.business = Business.detailForManager(admin.business);
  return admin;
};

export default {
  getAuthAdminInfo,
};
