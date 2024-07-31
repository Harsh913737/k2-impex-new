import axios from "axios";
import { serverConfig } from "./Configs/server-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./index";

const BASE_URL_AUTH = `${serverConfig.appServerUrl}/auth`;
const BASE_URL = `${serverConfig.appServerUrl}/otp`;
const BASE_URL_CUSTOMER = `${serverConfig.appServerUrl}/customer`;

const authenticate = async (credentials) => {
  try {
    const response = await axios.post(
      `${BASE_URL_CUSTOMER}/authenticate`,
      credentials
    );
    const data = response;
    return data;
  } catch (error) {
    // Handle authentication error
    console.error("Authentication failed:", error);
    throw error;
  }
};

const authenticateOtp = async (credentials) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/authenticateOtp`,
      credentials
    );
    const data = response;
    return data;
  } catch (error) {
    // Handle authentication error
    console.error("Authentication failed:", error);
    response = { success: false };
    return response;
  }
};

const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-otp`, email);
    const data = response;
    return data;
  } catch (error) {
    // Handle authentication error
    console.error("Error in sending Otp:", error);
    throw error;
  }
};

const updateGuestUser = (customerId, updatedData, callback) => {
  API({
    method: "PUT",
    url: `${BASE_URL_CUSTOMER}/updateGuestUser/${customerId}`,
    data: updatedData,
  })
    .then((response) => {
      callback({ status: "success", data: response.data });
    })
    .catch((err) => {
      console.log(err, "error occurred in updating the customer");
      callback({ status: "error" });
    });
};

const checkEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/check-email`, email);
    return response; // Return the response data
  } catch (error) {
    // Handle authentication error
    console.error("Error checking email", error);
    throw error;
  }
};

const getAllAsyncStorageData = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(allKeys);
    const dataObject = {};

    allData.forEach(([key, value]) => {
      dataObject[key] = value;
    });

    // Extracting persist:root(pin) data as an object
    const persistData = JSON.parse(dataObject["persist:root"]);
    console.log(JSON.parse(persistData.cart), "persist");

    return persistData;
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error);
    throw error;
  }
};

const auth = {
  authenticate,
  checkEmail,
  getAllAsyncStorageData,
  sendOtp,
  authenticateOtp,
  updateGuestUser,
};

export default auth;
