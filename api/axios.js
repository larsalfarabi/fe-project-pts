import axios from "axios";
import { parse, stringify } from "qs";
import Cookies from "js-cookie";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${Cookies.get("chat_token")}`,
};
let client = axios.create({
  baseURL: "http://localhost:8080",

  // headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
  headers,
});
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error?.response?.status) {
      Cookies.remove("chat_token");

      clearToken();
      localStorage.clear();
      window.location.replace("/login");
    } else {
      return Promise.reject(error);
    }
  }
);
export const syncToken = () => {
  client.defaults.headers["Authorization"] = `Bearer ${Cookies.get(
    "chat_token"
  )}`;
};
export const clearToken = () => {
  delete client.defaults.headers["Authorization"];
};
export default client;

const printGetDeviceId = () => {
  getDeviceId().then((r) => {});
};
