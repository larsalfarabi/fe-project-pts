import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";

let client = axios.create({
  baseURL: '',

  // headers: { "Content-Type": "application/json" },
  paramsSerializer: function (params) {
    return qs.stringify(params, { encode: false, skipNulls: true });
  },
});
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error?.response?.status) {
      Cookies.remove("Authorization");

      clearToken();
      localStorage.clear();
      window.location.replace("/auth/login");
    } else {
      return Promise.reject(error);
    }
  }
);
export const syncToken = () => {
  client.defaults.headers["Authorization"] = `Bearer ${Cookies.get(
    "Authorization"
  )}`;
};
export const clearToken = () => {
  delete client.defaults.headers["Authorization"];
};
export default client;

const printGetDeviceId = () => {
  getDeviceId().then((r) => {});
};
