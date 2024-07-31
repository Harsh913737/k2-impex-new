const otp = require("../models/otp");
const fs = require("fs");
const csv = require("fast-csv");
const emailService = require("../middlewares/emailService");
const customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const Constants = require("../common/constants");

const getOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await customer.findOne({ email: email });

    if (user) {
      const generateOTP = () => {
        const digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };

      let otpData = await otp.findOne({ customerId: user._id });
      const generatedOTP = generateOTP();

      await emailService.emailService(
        {
          user: "basit.channa@widski.com",
          password: "vcwujsiidhouhgbm",
        },
        "basit.channa@widski.com",
        email,
        "OTP for your K2Implex Login",
        `Your OTP for LOGIN: ${generatedOTP}`
      );

      if (otpData) {
        otpData.otp = generatedOTP;
        otpData.expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
        await otpData.save();
      } else {
        const newOtp = new otp({
          customerId: user._id,
          otp: generatedOTP,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        });
        otpData = await newOtp.save();
      }

      res.status(200).json({
        IsPresent: true,
        message: "OTP sent successfully",
        otp: otpData.otp,
      });
    } else {
      res.status(200).json({
        IsPresent: false,
        message: "Email not registered",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const authenticate = async (req, res) => {
  try {
    const { email, otpValue } = req.body;
    const user = await customer.findOne({ email });

    if (user) {
      const otpData = await otp.findOne({ customerId: user._id });

      if (otpData) {
        if (otpData.otp === otpValue) {
          await emailService.emailService(
            {
              user: "basit.channa@widski.com",
              password: "vcwujsiidhouhgbm",
            },
            "basit.channa@widski.com",
            email,
            "K2 Implex Account details",
            `
            Here are your login details:
            Email: ${email}
  
            Please keep your login details secure and do not share them with anyone.
            Thank you!
          `
          );
          res.status(200).json({
            message: "OTP verified",
            success: true,
          });
        } else {
          res.status(400).json({
            message: "Invalid OTP",
            success: false,
          });
        }
      } else {
        res.status(400).json({
          message: "OTP not found",
          success: false,
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getOtp,
  authenticate,
};
