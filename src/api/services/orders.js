import { serverConfig } from "../Configs/server-config";
import API from "../index";

const BASE_URL = `${serverConfig.appServerUrl}/order`;

const createOrder = (orderData, callback) => {
  console.log(orderData, "ooo");
  API({
    method: "POST",
    url: `${BASE_URL}/create-order`,
    data: orderData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in creating the order");
      callback({ status: "error" });
    });
};

const getAllOrders = (customerId, callback) => {
  API({
    method: "GET",
    url: `${BASE_URL}/get-orders-by-customerId/${customerId}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in getting orders");
      callback({ status: "error" });
    });
};

const getOrderById = (orderId, callback) => {
  API({
    method: "GET",
    url: `${BASE_URL}/get-order-by-id/${orderId}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in getting the order");
      callback({ status: "error" });
    });
};

const updateOrderById = (orderId, updatedData, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/edit-order`,
    data: {
      orderId: orderId,
      status: updatedData?.status,
      paymentStatus: updatedData?.paymentStatus,
    },
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in updating the order");
      callback({ status: "error" });
    });
};

const cancelOrderById = (orderId, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/cancel-order-by-id/${orderId}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in cancelling the order");
      callback({ status: "error" });
    });
};

const getOrderOfCustomer = (customerId, callback) => {
  API({
    method: "GET",
    url: `${BASE_URL}/get-order-of-customer/${customerId}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in getting the customer's orders");
      callback({ status: "error" });
    });
};

const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  cancelOrderById,
  getOrderOfCustomer,
};

export default orderService;
