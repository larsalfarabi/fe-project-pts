import client, { syncToken } from "./axios";
export async function listUser() {
  return client.get("/chat/list");
}
export async function generateCode(nama) {
  syncToken();
  return client.post("/chat/generate-code", {
    nama_penerima: nama,
  });
}
export async function getMessageList(code) {
  syncToken();
  return client.post("/chat/messageList", {
    room_code: code,
  });
}

export async function listGroup() {
  return client.get("/group/list");
}
export async function createGroup(nama, member) {
  return client.post("/group/create", {
    nama,
    member,
  });
}
export async function getMessageGroup(code) {
  syncToken();
  return client.post("/group/messageList", {
    room_code: code,
  });
}