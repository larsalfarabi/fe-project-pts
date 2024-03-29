import React, { useEffect, useState } from "react";
import { Filter, Input, Search } from "../../komponen/input";
import Select from "../../komponen/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalDelete from "../../komponen/Modals/ModalDelete";
import convertRupiah from "rupiah-format";
import {
  createPaket,
  deletePaket,
  getAllPaket,
  getDetailPaket,
  updatePaket,
} from "../../API/paket";
import toast from "react-hot-toast";
import { getAllOutlet } from "../../API/outlet";
import CurrencyInput from "react-currency-input-field";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import convert from "../../komponen/convert";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Paket = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageOutlet, setPageOutlet] = useState(1);
  const [pageSizeOutlet, setPageSizeOutlet] = useState(5);
  const [listPaket, setListPaket] = useState([]);
  const [listOutlet, setListOutlet] = useState([]);

  const search = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => {},
  });
  const formik = useFormik({
    initialValues: {
      id_outlet: "",
      jenis: "",
      nama_paket: "",
      harga: "",
    },
    validationSchema: Yup.object().shape({
      id_outlet: Yup.string().required("Nama Outlet  is required"),
      jenis: Yup.string().required("Jenis is required"),
      nama_paket: Yup.string().required("Nama Paket is required"),
      harga: Yup.string().required("Harga is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const response = await createPaket(values);
        console.log(response);
        if (response?.status === 200) {
          toast.success(response?.data?.msg);
          formik.resetForm();
          getListPaketHandle();
          return setShowCreate(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });
  const formikEdit = useFormik({
    initialValues: {
      id_outlet: "",
      jenis: "",
      nama_paket: "",
      harga: "",
    },
    validationSchema: Yup.object().shape({
      id_outlet: Yup.string().required("Nama Outlet  is required"),
      jenis: Yup.string().required("Jenis is required"),
      nama_paket: Yup.string().required("Nama Paket is required"),
      harga: Yup.string().required("Harga is required"),
    }),
    onSubmit: (values) => {},
  });

  const getListPaketHandle = async () => {
    try {
      const response = await getAllPaket(search.values.keyword, page, pageSize);
      console.log(response.data.data.rows);
      setListPaket(response?.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const getListOutletHandle = async () => {
    try {
      setIsLoading(true);
      const response = await getAllOutlet(
        search.values.keyword,
        pageOutlet,
        pageSizeOutlet
      );
      console.log(response.data.data);
      setListOutlet(response?.data?.data?.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getDetailPaketHandle = async (id) => {
    try {
      setShowModal(true);
      const response = await getDetailPaket(id);
      console.log("detail =>", response.data.data);
      const dataPaket = response.data.data;
      formikEdit.setValues({
        id: dataPaket?.id,
        id_outlet: dataPaket?.id_outlet,
        jenis: dataPaket?.jenis,
        nama_paket: dataPaket?.nama_paket,
        harga: dataPaket?.harga,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListPaketHandle();
    getListOutletHandle();
  }, [search.values.keyword, page, pageSize]);

  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-gray-100 px-4 py-3">
      <div>
        {" "}
        <div className="mb-5 flex justify-between">
          <p className="text-lg font-semibold">Data Paket</p>
          <div className="flex ">
            {" "}
            <Search
              nama="keyword"
              value={search.values.keyword}
              change={search.handleChange}
            />
            <Filter />
            <button
              className="mr-1 mb-1 h-10 rounded px-6 text-sm font-bold uppercase  text-black outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-pink-600"
              type="button"
              style={{
                background: "#fafafa",
              }}
              onClick={() => setShowCreate(true)}
            >
              Buat Paket
            </button>
            {showCreate ? (
              <>
                <div className="fixed inset-0 z-50 flex w-screen items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                  <div className="relative my-6 mx-auto w-1/3 max-w-3xl">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 py-4 px-5">
                        <h3 className="text-2xl font-semibold">Buat Paket</h3>
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
                          <Select
                            name="id_outlet"
                            value={formik.values.id_outlet}
                            onChange={formik.handleChange}
                            isError={
                              formik.errors.id_outlet &&
                              formik.touched.id_outlet
                            }
                            textError={formik.errors.id_outlet}
                          >
                            <option value="" className="text-gray-400">
                              Pilih Nama Toko
                            </option>
                            {listOutlet?.map((item, index) => {
                              return (
                                <option value={item?.id}>{item?.nama}</option>
                              );
                            })}
                          </Select>
                          <Select
                            name="jenis"
                            value={formik.values.jenis}
                            onChange={formik.handleChange}
                            isError={
                              formik.errors.jenis && formik.touched.jenis
                            }
                            textError={formik.errors.jenis}
                          >
                            <option value="" className="text-gray-400">
                              Pilih Peran
                            </option>
                            <option value="kiloan">Kiloan</option>
                            <option value="selimut">Selimut</option>
                            <option value="bed_cover">Bed Cover</option>
                            <option value="kaos">Kaos</option>
                            <option value="lainn">Lain</option>
                          </Select>
                          <Input
                            placeholder="Nama Paket"
                            name={"nama_paket"}
                            value={formik.values.nama_paket}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                              formik.errors.nama_paket &&
                              formik.touched.nama_paket
                            }
                            textError={formik.errors.nama_paket}
                          />
                          {/* <Input
                          placeholder="Harga"
                          name={"harga"}
                          type="number"
                          value={formik.values.harga}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isError={formik.errors.harga && formik.touched.harga}
                          textError={formik.errors.harga}
                        /> */}
                          <div>
                            {" "}
                            <CurrencyInput
                              className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
                              placeholder="Harga"
                              id="harga"
                              name="harga"
                              defaultValue={0}
                              decimalsLimit={2}
                              allowNegativeValue={false}
                              step={2}
                              value={formik.values.harga}
                              prefix="Rp "
                              onValueChange={(value) => {
                                // setNominal(value)
                                formik.setFieldValue("harga", value);
                              }}
                            />{" "}
                            {formik.errors.harga && formik.touched.harga && (
                              <p className="text-sm italic text-red-500">
                                {formik.errors.harga}
                              </p>
                            )}
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                          <button
                            className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                            type="button"
                            onClick={() => setShowCreate(false)}
                          >
                            Tutup
                          </button>
                          <button
                            className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                            type="submit"
                            onClick={() => formik.handleSubmit}
                          >
                            {isLoading ? "Proses" : "Simpan Perubahan"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-10"></div>
              </>
            ) : null}
          </div>
        </div>
        <div className="px-3">
          {" "}
          <table class="table-auto">
            <thead>
              <tr>
                <th className="w-[100px] border-b border-dashed border-gray-200 text-start font-medium">
                  No
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium ">
                  Nama Outlet
                </th>
                <th className="w-[200px] border-b border-dashed border-gray-200 text-start font-medium">
                  Jenis
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium">
                  Nama Paket
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium">
                  Harga
                </th>
                <th className="w-[200px] border-b border-dashed border-gray-200 text-start font-medium">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="relative">
              {listPaket.length === 0 ? (
                <div className="flex">
                  <p className="absolute top-[13rem] right-[28rem]">
                    *** Tidak Ada Data ***
                  </p>
                </div>
              ) : (
                <>
                  {" "}
                  {listPaket?.map((item, index) => {
                    return (
                      <tr className="text-left ">
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                          {index + 1}
                        </td>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium ">
                          {item.outlet.nama}
                        </td>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                          {item.jenis}
                        </td>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                          {item.nama_paket}
                        </td>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                          {convert(item.harga)}
                        </td>
                        <td className="grid w-[200px] grid-cols-2 gap-2 border-b border-dashed border-gray-300">
                          {" "}
                          <button
                            className="mr-1 mb-1 flex h-10 items-center
justify-center rounded text-sm font-bold uppercase  text-black outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-pink-600"
                            type="button"
                            style={{
                              background: "#fafafa",
                              margin: "12px 0",
                            }}
                            onClick={() => getDetailPaketHandle(item?.id)}
                          >
                            <PencilIcon className="h-[22px] w-[22px] text-black" />
                          </button>
                          {showModal ? (
                            <>
                              <div className="fixed inset-0 z-50 flex w-screen items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                                <div className="relative my-6 mx-auto w-1/3 max-w-3xl">
                                  {/*content*/}
                                  <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 py-4 px-5">
                                      <h3 className="text-2xl font-semibold text-black">
                                        Edit Paket
                                      </h3>
                                      <button
                                        className="text-red-00 float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
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
                                      <div className="relative my-4 flex-auto space-y-3 p-6">
                                        <Select
                                          name="id_outlet"
                                          value={formikEdit.values.id_outlet}
                                          onChange={formikEdit.handleChange}
                                          isError={
                                            formikEdit.errors.id_outlet &&
                                            formikEdit.touched.id_outlet
                                          }
                                          textError={
                                            formikEdit.errors.id_outlet
                                          }
                                        >
                                          <option
                                            value=""
                                            className="text-gray-400"
                                          >
                                            Pilih Nama Toko
                                          </option>
                                          {listOutlet?.map((item, index) => {
                                            return (
                                              <option value={item?.id}>
                                                {item?.nama}
                                              </option>
                                            );
                                          })}
                                        </Select>
                                        <Select
                                          name="jenis"
                                          value={formikEdit.values.jenis}
                                          onChange={formikEdit.handleChange}
                                          isError={
                                            formikEdit.errors.jenis &&
                                            formikEdit.touched.jenis
                                          }
                                          textError={formikEdit.errors.jenis}
                                        >
                                          <option
                                            value=""
                                            className="text-gray-400"
                                          >
                                            Pilih Peran
                                          </option>
                                          <option value="kiloan">Kiloan</option>
                                          <option value="selimut">
                                            Selimut
                                          </option>
                                          <option value="bed_cover">
                                            Bed Cover
                                          </option>
                                          <option value="kaos">Kaos</option>
                                          <option value="lainn">Lain</option>
                                        </Select>
                                        <Input
                                          placeholder="Nama Paket"
                                          name="nama_paket"
                                          value={formikEdit.values.nama_paket}
                                          onChange={formikEdit.handleChange}
                                          onBlur={formikEdit.handleBlur}
                                          isError={
                                            formikEdit.errors.nama_paket &&
                                            formikEdit.touched.nama_paket
                                          }
                                          textError={
                                            formikEdit.errors.nama_paket
                                          }
                                        />
                                        <div>
                                          {" "}
                                          <CurrencyInput
                                            className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
                                            placeholder="Harga"
                                            id="harga"
                                            name="harga"
                                            defaultValue={0}
                                            decimalsLimit={2}
                                            allowNegativeValue={false}
                                            step={2}
                                            value={formikEdit.values.harga}
                                            prefix="Rp "
                                            onValueChange={(value) => {
                                              // setNominal(value)
                                              formikEdit.setFieldValue(
                                                "harga",
                                                value
                                              );
                                            }}
                                          />{" "}
                                          {formikEdit.errors.harga &&
                                            formikEdit.touched.harga && (
                                              <p className="text-sm italic text-red-500">
                                                {formikEdit.errors.harga}
                                              </p>
                                            )}
                                        </div>
                                      </div>
                                      {/*footer*/}
                                      <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                                        <button
                                          className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                                          type="button"
                                          onClick={() => setShowModal(false)}
                                        >
                                          Tutup
                                        </button>
                                        <button
                                          className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                          type="submit"
                                          onClick={async () => {
                                            try {
                                              setIsLoading(true);
                                              const response =
                                                await updatePaket(
                                                  formikEdit.values.id,
                                                  formikEdit.values
                                                );
                                              console.log(
                                                "update =>",
                                                response
                                              );
                                              getListPaketHandle();
                                              toast.success(
                                                response?.data?.msg
                                              );
                                              return setShowModal(false);
                                            } catch (error) {
                                              console.log(error);
                                            } finally {
                                              setIsLoading(false);
                                            }
                                          }}
                                        >
                                          Simpan Perubahan
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="fixed inset-0 z-40 bg-black opacity-5"></div>
                            </>
                          ) : null}
                          <ModalDelete
                            onclick={async () => {
                              try {
                                const response = await deletePaket(item?.id);
                                console.log("delete =>", response);
                                console.log("delete ID =>", item.id);
                                // toast.success(response.data.);
                                getListPaketHandle();
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                            color={"#fafafa"}
                            margin={"12px 0"}
                            height={"40px"}
                            width={"95px"}
                            title={"Delete"}
                            subTitle={"Paket"}
                          >
                            <TrashIcon className="h-[22px] w-[22px] text-black" />
                          </ModalDelete>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>{" "}
      </div>
      <div className="flex w-full items-center justify-end gap-5">
        {page === 1 ? (
          <FiChevronLeft
            className="cursor-not-allowed text-gray-100"
            color="gray"
          />
        ) : (
          <FiChevronLeft
            className="cursor-pointer"
            color="black"
            onClick={() => setPage(page - 1)}
          />
        )}
        <div className="my-1 flex h-[40px] w-[40px] items-center justify-center rounded-md border border-gray-300 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none">
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

export default Paket;
