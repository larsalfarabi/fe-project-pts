import axios from "./baseUrl2";

export async function getAllPelanggan(keyword, page, pageSize) {
  return axios.get(
    `/member/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
  );
}
export async function deletePelanggan(id) {
  return axios.delete(`/member/delete/${id}`);
}
export async function createPelanggan(payload) {
  return axios.post(`/member/create`, payload);
}
export async function getDetailPelanggan(id) {
  return axios.get(`/member/detail/${id}`);
}
export async function updatePelanggan(id, payload) {
  return axios.put(`/member/update/${id}`, payload);
}
