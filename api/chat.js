import client from "./axios";
export async function listUser() {
  return client.get("/list-user/chat");
}
