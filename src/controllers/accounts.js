// In this file we will handle all the requests related to accounts
// where we will calculate the outstanding amount of every customer
// also profit and loss of every customer
// we will be using the concept of aggregation in mongodb
//

const Account = require("../models/accounts");

module.exports = {
  // here we will create account for customer
  createAccount: async (req, res, check) => {
    try {
      const { customerId, orders } = req.body;
      console.log(customerId, orders);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      let account = await Account.findOne({
        customerId: customerId,
        createdAt: {
          $gte: new Date(currentYear, currentMonth, 1),
          $lt: new Date(currentYear, currentMonth + 1, 1),
        },
      });

      if (account) {
        console.log("Existing account", account);

        // Update existing account with new orders

        let updatedAccount = await Account.findOneAndUpdate(
          {
            customerId: customerId,
            createdAt: {
              $gte: new Date(currentYear, currentMonth, 1),
              $lt: new Date(currentYear, currentMonth + 1, 1),
            },
          },
          {
            $set: {
              orders: [...account.orders, ...orders],
            },
          },
          { new: true }
        );

        console.log("Updated account", updatedAccount);
        if(check) {
          return {
            message: "Account updated successfully",
            success: true,
          }
        }else {
          return res.status(200).json({
            result: {
              message: "Account updated successfully",
              success: true,
            },
            data: updatedAccount,
          });
        }
       
      } else {
        // Create a new account

        let newAccount = new Account({
          customerId: customerId,
          orders: orders,
        });

        console.log("New account", newAccount);
        await newAccount.save();
        if(check) {
          return {
            message: "Account updated successfully",
            success: true,
          }
        } else {
          return res.status(200).json({
            result: {
              message: "Account updated successfully",
              success: true,
            },
            data: newAccount,
          });
        }
       
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  // here we will get all the accounts

  getCustomerAccount: async (req, res) => {
    try {
      const { customerId, selectedMonth, selectedYear } = req.params;

      // Parse the selectedMonth and selectedYear as integers
      const month = parseInt(selectedMonth);
      const year = parseInt(selectedYear);

      // Calculate the start and end dates of the selected month and year
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      // Find accounts with createdAt within the selected month and year
      const accounts = await Account.findOne({
        customerId,
        createdAt: { $gte: startDate, $lte: endDate },
      })
        .populate({
          path: "customerId",
          options: { strictPopulate: false },
          model: "customer",
        })
        .populate({
          path: "orders.orderId",
          options: { strictPopulate: false },
          model: "order",
        });

      if (accounts) {
        return res.status(200).json({
          message: "Accounts Found",
          data: accounts,
        });
      } else {
        return res.status(200).json({
          message: "Accounts not found",
          data: { orders: [] },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  getAllAccounts: async (req, res) => {
    try {
      let account = await Account.find()
        .populate({
          path: "customerId",
          options: { strictPopulate: false },
          model: "customer",
        })
        .populate({
          path: "orders.orderId",
          options: { strictPopulate: false },
          model: "order",
        });
      if (account) {
        return res.status(200).json({
          message: "Accounts Found",
          data: account,
        });
      } else {
        return res.status(400).json({
          message: "Accounts not found",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
