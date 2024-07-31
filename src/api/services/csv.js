import { serverConfig } from "../Configs/server-config";
import API from "../index";

const BASE_URL = `${serverConfig.appServerUrl}/csv`;

const uploadCsvProductsFile = (formData, callback) => {
  API({
    method: "POST",
    url: `${BASE_URL}/upload-products-csv`,
    data: formData,
  })
    .then((response) => {
      callback({ status: "File successfully uploaded" });
    })
    .catch((err) => {
      console.log(err, "error occurred in uploading file");
      callback({ status: "error" });
    });
};

const uploadCsvCustomersFile = (formData, callback) => {
  API({
    method: "POST",
    url: `${BASE_URL}/upload-customers-csv`,
    data: formData,
  })
    .then((response) => {
      callback({ status: "File successfully uploaded" });
    })
    .catch((err) => {
      console.log(err, "error occurred in uploading file");
      callback({ status: "error" });
    });
};

const csv = {
  uploadCsvProductsFile,
  uploadCsvCustomersFile,
};

export default csv;
