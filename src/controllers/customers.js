const customer = require("../models/customer");
const guestUser = require("../models/guestUser");
const fs = require("fs");
const csv = require("fast-csv");
// const EmailService = require("../middleware/EmailService");
const emailService = require("../middlewares/emailService");
const accounts = require("../models/accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Constants = require("../common/constants");

const AddCustomer = async (req, res) => {
  try {
    const {
      adminId,
      companyName,
      name,
      email,
      creditLimit,
      periodLimit,
      businessId,
    } = req.body;
    let isUser = await customer.findOne({ email, isDeleted: false }, ).lean();
    if (isUser) {
      res.status(500).json({ error: "User Already Exist" });
    } else {
      const password = generatePassword(); // Generate a random password

      // Hash the password
      console.log('password',password)
      // const hashedPassword = bcrypt.hashSync(password, 10);
      // console.log('hashed', hashedPassword)
      console.log(businessId, "id");
      const newCustomer = new customer({
        adminId,
        companyName,
        name,
        email,
        creditLimit,
        periodLimit,
        businessId,
        password,
        outstandingAmount: 0,
      });
      console.log(newCustomer);
      let finalResult = await newCustomer.save();
      if (finalResult) {
        let newAccount = new accounts({
          customerId: finalResult._id,
          orders: [],
        });
        console.log("New account", newAccount);
        await newAccount.save();
      }

      if (finalResult) {
        await emailService.emailService(
          {
            user: "info@k2impex.in",
            password: "dihjhvlxgjvucuhl",
          },
          "info@k2impex.in",
          email,
          "K2 Implex Account created successfully",
          `
         
          Your account has been created successfully.

          Here are your login details:
          Email: ${email}
          Password: ${password}

          Please keep your login details secure and do not share them with anyone.
          Thank you!
        `
        );
        res.status(200).json({ finalResult });
      } else {
        res.status(500).json({ error: "Something went wrong" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Function to generate a random password
function generatePassword() {
  // Generate a random number between 1000 and 9999
  const password = Math.floor(Math.random() * 9000) + 1000;
  return password.toString();
}

const getAllCustomers = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    const customerFound = await customer.find({ adminId: adminId, isDeleted: false }).populate({
      path: "businessId",
      options: { strictPopulate: false },
      model: "business",
    }); //{isDeleted: false}
    console.log("customerFound", customerFound);
    return res.status(200).json(customerFound);
  } catch (err) {
    console.log("err", err);
    return res.json(err);
  }
};

const editCustomer = async (req, res) => {
  try {
    const { companyName, name, email, creditLimit, periodLimit, businessId } =
      req.body;
    let updatedUser = await customer.findOneAndUpdate(
      {
        email,
      },
      {
        $set: {
          companyName,
          name,
          email,
          creditLimit,
          periodLimit,
          businessId,
        },
      }
    );

    if (updatedUser) {
      res.status(200).json({ updatedUser });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateGuestUser = async (req, res) => {
  try {
    const { guestName, phone } = req.body;
    const { customerId } = req.params;

    let existingGuestUser = await guestUser.findOne({
      customerId: customerId,
      guestName: guestName,
      phone: phone,
    });

    if (existingGuestUser) {
      // Update existing guestUser
      existingGuestUser.guestName = guestName;
      existingGuestUser.phone = phone;

      let GuestUser = await existingGuestUser.save();
      res.status(200).json(GuestUser);
    } else {
      // Create new guestUser
      let newGuestUser = new guestUser({
        customerId: customerId,
        guestName: guestName,
        phone: phone,
      });

      let GuestUser = await newGuestUser.save();
      res.status(200).json(GuestUser);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const disableCustomer = async (req, res) => {
  try {
    let { email } = req.body;
    let updatedCustomer = customer.findOneAndUpdate(
      { email },
      {
        $set: {
          isEnable: false,
        },
      }
    );

    if (updatedCustomer) {
      res.status(200).json({ updatedCustomer });
    } else {
      res.status(500).json({ error: "Something Went Wrong" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getOtp = async (req, res) => {
  try {
    let { email } = req.body;
    const generateOTP = async () => {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return parseInt(OTP);
    };
    let emailResponse = await emailService.emailService(
      {
        user: " sahilshah@widski.com",
        password: "Universe@69",
      },
      "sahilshah@widski.com",
      email,
      "OTP for your K2Implex Login",
      `Your OTP for LOGIN:${generateOTP()} `
    );
    if (emailResponse) {
      console.log(emailResponse);
      // res.status(200).json({emailResponse})
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const customerLogin = async (req, res) => {
  try {
    let { email, otp } = req.body;
  } catch (err) {}
};

const deleteCustomer = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    await customer.findByIdAndRemove(
      { _id: req.params.id },
    );

    
    console.log("--------------------------");
    return res.json({
      status: "success",
      message: "Customer successfully deleted!",
    });
  } catch (err) {
    console.log("err", err);
    return res.json({
      status: "error",
      message: "Customer deletion failed.",
      data: err,
    });
  }
};

async function checkEmail(req, res) {
  try {
    const email = req.body.email;
    const user = await customer.findOne({ email: email });

    // If admin is found, send a JSON response with "isValid" set to true
    if (user) {
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

const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await customer.findOne({ email: email });
    if (user) {
      console.log(user.password);
      console.log(password);

      console.log(password.toString() === user.password.toString())
      if (password.toString() === user.password.toString()) {
        const token = jwt.sign({ user }, Constants.JWTSecret);
        res.status(200).json({
          message: "User verified",
          token,
          success: true,
        });
      } else {
        res.status(400).json({
          message: "Invalid Password",
          success: false,
        });
      }
    } else {
      res.status(400).json({
        message: "Email not registered",
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  AddCustomer,
  editCustomer,
  disableCustomer,
  getOtp,
  customerLogin,
  getAllCustomers,
  deleteCustomer,
  authenticate,
  updateGuestUser,
  checkEmail,
};
