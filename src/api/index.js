import axios from "axios";
import { serverConfig } from "./Configs/server-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appServerURL = serverConfig.appServerUrl;

const API = (config) => {
  // const localStorageData = JSON.parse(AsyncStorage.getItem("persist:root"));
  // if (localStorageData) {
  //   const authData = JSON.parse(localStorageData.auth);
  //   var token = authData.accessToken;
  // }

  // if (token != null && false) {
  //   config.headers = {
  //     ...config.headers,
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "*",
  //     Authorization: "Bearer " + token,
  //   };
  // }

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: "INTERNAL SERVER ERROR",
          status: 500,
        };
      }
      if (error.response.status === 401) {
        // auth.logout();
        throw error;
      }
      return Promise.reject(error);
    }
  );

  config.baseURL = appServerURL;
  return axios(config);
};

export default API;
