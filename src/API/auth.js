import { syncToken } from "./baseUrl2";
import axios from "axios";
export async function loginProses(payload) {
  return axios.post(`http://localhost:2006/login`, payload);
}

export async function registerProses(payload) {
  return axios.post("http://localhost:2006/register", payload);
}

export function authMeProcess() {
  syncToken();
  return axios.get("/authme");
}
