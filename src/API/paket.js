import axios from "./baseUrl2";

export async function getAllPaket(keyword, page, pageSize) {
  return axios.get(
    `/paket/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
  );
}
export async function getDetailPaket(id) {
  return axios.get(`/paket/detail/${id}`);
}
export async function createPaket(payload) {
  return axios.post(`/paket/create`, payload);
}
export async function deletePaket(id) {
  return axios.delete(`/paket/delete/${id}`);
}
export async function updatePaket(id, payload) {
  return axios.put(`/paket/update/${id}`, payload);
}
