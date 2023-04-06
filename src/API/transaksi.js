import axios from "./baseUrl2";

export async function getTransaksi(keyword, page, pageSize) {
  return axios.get(
    `/transaksi/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
  );
}
export async function createTransaksi(payload) {
  return axios.post("/transaksi/create", payload);
}
export async function updateTransaksi(id, payload) {
  return axios.put(`/transaksi/update/${id}`, payload);
}
export async function updatePembayaran(id, payload) {
  return axios.put(`/transaksi/updatePembayaran/${id}`, payload);
}
export async function getDetailTransaksi(id) {
  return axios.get(`/transaksi/detail/${id}`);
}
export async function deleteTransaksi(id) {
  return axios.delete(`/transaksi/delete/${id}`);
}

export async function getLaporan(page, pageSize) {
  return axios.get(`/laporan/list?page=${page}&pageSize=${pageSize}`);
}
export async function downloadLoporan() {
  return axios.get("/laporan/download", { responseType: "arraybuffer" });
}
