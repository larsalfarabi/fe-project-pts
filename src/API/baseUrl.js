import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "http://localhost:2006",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${Cookies.get("myapps_token")}`,
  },
});

export default client;
