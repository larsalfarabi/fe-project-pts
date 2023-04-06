import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Filter, Input, Search } from "../../komponen/input";
import ModalDelete from "../../komponen/Modals/ModalDelete";
import Select from "../../komponen/select";
import * as Yup from "yup";
import {
  PencilSquareIcon,
  CurrencyDollarIcon,
  IdentificationIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  createTransaksi,
  deleteTransaksi,
  getDetailTransaksi,
  getTransaksi,
  updatePembayaran,
  updateTransaksi,
} from "../../API/transaksi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { getAllPelanggan } from "../../API/pelanggan";
import moment from "moment/moment";
import convert from "../../komponen/convert";
import { getAllPaket } from "../../API/paket";
import CurrencyInput from "react-currency-input-field";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
const Transaksi = () => {
  const date = new Date().getTime();
  const thClass =
    "border-b border-dashed border-gray-200 pt-2 pb-4 text-start text-sm font-semibold";
  const tdClass =
    "border-b border-dashed border-gray-300 text-[14.5px] font-medium";

  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [statusBayarModal, setStatusBayarModal] = useState(false);
  const [listTransaksi, setListTransaksi] = useState([]);
  const [listPelanggan, setListPelanggan] = useState([]);
  const [listDetail, setListDetail] = useState({});
  const [listPaket, setListPaket] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [perPage, setPerPage] = useState(100);

  const search = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => {
      //  toast.success(response?.data?.msg);
      formik.resetForm();
      return setShowCreate(false);
    },
  });
  const formik = useFormik({
    initialValues: {
      kode_invoice: `INV ${date}`,
      id_member: "",
      id_paket: "",
      diskon: "",
      biaya_tambahan: "",
      qty: "",
    },
    validationSchema: Yup.object().shape({
      id_member: Yup.string().required("Nama Member  is required"),
      id_paket: Yup.string().required("Nama Paket is required"),
      diskon: Yup.string().required("Diskon is required"),
      biaya_tambahan: Yup.string().required("Biaya Tambahan is required"),
      qty: Yup.string().required("Berat Satuan is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await createTransaksi(values);
        console.log("invo", values.invoice);
        if (response?.status === 200) {
          toast.success(response?.data?.msg);
          formik.resetForm();
          getListTransaksiHandle();
          return setShowCreate(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const formikPembayaran = useFormik({
    initialValues: {
      dibayar: "",
    },
    validationSchema: Yup.object().shape({
      dibayar: Yup.string().required("Status Pembayaran Paket id required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await updatePembayaran(values.id, values);
        console.log("id =>", values.id);
        console.log("update =>", response);
        if (response?.data?.status === "berhasil") {
          toast.success(response?.data?.msg);
          formik.resetForm();
          getListTransaksiHandle();
          return setShowModal(false) || setStatusBayarModal(false);
        }
      } catch (error) {}
    },
  });
  const formikEdit = useFormik({
    initialValues: {
      status: "",
      id_member: "",
      id_paket: "",
      diskon: "",
      biaya_tambahan: "",
      dibayar: "dibayar",
      qty: "",
    },
    validationSchema: Yup.object().shape({
      status: Yup.string().required("Status Paket id required"),
      dibayar: Yup.string().required("Status Pembayaran Paket id required"),
      id_member: Yup.string().required("Nama Member  is required"),
      id_paket: Yup.string().required("Nama Paket is required"),
      diskon: Yup.string().required("Diskon is required"),
      biaya_tambahan: Yup.string().required("Biaya Tambahan is required"),
      qty: Yup.string().required("Berat Satuan is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await updateTransaksi(values.id, values);
        console.log("update =>", response);
        if (response?.data?.status === "berhasil") {
          formikEdit.setValues({
            dibayar: "dibayar",
          });
          toast.success(response?.data?.msg);
          formik.resetForm();
          getListTransaksiHandle();
          return setShowModal(false) || setStatusBayarModal(false);
        }
      } catch (error) {}
    },
  });

  const getListTransaksiHandle = async () => {
    try {
      const response = await getTransaksi(
        search.values.keyword,
        page,
        pageSize
      );
      console.log(response);
      setListTransaksi(response?.data?.data?.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const getListMemberHandle = async () => {
    try {
      const response = await getAllPelanggan(
        search.values.keyword,
        page,
        perPage
      );
      console.log("pelanggan =>", response);
      setListPelanggan(response?.data?.data?.rows);
    } catch (error) {}
  };
  const getListPaketHandle = async () => {
    try {
      const response = await getAllPaket(search.values.keyword, page, perPage);
      console.log("paket =>", response);
      setListPaket(response?.data?.data?.rows);
    } catch (error) {}
  };
  const getDetailTransaksiHandle = async (id) => {
    try {
      const response = await getDetailTransaksi(id);
      console.log("detail =>", response);
      const detail = response.data.data;
      formikEdit.setValues({
        id: detail?.id,
        kode_invoice: detail?.transaksi?.kode_invoice,
        id_member: detail?.transaksi?.id_member,
        id_outlet: detail?.transaksi?.id_outlet,
        id_paket: detail?.id_paket,
        status: detail?.transaksi?.status,
        dibayar: detail?.transaksi?.dibayar,
        diskon: detail?.transaksi?.diskon,
        biaya_tambahan: detail?.transaksi?.biaya_tambahan,
        qty: detail?.qty,
      });
      setListDetail(detail);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListTransaksiHandle();
    getListMemberHandle();
    getListPaketHandle();
    getDetailTransaksiHandle();
  }, [search.values.keyword, page, pageSize, perPage]);

  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-gray-100 px-4 py-3">
      <div>
        {" "}
        <div className="mb-3 flex justify-between">
          <p className="text-lg font-semibold ">Data Transaksi</p>
          <div className="flex">
            {" "}
            <Search />
            <Filter />
            <button
              className="mr-1 mb-1 h-10 rounded px-6 text-sm font-bold uppercase  text-black outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-pink-600"
              type="button"
              style={{
                background: "#fafafa",
              }}
              onClick={() => setShowCreate(true)}
            >
              Buat Transaksi
            </button>
            {showCreate ? (
              <>
                <div className="fixed inset-0 z-50 flex w-screen items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                  <div className="relative my-6 mx-auto w-1/3 max-w-3xl">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 py-4 px-5">
                        <h3 className="text-2xl font-semibold">
                          Buat Transaksi
                        </h3>
                        <button
                          className="text-red-00 float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                          onClick={() => setShowCreate(false)}
                        >
                          ×
                        </button>
                      </div>
                      {/*body*/}
                      <form action="" onSubmit={formik.handleSubmit}>
                        <div className="relative my-4 flex-auto space-y-3 p-6 ">
                          {" "}
                          <Input
                            placeholder="Invoice"
                            name={"kode_invoice"}
                            type="text"
                            value={formik.values.kode_invoice}
                          />{" "}
                          <Select
                            name="id_member"
                            value={formik.values.id_member}
                            onChange={formik.handleChange}
                            isError={
                              formik.errors.id_member &&
                              formik.touched.id_member
                            }
                            textError={formik.errors.id_member}
                          >
                            <option value="" className="text-gray-400">
                              Pilih Nama Member
                            </option>
                            {listPelanggan?.map((item) => (
                              <option value={item?.id}>{item?.nama}</option>
                            ))}
                          </Select>
                          <Select
                            name="id_paket"
                            value={formik.values.id_paket}
                            onChange={formik.handleChange}
                            isError={
                              formik.errors.id_paket && formik.touched.id_paket
                            }
                            textError={formik.errors.id_paket}
                          >
                            <option value="" className="text-gray-400">
                              Pilih Nama paket
                            </option>
                            {listPaket?.map((item) => (
                              <option value={item?.id}>
                                {item?.nama_paket}
                              </option>
                            ))}
                          </Select>{" "}
                          <div>
                            {" "}
                            <CurrencyInput
                              className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
                              placeholder="Biaya Tambahan"
                              id="biaya_tambahan"
                              name="biaya_tambahan"
                              defaultValue={0}
                              decimalsLimit={2}
                              allowNegativeValue={false}
                              step={2}
                              value={formik.values.biaya_tambahan}
                              prefix="Rp "
                              onValueChange={(value) => {
                                // setNominal(value)
                                formik.setFieldValue("biaya_tambahan", value);
                              }}
                            />{" "}
                            {formik.errors.biaya_tambahan &&
                              formik.touched.biaya_tambahan && (
                                <p className="text-sm italic text-red-500">
                                  {formik.errors.biaya_tambahan}
                                </p>
                              )}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {" "}
                            <div>
                              {" "}
                              <CurrencyInput
                                className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
                                placeholder="Diskon"
                                id="diskon"
                                name="diskon"
                                defaultValue={0}
                                maxLength={2}
                                // decimalsLimit={1}
                                allowDecimals={false}
                                allowNegativeValue={false}
                                step={500}
                                value={formik.values.diskon}
                                suffix=" %"
                                onValueChange={(value) => {
                                  // setNominal(value)
                                  formik.setFieldValue("diskon", value);
                                }}
                              />{" "}
                              {formik.errors.diskon &&
                                formik.touched.diskon && (
                                  <p className="text-sm italic text-red-500">
                                    {formik.errors.diskon}
                                  </p>
                                )}
                            </div>
                            <div>
                              {" "}
                              <CurrencyInput
                                className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
                                placeholder="Berat Cucian"
                                id="qty"
                                name="qty"
                                defaultValue={0}
                                decimalsLimit={1}
                                allowNegativeValue={false}
                                allowDecimals={false}
                                step={2}
                                value={formik.values.qty}
                                onValueChange={(value) => {
                                  // setNominal(value)
                                  formik.setFieldValue("qty", value);
                                }}
                              />{" "}
                              {formik.errors.qty && formik.touched.qty && (
                                <p className="text-sm italic text-red-500">
                                  {formik.errors.qty}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                          <button
                            className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                            type="button"
                            onClick={() => setShowCreate(false)}
                          >
                            Close
                          </button>
                          <button
                            className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                            type="submit"
                            onClick={() => formik.handleSubmit}
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
              </>
            ) : null}{" "}
          </div>
        </div>
        <div className="w-[70rem] pl-2 pr-3">
          {" "}
          <table class="w-full table-fixed">
            <thead>
              <tr>
                <th className={`${thClass} w-[35px]`}>No</th>
                <th className={`${thClass} w-[115px]`}>Kode Invoice</th>
                <th className={`${thClass} w-[100px]`}>Nama Member</th>
                <th className={`${thClass} w-[100px]`}>Tanggal</th>
                <th className={`${thClass} w-[100px]`}>Batas Waktu</th>
                <th className={`${thClass} w-[100px]`}>Tanggal Bayar</th>
                <th className={`${thClass} w-[80px]`}>Diskon</th>
                <th className={`${thClass} w-[70px]`}>Pajak</th>
                <th className={`${thClass} w-[100px]`}>Biaya Tambahan</th>{" "}
                <th className={`${thClass} w-[105px]`}>Status</th>
                <th className={`${thClass}`}>Aksi</th>
              </tr>
            </thead>
            <tbody className="relative">
              {listTransaksi.length === 0 ? (
                <div className="flex">
                  <p className="absolute top-[13rem] right-[28rem]">
                    *** Tidak Ada Data ***
                  </p>
                </div>
              ) : (
                <>
                  {" "}
                  {listTransaksi?.map((item, index) => (
                    <tr className="overflow-auto py-2">
                      <td className={tdClass}>{index + 1}</td>
                      <td className={`${tdClass}`}>{item.kode_invoice}</td>
                      <td className={`${tdClass} text-center`}>
                        {item.member.nama}
                      </td>
                      <td className={`${tdClass} pr-7`}>
                        {moment(item.tgl).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className={`${tdClass} pr-7`}>
                        {moment(item.batas_waktu).format("DD/MM/YYYY HH:mm")}
                      </td>{" "}
                      <td className={`${tdClass} pr-7 text-center`}>
                        {moment(item.tgl_bayar).format("DD/MM/YYYY HH:mm") ===
                        "Invalid date"
                          ? "-"
                          : moment(item.tgl_bayar).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className={`${tdClass} px-2`}>{item.diskon}%</td>
                      <td className={tdClass}>{item.pajak}%</td>
                      <td className={tdClass}>
                        {convert(item.biaya_tambahan)}
                      </td>
                      <td className="border-b border-dashed border-gray-300 text-[12px] font-medium">
                        {" "}
                        <p
                          className={
                            (item?.dibayar === "belum_dibayar" &&
                              "mr-2 rounded-[2px] bg-red-200 p-1.5 text-center text-xs text-red-600") ||
                            (item?.dibayar === "dibayar" &&
                              "mr-2 rounded-[2px] bg-green-200 p-1.5 text-center text-xs text-green-600 ")
                          }
                        >
                          {item.dibayar === "dibayar"
                            ? "Dibayar"
                            : item.dibayar === "belum_dibayar"
                            ? "Belum Dibayar"
                            : null}
                        </p>
                      </td>
                      <td className="flex items-center space-x-[8px] space-y-0 border-b  border-dashed border-gray-300 py-[20px] px-[11px]">
                        <button
                          className="rounded p-1.5 text-[13px] font-bold uppercase text-black outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-pink-600"
                          type="button"
                          style={{
                            background: "#fafafa",
                          }}
                          onClick={() => {
                            setShowModal(true);
                            getDetailTransaksiHandle(item?.id);
                          }}
                        >
                          <PencilSquareIcon className="h-[22px] w-[22px] text-black" />
                        </button>
                        {showModal ? (
                          <>
                            <div className="fixed inset-0 z-50 flex w-screen items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                              <div className="relative my-6 mx-auto w-1/3 max-w-3xl">
                                {/*content*/}
                                <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                  {/*header*/}
                                  <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 py-4 px-5">
                                    <h3 className="text-2xl font-semibold">
                                      Edit Transaksi
                                    </h3>
                                    <button
                                      className="text-red-00 float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                                      onClick={() => setShowModal(false)}
                                    >
                                      ×
                                    </button>
                                  </div>
                                  {/*body*/}
                                  <form
                                    action=""
                                    onSubmit={formikEdit.handleSubmit}
                                  >
                                    <div className="relative my-4 flex-auto space-y-3 p-6 ">
                                      <Select
                                        name="id_member"
                                        value={formikEdit.values.id_member}
                                        onChange={formikEdit.handleChange}
                                        isError={
                                          formikEdit.errors.id_member &&
                                          formikEdit.touched.id_member
                                        }
                                        textError={formikEdit.errors.id_member}
                                      >
                                        <option
                                          value=""
                                          className="text-gray-400"
                                        >
                                          Pilih Nama Member
                                        </option>
                                        {listPelanggan?.map((item) => (
                                          <option value={item?.id}>
                                            {item?.nama}
                                          </option>
                                        ))}
                                      </Select>
                                      {console.log("33err", formikEdit.errors)}
                                      <Select
                                        name="id_paket"
                                        value={formikEdit.values.id_paket}
                                        onChange={formikEdit.handleChange}
                                        isError={
                                          formikEdit.errors.id_paket &&
                                          formikEdit.touched.id_paket
                                        }
                                        textError={formikEdit.errors.id_paket}
                                      >
                                        <option
                                          value=""
                                          className="text-gray-400"
                                        >
                                          Pilih Nama Paket
                                        </option>
                                        {listPaket?.map((item) => (
                                          <option value={item?.id}>
                                            {item?.nama_paket}
                                          </option>
                                        ))}
                                      </Select>
                                      <div className="grid grid-cols-2 gap-2">
                                        {" "}
                                        <Select
                                          name="status"
                                          value={formikEdit.values.status}
                                          onChange={formikEdit.handleChange}
                                          isError={
                                            formikEdit.errors.status &&
                                            formikEdit.touched.status
                                          }
                                          textError={formikEdit.errors.status}
                                        >
                                          <option
                                            value=""
                                            className="text-gray-400"
                                          >
                                            Pilih Nama Status
                                          </option>
                                          <option value="baru">Baru</option>
                                          <option value="proses">Proses</option>
                                          <option value="selesai">
                                            Selesai
                                          </option>
                                          <option value="diambil">
                                            Diambil
                                          </option>
                                        </Select>{" "}
                                        <div>
                                          {" "}
                                          <CurrencyInput
                                            className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
                                            placeholder="Diskon"
                                            id="diskon"
                                            name="diskon"
                                            defaultValue={0}
                                            maxLength={2}
                                            // decimalsLimit={1}
                                            allowDecimals={false}
                                            allowNegativeValue={false}
                                            step={500}
                                            value={formikEdit.values.diskon}
                                            suffix=" %"
                                            onValueChange={(value) => {
                                              // setNominal(value)
                                              formikEdit.setFieldValue(
                                                "diskon",
                                                value
                                              );
                                            }}
                                          />{" "}
                                          {formikEdit.errors.diskon &&
                                            formikEdit.touched.diskon && (
                                              <p className="text-sm italic text-red-500">
                                                {formikEdit.errors.diskon}
                                              </p>
                                            )}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        {" "}
                                        <div>
                                          {" "}
                                          <CurrencyInput
                                            className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
                                            placeholder="Biaya Tambahan"
                                            id="biaya_tambahan"
                                            name="biaya_tambahan"
                                            defaultValue={0}
                                            decimalsLimit={2}
                                            allowNegativeValue={false}
                                            step={2}
                                            value={
                                              formikEdit.values.biaya_tambahan
                                            }
                                            prefix="Rp "
                                            onValueChange={(value) => {
                                              // setNominal(value)
                                              formikEdit.setFieldValue(
                                                "biaya_tambahan",
                                                value
                                              );
                                            }}
                                          />{" "}
                                          {formikEdit.errors.biaya_tambahan &&
                                            formikEdit.touched
                                              .biaya_tambahan && (
                                              <p className="text-sm italic text-red-500">
                                                {
                                                  formikEdit.errors
                                                    .biaya_tambahan
                                                }
                                              </p>
                                            )}
                                        </div>
                                        <div>
                                          {" "}
                                          <CurrencyInput
                                            className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
                                            placeholder="Berat Cucian"
                                            id="qty"
                                            name="qty"
                                            defaultValue={0}
                                            decimalsLimit={1}
                                            allowNegativeValue={false}
                                            allowDecimals={false}
                                            step={2}
                                            value={formikEdit.values.qty}
                                            onValueChange={(value) => {
                                              // setNominal(value)
                                              formikEdit.setFieldValue(
                                                "qty",
                                                value
                                              );
                                            }}
                                          />{" "}
                                          {formikEdit.errors.qty &&
                                            formikEdit.touched.qty && (
                                              <p className="text-sm italic text-red-500">
                                                {formikEdit.errors.qty}
                                              </p>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                                      <button
                                        className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                      >
                                        Close
                                      </button>
                                      <button
                                        className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                        type="submit"
                                        onClick={() => formikEdit.handleSubmit}
                                      >
                                        Save Changes
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                            <div className="fixed inset-0 -inset-x-2 z-20 m-0 w-screen bg-black opacity-[0.09] backdrop-blur-3xl"></div>
                          </>
                        ) : null}
                        <ModalDelete
                          color={"#fafafa"}
                          width={"34px"}
                          height={"34px"}
                          subTitle={"Transaksi"}
                          onclick={async (e) => {
                            try {
                              e.preventDefault();
                              const res = await deleteTransaksi(item?.id);
                              console.log("delete =>", res);

                              if (res?.data?.status === "berhasil") {
                                toast.success(res?.data?.msg);
                                getListTransaksiHandle();
                              }
                              return setShowModal(false);
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          <TrashIcon className="h-[22px] w-[22px] text-black" />
                        </ModalDelete>{" "}
                        {/* <button
                          className="mb-1 rounded-[4px] bg-[#fafafa] p-1.5"
                          type="button"
                          onClick={() => setOpen(true)}
                        >
                          {" "}
                          <IdentificationIcon className="h-[22px] w-[22px] text-black" />
                        </button>{" "} */}
                        <>
                          {" "}
                          <button
                            className="mb-1 rounded-[4px] bg-[#fafafa] p-1.5"
                            type="button"
                            onClick={() => {
                              getDetailTransaksiHandle(item?.id);
                              return setOpen(true);
                            }}
                          >
                            {" "}
                            <IdentificationIcon className="h-[22px] w-[22px] text-black" />
                          </button>{" "}
                          {open ? (
                            <Transition.Root show={open} as={Fragment}>
                              <Dialog
                                as="div"
                                className="relative z-10"
                                onClose={setOpen}
                              >
                                <Transition.Child
                                  as={Fragment}
                                  enter="ease-in-out duration-500"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="ease-in-out duration-500"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-hidden">
                                  <div className="absolute inset-0 overflow-hidden">
                                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                      <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                      >
                                        <Dialog.Panel className="pointer-events-auto relative w-screen max-w-lg">
                                          <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                          >
                                            <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                              <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                              >
                                                <span className="sr-only">
                                                  Close panel
                                                </span>
                                                <XMarkIcon
                                                  className="h-6 w-6"
                                                  aria-hidden="true"
                                                />
                                              </button>
                                            </div>
                                          </Transition.Child>
                                          <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6 ">
                                              <div className="flex justify-between">
                                                {" "}
                                                <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                                                  Detail Transaksi
                                                </Dialog.Title>
                                                <Dialog.Title className="text-sm font-medium leading-6 text-gray-900">
                                                  {
                                                    listDetail?.transaksi
                                                      ?.kode_invoice
                                                  }
                                                </Dialog.Title>
                                              </div>
                                              <div className="mt-3 flex h-[30rem] w-full space-x-28 rounded border border-gray-200 px-3 py-4 ">
                                                {" "}
                                                <div className="w-full space-y-4">
                                                  {" "}
                                                  <div className="flex h-[70px] w-full  border-b  border-gray-100 ">
                                                    {" "}
                                                    <div className="flex w-1/2 flex-col space-y-4">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Nama Pelanggan{" "}
                                                      </h1>
                                                      <p className="text-sm">
                                                        {
                                                          listDetail?.transaksi
                                                            ?.member?.nama
                                                        }
                                                      </p>
                                                    </div>
                                                    <div className="flex w-1/2 flex-col space-y-4">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Nama Outlet{" "}
                                                      </h1>{" "}
                                                      <p className="text-sm">
                                                        {
                                                          listDetail?.transaksi
                                                            ?.outlet?.nama
                                                        }
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="flex h-[70px] w-full border-b  border-gray-100 ">
                                                    {" "}
                                                    <div className="flex w-1/2 flex-col space-y-4">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Nama Paket
                                                      </h1>
                                                      <p className="text-sm">
                                                        {
                                                          listDetail?.paket
                                                            ?.nama_paket
                                                        }
                                                      </p>
                                                    </div>
                                                    <div className="flex w-1/2 flex-col space-y-4">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Jenis Cucian
                                                      </h1>{" "}
                                                      <p className="text-sm">
                                                        {
                                                          listDetail?.paket
                                                            ?.jenis
                                                        }
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="flex h-[80px] w-full border-b  border-gray-100 ">
                                                    {" "}
                                                    <div className="flex w-1/2 flex-col space-y-3 ">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Status Paket
                                                      </h1>
                                                      <p
                                                        className={
                                                          (listDetail?.transaksi
                                                            ?.status ===
                                                            "baru" &&
                                                            "mr-8 rounded-[2px] bg-[#F4E6FA] p-1.5 text-center text-xs text-[#bf29ff]") ||
                                                          (listDetail?.transaksi
                                                            ?.status ===
                                                            "proses" &&
                                                            "mr-8 rounded-[2px]  bg-[#FFECCC] p-1.5 text-center text-xs text-[#ffb22c] ") ||
                                                          (listDetail?.transaksi
                                                            ?.status ===
                                                            "selesai" &&
                                                            "mr-8 rounded-[2px]  bg-blue-200 p-1.5 text-center text-xs text-blue-600 ") ||
                                                          (listDetail?.transaksi
                                                            ?.status ===
                                                            "diambil" &&
                                                            "mr-8 rounded-[2px]  bg-green-200 p-1.5 text-center text-xs text-green-600 ")
                                                        }
                                                      >
                                                        {(listDetail?.transaksi
                                                          ?.status === "baru" &&
                                                          "Baru") ||
                                                          (listDetail?.transaksi
                                                            ?.status ===
                                                            "proses" &&
                                                            "Proses") ||
                                                          (listDetail?.transaksi
                                                            ?.status ===
                                                            "selesai" &&
                                                            "selesai") ||
                                                          (listDetail?.transaksi
                                                            ?.status ===
                                                            "diambil" &&
                                                            "Diambil")}
                                                      </p>
                                                    </div>
                                                    <div className="flex w-1/2 flex-col space-y-3">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Status Pembayaran
                                                      </h1>{" "}
                                                      <p
                                                        className={
                                                          (listDetail?.transaksi
                                                            ?.dibayar ===
                                                            "belum_dibayar" &&
                                                            "mr-8 rounded-[2px] bg-red-200 p-1.5 text-center text-xs text-red-600") ||
                                                          (listDetail?.transaksi
                                                            ?.dibayar ===
                                                            "dibayar" &&
                                                            "mr-8 rounded-[2px] bg-green-200 p-1.5 text-center text-xs text-green-600 ")
                                                        }
                                                      >
                                                        {listDetail?.transaksi
                                                          ?.dibayar ===
                                                        "dibayar"
                                                          ? "Dibayar"
                                                          : listDetail
                                                              ?.transaksi
                                                              ?.dibayar ===
                                                            "belum_dibayar"
                                                          ? "Belum Dibayar"
                                                          : null}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="flex h-[80px] w-full border-b  border-gray-100 ">
                                                    {" "}
                                                    <div className="flex w-1/2 flex-col space-y-3 ">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Total Pembayaran
                                                      </h1>
                                                      <p className="text-lg font-medium text-green-600">
                                                        {listDetail?.qty &&
                                                        listDetail?.paket
                                                          ?.harga &&
                                                        listDetail?.transaksi
                                                          ?.biaya_tambahan !==
                                                          undefined
                                                          ? convert(
                                                              listDetail?.qty *
                                                                listDetail
                                                                  ?.paket
                                                                  ?.harga +
                                                                listDetail
                                                                  ?.transaksi
                                                                  ?.biaya_tambahan
                                                            )
                                                          : 0}
                                                      </p>
                                                    </div>
                                                    <div className="flex w-1/2 flex-col space-y-3">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Tanggal Bayar
                                                      </h1>{" "}
                                                      <p className="">
                                                        {moment(
                                                          listDetail?.transaksi
                                                            ?.tgl_bayar
                                                        ).format(
                                                          "DD/MM/YYYY HH:mm"
                                                        ) === "Invalid date"
                                                          ? "-"
                                                          : moment(
                                                              listDetail
                                                                ?.transaksi
                                                                ?.tgl_bayar
                                                            ).format(
                                                              "DD/MM/YYYY HH:mm"
                                                            )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="flex h-[80px] w-full border-b  border-gray-100 ">
                                                    {" "}
                                                    <div className="flex w-1/2 flex-col space-y-3 ">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Tanggal
                                                      </h1>
                                                      <p>
                                                        {moment(
                                                          listDetail?.transaksi
                                                            ?.tgl
                                                        ).format(
                                                          "DD/MM/YYYY HH:mm"
                                                        )}
                                                      </p>
                                                    </div>
                                                    <div className="flex w-1/2 flex-col space-y-3">
                                                      {" "}
                                                      <h1 className="font-medium">
                                                        Berakhir
                                                      </h1>{" "}
                                                      <p>
                                                        {moment(
                                                          listDetail?.transaksi
                                                            ?.batas_waktu
                                                        ).format(
                                                          "DD/MM/YYYY HH:mm"
                                                        )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Dialog.Panel>
                                      </Transition.Child>
                                    </div>
                                  </div>
                                </div>
                              </Dialog>
                            </Transition.Root>
                          ) : null}
                        </>
                        <button
                          className="rounded-[4px] bg-[#fafafa] p-1.5"
                          type="button"
                          onClick={async () => {
                            try {
                              setStatusBayarModal(true);
                              const response = await getDetailTransaksi(
                                item?.id
                              );
                              console.log("detail =>", response);
                              const detail = response.data.data;
                              formikPembayaran.setValues({
                                id: detail?.id,
                                dibayar: detail?.transaksi?.dibayar,
                              });
                              setListDetail(detail);
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          <CurrencyDollarIcon className="h-[22px] w-[22px] text-black" />
                        </button>{" "}
                        {statusBayarModal && (
                          <>
                            <div className="fixed inset-0 z-10 overflow-y-auto">
                              <div
                                className="fixed inset-0 h-full w-full bg-black opacity-25"
                                onClick={() => setStatusBayarModal(false)}
                              ></div>
                              <div className="flex min-h-screen items-center px-4 py-8">
                                <div className="relative mx-auto w-full max-w-md rounded-md bg-white p-4 shadow-lg">
                                  <div className="sm:flex">
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                      <h4 className="text-xl font-medium text-gray-800">
                                        Status Bayar
                                      </h4>{" "}
                                      <p className="mt-8 text-[15px] leading-relaxed text-gray-500">
                                        Apakah anda sudah menerima dana
                                        transaksi sebesar{" "}
                                        <span className="font-bold">
                                          {listDetail?.qty &&
                                          listDetail?.paket?.harga &&
                                          listDetail?.transaksi
                                            ?.biaya_tambahan !== undefined
                                            ? convert(
                                                listDetail?.qty *
                                                  listDetail?.paket?.harga +
                                                  listDetail?.transaksi
                                                    ?.biaya_tambahan
                                              )
                                            : 0}
                                        </span>{" "}
                                        dari
                                        <span className="ml-1 font-bold">
                                          {listDetail?.transaksi?.member?.nama}
                                        </span>{" "}
                                        ?
                                      </p>
                                      <div className="mt-10 flex items-center justify-center gap-2 sm:flex">
                                        <form
                                          action=""
                                          onSubmit={
                                            formikPembayaran.handleSubmit
                                          }
                                        >
                                          {" "}
                                          <button
                                            className="mr-2 inline-flex items-center rounded-lg bg-emerald-500 px-5 py-2.5 text-center text-sm font-medium text-white active:bg-emerald-600"
                                            type="submit"
                                            onClick={() =>
                                              formikPembayaran.handleSubmit
                                            }
                                          >
                                            Yes, I'm sure
                                          </button>
                                        </form>
                                        <button
                                          className="rounded-lg bg-white px-5 py-2.5 font-semibold  text-red-500 focus:z-10 focus:outline-none focus:ring-4 "
                                          onClick={() =>
                                            setStatusBayarModal(false)
                                          }
                                        >
                                          No, cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
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

export default Transaksi;
