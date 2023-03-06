import axios from "./baseUrl2";
export async function getAllOutlet(keyword, page, pageSize) {
  return axios.get(
    `/outlet/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
  );
}
export async function createOutlet(payload) {
  return axios.post(`/outlet/create`, payload);
}
export async function detailOutlet(id) {
  return axios.get(`/outlet/detail/${id}`);
}
export async function updateOutlet(id, payload) {
  return axios.put(`/outlet/update/${id}`, payload);
}

export async function deleteOutlet(id) {
  return axios.delete(`/outlet/delete/${id}`);
}
