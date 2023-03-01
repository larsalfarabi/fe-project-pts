import axios from "./baseUrl";
export async function getAllOutlet(keyword, page, pageSize) {
  return axios.get(
    `/outlet/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
  );
}
export async function createOutlet(payload) {
  return axios.post(`/outlet/create`, payload);
}
export async function detailUser(id) {
  return axios.get(`/users/detail/${id}`);
}
export async function updateUser(id, payload) {
  return axios.put(`/users/update/${id}`, payload);
}
