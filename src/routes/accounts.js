const AccountsController = require("../controllers/accounts");
const express = require("express");
const router = express.Router();

/**
 * @api {post} /add addAccount
 * @apiVersion 1.0.0
 * @apiName addAccount
 * @apiGroup Account
 *
 */

router.post("/add-account", (req, res) =>
  AccountsController.createAccount(req, res)
);

// /**
//  * @api {put} /edit editAccount
//  * @apiVersion 1.0.0
//  * @apiName editAccount
//  * @apiGroup Account
//  *
//  */
// router.put("/edit/:id", (req, res) =>
//   AccountsController.editCustomer(req, res)
// );

/**
 * @api {get} /get getAccount
 * @apiVersion 1.0.0
 * @apiName getAllAccount
 * @apiGroup Account
 *
 */
router.get("/get-all-accounts/:adminId", (req, res) =>
  AccountsController.getAllAccounts(req, res)
);

/**
 * @api {get} /get getAccount
 * @apiVersion 1.0.0
 * @apiName getAllAccount
 * @apiGroup Account
 *
 */
router.get(
  "/get-account-by-customerId/:customerId/:selectedYear/:selectedMonth",
  (req, res) => AccountsController.getCustomerAccount(req, res)
);

module.exports = router;
