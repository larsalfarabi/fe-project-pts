/* eslint-disable array-callback-return */
import { PrinterIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { downloadLoporan, getLaporan } from "../../API/transaksi";
import convert from "../../komponen/convert";
import { Filter, Search } from "../../komponen/input";

const Laporan = () => {
  const thClass =
    "border-b border-dashed border-gray-200 pt-2 pb-4 text-start text-sm font-semibold";
  const tdClass =
    "border-b border-dashed border-gray-300 text-[14.5px] font-medium";
  const [listLaporan, setListLaporan] = useState([]);
  const [page, setPage] = useState([1]);
  const [pageSize, setPageSize] = useState([5]);

  const getListLaporanHandle = async () => {
    try {
      const response = await getLaporan(page, pageSize);
      console.log(response);
      setListLaporan(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListLaporanHandle();
  }, [page, pageSize]);
  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-gray-100 px-4 py-3">
      <div>
        {" "}
        <div className="mb-5 flex justify-between">
          <p className="text-lg font-semibold ">Data Laporan</p>
          <div className="flex">
            {" "}
            <Search />
            <Filter />{" "}
            <button
              className="flex h-[40px] w-[40px] items-center  justify-center rounded-full bg-[#fafafa]"
              onClick={async () => {
                try {
                  const response = await downloadLoporan();
                  const blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute(
                    "download",
                    "detail-laporan-transaksi.xlsx"
                  );
                  document.body.appendChild(link);
                  link.click();
                } catch (error) {
                  console.log("downlaoderr", error);
                }
              }}
            >
              {" "}
              <PrinterIcon className="h-[22px] w-[22px] text-black" />
            </button>
          </div>
        </div>
        <div className="w-[70rem] px-3">
          {" "}
          <table class="w-full table-fixed">
            <thead>
              <tr>
                <th className={`${thClass} w-[35px]`}>No</th>
                <th className={`${thClass} w-[100px]`}>Kode Invoice</th>
                <th className={`${thClass} w-[80px]`}>Nama Member</th>
                <th className={`${thClass} w-[70px]`}>Jenis Paket</th>
                <th className={`${thClass} w-[70px]`}>Nama Outlet</th>
                <th className={`${thClass} w-[80px]`}>Berat Cucian</th>
                <th className={`${thClass} w-[70px]`}>Total Bayar</th>
                <th className={`${thClass} w-[120px]`}>Status</th>
              </tr>
            </thead>
            <tbody className="relative">
              {listLaporan.length === 0 ? (
                <div className="flex">
                  <p className="absolute top-[13rem] right-[28rem]">
                    *** Tidak Ada Data ***
                  </p>
                </div>
              ) : (
                <>
                  {" "}
                  {listLaporan?.map((item,index) => {
                    if (
                      item?.transaksi?.status === "diambil" &&
                      item?.transaksi?.dibayar === "dibayar"
                    ) {
                      return (
                        <tr className="overflow-auto py-2">
                          <td className={tdClass}>{index + 1}</td>
                          <td className={`${tdClass}`}>
                            {item.transaksi.kode_invoice}
                          </td>
                          <td className={`${tdClass}`}>
                            {item.transaksi.member.nama}
                          </td>
                          <td className={`${tdClass}`}>{item.paket.jenis}</td>
                          <td className={`${tdClass}`}>
                            {item.transaksi.outlet.nama}
                          </td>{" "}
                          <td className={`${tdClass}`}>
                            {item.qty} {item.paket.jenis}
                          </td>
                          <td className={`${tdClass} px-2`}>
                            {convert(item.paket.harga)}
                          </td>
                          <td
                            className={`${tdClass} grid grid-cols-2 gap-2 py-5`}
                          >
                            {" "}
                            <p
                              className={
                                (item?.transaksi?.status === "baru" &&
                                  "rounded-[2px] bg-[#F4E6FA] p-1.5 text-center text-xs text-[#bf29ff]") ||
                                (item?.transaksi?.status === "proses" &&
                                  "rounded-[2px]  bg-[#FFECCC] p-1.5 text-center text-xs text-[#ffb22c] ") ||
                                (item?.transaksi?.status === "selesai" &&
                                  "rounded-[2px]  bg-blue-200 p-1.5 text-center text-xs text-blue-600 ") ||
                                (item?.transaksi?.status === "diambil" &&
                                  "rounded-[2px]  bg-green-200 p-1.5 text-center text-xs text-green-600 ")
                              }
                            >
                              {(item?.transaksi?.status === "baru" && "Baru") ||
                                (item?.transaksi?.status === "proses" &&
                                  "Proses") ||
                                (item?.transaksi?.status === "selesai" &&
                                  "selesai") ||
                                (item?.transaksi?.status === "diambil" &&
                                  "Diambil")}
                            </p>
                            <p
                              className={
                                (item?.transaksi?.dibayar === "baru" &&
                                  "rounded-[2px] bg-red-200 p-1.5 text-center text-xs text-red-600") ||
                                (item?.transaksi?.dibayar === "dibayar" &&
                                  "rounded-[2px] bg-green-200 p-1.5 text-center text-xs text-green-600 ")
                              }
                            >
                              {item?.transaksi?.dibayar === "dibayar"
                                ? "Dibayar"
                                : item?.transaksi?.dibayar === "belum_dibayar"
                                ? "Belum Dibayar"
                                : null}
                            </p>
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>{" "}
      <div className="flex w-full items-center justify-end gap-5">
        <FiChevronLeft
          className={
            page === 1 ? "cursor-not-allowed text-gray-100" : "cursor-pointer"
          }
          color={page === 1 ? "gray" : "black"}
          onClick={() => page !== 1 && setPage(page - 1)}
        />
        <div className="my-1 flex h-[40px] w-[40px] select-none items-center justify-center rounded-md border border-gray-300 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none">
          {page}
        </div>
        <FiChevronRight
          className="cursor-pointer"
          onClick={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
};

export default Laporan;
