import axios,{ syncToken } from "./baseUrl2";
export async function loginProses(payload) {
  return axios.post(`/login`, payload);
}

export async function registerProses(payload) {
  return axios.post("/register", payload);
}

export function authMeProcess() {
  syncToken();
  return axios.get("/authme");
}
