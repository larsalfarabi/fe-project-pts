import axios from "./baseUrl2";

export async function getAllMember(keyword, page, pageSize) {
  return axios.get(
    `/user/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
  );
}

export async function getDetailUser(id) {
  return axios.get(`/user/detail/${id}`);
}

export async function updateUser(id, payload) {
  return axios.put(`/user/update/${id}`, payload);
}

export async function createMember(payload) {
  return axios.post("/user/create", payload);
}

export async function deleteMember(id) {
  return axios.delete(`/user/delete/${id}`);
}
