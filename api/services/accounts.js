import { serverConfig } from "../Configs/server-config";
import API from "../index";

const BASE_URL = `${serverConfig.appServerUrl}/account`;

const getAllAccounts = (adminId, callback) => {
  API({
    method: "GET",
    url: `${BASE_URL}/get-all-accounts/${adminId}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in getting accounts");
      callback({ status: "error" });
    });
};

const getCustomerAccount = (
  customerId,
  selectedYear,
  selectedMonth,
  callback
) => {
  API({
    method: "GET",
    url: `${BASE_URL}/get-account-by-customerId/${customerId}/${selectedYear}/${selectedMonth}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in getting accounts");
      callback({ status: "error" });
    });
};

const addAccount = (newAccountData, callback) => {
  API({
    method: "POST",
    url: `${BASE_URL}/add-accounts`,
    data: newAccountData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in creating the account");
      callback({ status: "error" });
    });
};

const updateAccount = (accountId, updatedData, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/edit/${accountId}`,
    data: updatedData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in updating the account");
      callback({ status: "error" });
    });
};

const deleteAccount = (accountId, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/delete/${accountId}`,
  })
    .then(() => {
      callback({ status: "success" });
    })
    .catch((err) => {
      console.log(err, "error occurred in deleting the account");
      callback({ status: "error" });
    });
};

const accounts = {
  getAllAccounts,
  deleteAccount,
  updateAccount,
  addAccount,
  getCustomerAccount,
};

export default accounts;
