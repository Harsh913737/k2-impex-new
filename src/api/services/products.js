import { serverConfig } from "../Configs/server-config";
import API from "../index";

const BASE_URL = `${serverConfig.appServerUrl}/product`;

const getAllProducts = (adminId, callback) => {
  API({
    method: "GET",
    url: `${BASE_URL}/get-all-products/user}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in getting products");
      callback({ status: "error" });
    });
};

const addProduct = (newProductData, callback) => {
  API({
    method: "POST",
    url: `${BASE_URL}/add`,
    data: newProductData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in creating the product 1");
      callback({ status: "error" });
    });
};

const updateProduct = (productId, updatedData, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/edit/${productId}`,
    data: updatedData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in updating the product");
      callback({ status: "error" });
    });
};

const deleteProduct = (productId, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/delete/${productId}`,
  })
    .then(() => {
      callback({ status: "success" });
    })
    .catch((err) => {
      console.log(err, "error occurred in deleting the product");
      callback({ status: "error" });
    });
};

const products = {
  getAllProducts,
  deleteProduct,
  updateProduct,
  addProduct,
};

export default products;
