import client from "./axios";

export async function login(payload) {
  return client.post("/login", payload);
}
export async function authMe(payload) {
  return client.get("/authMe");
}
