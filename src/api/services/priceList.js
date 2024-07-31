import { serverConfig } from "../Configs/server-config";
import API from "../index";

const BASE_URL = `${serverConfig.appServerUrl}/pricelist`;

const getAllPrices = (customerId, callback) => {
  API({
    method: "GET",
    url: `${BASE_URL}/get-price-list-by-customerId/${customerId}`,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in getting priceLists");
      callback({ status: "error" });
    });
};
const addPrice = (newPriceData, callback) => {
  API({
    method: "POST",
    url: `${BASE_URL}/add-price-list`,
    data: newPriceData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in creating the price");
      callback({ status: "error" });
    });
};

const updatePrice = (priceId, updatedData, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/edit-price-list/${priceId}`,
    data: updatedData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in updating the price");
      callback({ status: "error" });
    });
};

const deletePrice = (priceId, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL}/delete/${priceId}`,
  })
    .then(() => {
      callback({ status: "success" });
    })
    .catch((err) => {
      console.log(err, "error occurred in deleting the price");
      callback({ status: "error" });
    });
};

const priceLists = {
  getAllPrices,
  deletePrice,
  updatePrice,
  addPrice,
};

export default priceLists;
