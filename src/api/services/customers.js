import { serverConfig } from "../Configs/server-config";
import API from "../index";

const BASE_URL = `${serverConfig.appServerUrl}/customer`;

const getAllCustomers = (adminId, callback) => {
  API({
    method: "GET",
    url: `${BASE_URL}/get-all-customers/${adminId}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in getting customers");
      callback({ status: "error" });
    });
};

const addCustomer = (newCustomerData, callback) => {
  API({
    method: "POST",
    url: `${BASE_URL}/add-customers`,
    data: newCustomerData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in creating the customer");
      callback({ status: "error" });
    });
};

const deleteCustomer = (customerId, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/delete/${customerId}`,
  })
    .then(() => {
      callback({ status: "success" });
    })
    .catch((err) => {
      console.log(err, "error occurred in deleting the customer");
      callback({ status: "error" });
    });
};

const customers = {
  getAllCustomers,
  deleteCustomer,

  addCustomer,
};

export default customers;
