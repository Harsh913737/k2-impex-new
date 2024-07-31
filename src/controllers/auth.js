import Services from "../services/index";
import { sendEmail } from "../common/utils";
import * as EmailTemplates from "../common/email_templates";
import randomstring from "randomstring";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Business = require("../models/business1");
const Constants = require("../common/constants");
require("mongoose-pagination");

function loginAdmin(admin, res) {
  const generateToken = async (admin, res) => {
    const token = jwt.sign(
      { id: admin._id, admin: admin.email },
      Constants.JWTSecret
    );
    console.log(admin.business, "business");
    res.json({ token, ...admin });
  };

  if (!admin) {
    res
      .status(401)
      .json({ message: __("The username or password is incorrect") });
  } else {
    if (admin.enable) {
      Services.account
        .getAuthAdminInfo(admin._id)
        .then((admin) => {
          generateToken(admin, res);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.status(401).json({ message: __("The admin is blocked") });
    }
  }
}

async function register(req, res, next) {
  console.log(req.body);
  try {
    const { fullName, email, role, password, authType } = req.body;
    if (authType === "company") {
      const business = new Business({ name: companyName, category: category });
      let businessResult = await business.save();
      if (businessResult) {
        // business.save((err, item) => {
        // if (err) return next(err);
        const hash = bcrypt.hashSync(password, 10);
        const admin = new Admin({
          fullName,
          email,
          role,
          businessId: businessResult._id,
          password: hash,
        });
        let userResult = await admin.save();
        if (userResult) {
          try {
            if (!Constants.AutoLogin) {
              res.send(admin);
            } else {
              loginUser(admin, res);
            }
          } catch (error) {
            console.log(error);
          }
        }
        // });
      }
    } else {
      const hash = bcrypt.hashSync(password, 10);
      const admin = new Admin({
        fullName,
        email,
        role,
        password: hash,
        // businessId: item._id,
      });
      let userResult = await admin.save();
      if (userResult) {
        try {
          if (!Constants.AutoLogin) {
            res.send(admin);
          } else {
            loginUser(admin, res);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}

async function login(req, res) {
  try {
    let admin = await Admin.findOne({
      email: req.body.email,
      // authType: Constants.AuthType.Email
    });
    if (admin) {
      if (bcrypt.compareSync(req.body.password, admin.password)) {
        loginAdmin(admin, res);
      } else {
        res.status(400).send({ message: __("The password is incorrect.") });
      }
    } else {
      res.status(400).send({ message: __("The account is not existed.") });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: __("The account is not existed.") });
  }
}

async function updateUser(req, res, next) {
  User.findOneAndUpdate(
    { _id: req.userId },
    { $set: req.body },
    (err, item) => {
      if (err) return next(err);
      User.findById(req.userId, (err, user) => {
        if (err) return next(err);
        res.status(200).json(user);
      });
    }
  );
}

async function forgotPassword(req, res, next) {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    const resetCode = randomstring.generate({ charset: "numeric", length: 6 });
    await Admin.updateOne({ _id: admin._id }, { $set: { resetCode } });
    await sendEmail(
      admin.email,
      EmailTemplates.ForgotPassword(resetCode).title,
      EmailTemplates.ForgotPassword(resetCode).html
    );
    res.status(200).json({
      token: admin._id,
      message:
        "We sent the code to your email. Please check the email and use that code to reset the password.",
    });
  } catch (error) {
    next(error);
  }
}

async function checkEmail(req, res) {
  try {
    const email = req.body.email;
    const admin = await Admin.findOne({ email: email });

    // If admin is found, send a JSON response with "isValid" set to true
    if (admin) {
      return res.json({ isValid: true });
    } else {
      // If admin is not found, send a JSON response with "isValid" set to false
      return res.json({ isValid: false });
    }
  } catch (error) {
    console.log(error);
    // If an error occurs, send a JSON response with "isValid" set to false and include the error message
    return res.json({ isValid: false, error: error.message });
  }
}

async function resetPassword(req, res, next) {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    await Admin.updateOne({ _id: req.body.token }, { $set: { hash } });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}

async function changePassword(req, res, next) {
  User.findById(req.userId, (err, user) => {
    if (err) return res.status(500).send(err);
    if (bcrypt.compareSync(req.body.oldPass, user.hash)) {
      User.findOneAndUpdate(
        { _id: req.userId },
        { $set: { hash: bcrypt.hashSync(req.body.newPass, 10) } },
        (err, item) => {
          if (err) return res.status(500).send(err);
          res.status(200).json({ success: true });
        }
      );
    } else {
      res.status(400).send({ message: __("The password is incorrect.") });
    }
  });
}

async function addStaff(req, res, next) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    ...req.body,
    hash,
    role: Constants.Role.Staff,
    business: req.business,
  });
  user.save((err, user) => {
    if (err) return next(err);
    res.send(user);
  });
}
async function editStaff(req, res, next) {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    (err, item) => {
      if (err) return next(err);
      User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        res.json(user);
      });
    }
  );
}

async function getStaffs(req, res, next) {
  User.find(
    { role: Constants.Role.Staff, business: req.business, enable: true },
    (err, items) => {
      if (err) return next(err);
      res.send(items);
    }
  );
}

async function deleteStaff(req, res, next) {
  User.update({ _id: req.params.id }, { $set: { enable: false } }, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
}

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  checkEmail,
};
