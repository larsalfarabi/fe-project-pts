import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ModalDelete from "../../komponen/Modals/ModalDelete";
import * as Yup from "yup";
import "yup-phone";
import { Filter, Search } from "../../komponen/input";
import { Input } from "../../komponen/input";
import Select from "../../komponen/select";
import {
  createPelanggan,
  deletePelanggan,
  getAllPelanggan,
  getDetailPelanggan,
  updatePelanggan,
} from "../../API/pelanggan";
import toast from "react-hot-toast";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
const Pelanggan = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [listPelanggan, setListPelanggan] = useState([]);
  const search = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => {
      const { keyword } = values;
      console.log("keyword =>", keyword);
    },
  });
  const formik = useFormik({
    initialValues: {
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      telephone: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama  is required"),
      alamat: Yup.string().required("Alamat  is required"),
      jenis_kelamin: Yup.string().required("Jenis Kelamin is required"),
      telephone: Yup.string().required("Invalid Phone Number"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await createPelanggan(values);
        console.log(response);
        if (response?.status === 200) {
          toast.success(response?.data?.msg);
          formik.resetForm();
          getListPelangganHandle();
          return setShowCreate(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const formikEdit = useFormik({
    initialValues: {
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      telephone: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama  is required"),
      alamat: Yup.string().required("Alamat  is required"),
      jenis_kelamin: Yup.string().required("Jenis Kelamin is required"),
      telephone: Yup.number().required("Telephone is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const response = await updatePelanggan(values.id, values);
        console.log(response);
        getListPelangganHandle();
        toast.success(response?.data?.msg);
        return setShowModal(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });
  const getListPelangganHandle = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPelanggan(
        search.values.keyword,
        page,
        pageSize
      );
      console.log(response);
      setListPelanggan(response.data.data.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getListPelangganHandle();
  }, [search.values.keyword, page, pageSize]);
  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-gray-100 px-4 py-3">
      <div>
        {" "}
        <div className="mb-5 flex justify-between">
          <p className="text-lg font-semibold ">Pelanggan Data</p>
          <div className="flex ">
            {" "}
            <Search
              nama="keyword"
              value={search.values.keyword}
              change={search.handleChange}
              submit={search.handleSubmit}
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
              Buat Pelanggan
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
                          Buat Pelanggan
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
                          <Input
                            placeholder="Nama Pelanggan"
                            name={"nama"}
                            type="text"
                            value={formik.values.nama}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.nama && formik.errors.nama}
                            textError={formik.errors.nama}
                          />{" "}
                          <Input
                            placeholder="Alamat"
                            name={"alamat"}
                            type="text"
                            value={formik.values.alamat}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                              formik.touched.alamat && formik.errors.alamat
                            }
                            textError={formik.errors.alamat}
                          />
                          <Select
                            name="jenis_kelamin"
                            value={formik.values.jenis_kelamin}
                            onChange={formik.handleChange}
                            isError={
                              formik.errors.jenis_kelamin &&
                              formik.touched.jenis_kelamin
                            }
                            textError={formik.errors.jenis_kelamin}
                          >
                            <option value="" className="text-gray-400">
                              Pilih Jenis Kelamin
                            </option>
                            <option value="laki-laki">Laki-laki</option>
                            <option value="perempuan">Perempuan</option>
                          </Select>
                          <Input
                            placeholder="Telephone"
                            name={"telephone"}
                            type="text"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                              formik.touched.telephone &&
                              formik.errors.telephone
                            }
                            textError={formik.errors.telephone}
                          />
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
                            Simpan perubahan
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 w-screen bg-black opacity-10"></div>
              </>
            ) : null}
          </div>
        </div>
        <div className="px-3">
          <table class="table-auto ">
            <thead>
              <tr>
                <th className="w-[100px] border-b border-dashed border-gray-200 text-start font-medium">
                  No
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium ">
                  Nama
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium">
                  Alamat
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium">
                  Jenis Kelamin
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium">
                  Telephone
                </th>
                <th className="w-[200px] border-b border-dashed border-gray-200 text-start font-medium">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="relative">
              {listPelanggan.length === 0 ? (
                <div className="flex">
                  <p className="absolute top-[13rem] right-[28rem]">
                    *** Tidak Ada Data ***
                  </p>
                </div>
              ) : (
                <>
                  {" "}
                  {listPelanggan?.map((item, index) => (
                    <tr className="text-left ">
                      <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                        {index + 1}
                      </td>
                      <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium ">
                        {item.nama}
                      </td>
                      <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                        {item.alamat}
                      </td>
                      <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                        {item.jenis_kelamin}
                      </td>
                      <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                        {item.tlp}
                      </td>
                      <td className="grid w-[200px] grid-cols-2 gap-2 border-b border-dashed border-gray-300">
                        <button
                          className="mr-1 mb-1 flex h-10 items-center justify-center rounded text-sm font-bold uppercase  text-black outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-pink-600"
                          type="button"
                          style={{
                            background: "#fafafa",
                            margin: "12px 0",
                          }}
                          onClick={async () => {
                            try {
                              setShowModal(true);
                              const response = await getDetailPelanggan(
                                item.id
                              );
                              console.log("detail =>", response);
                              const dataPelanggan = response.data.data;
                              formikEdit.setValues({
                                id: dataPelanggan?.id,
                                nama: dataPelanggan?.nama,
                                alamat: dataPelanggan?.alamat,
                                jenis_kelamin: dataPelanggan?.jenis_kelamin,
                                telephone: dataPelanggan?.tlp,
                              });
                            } catch (error) {
                              console.log(error);
                            }
                          }}
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
                                    <h3 className="text-2xl font-semibold">
                                      Edit Pelanggan
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
                                      <Input
                                        placeholder="Nama Pelanggan"
                                        name={"nama"}
                                        type="text"
                                        value={formikEdit.values.nama}
                                        onChange={formikEdit.handleChange}
                                        onBlur={formikEdit.handleBlur}
                                        isError={
                                          formikEdit.touched.nama &&
                                          formikEdit.errors.nama
                                        }
                                        textError={formikEdit.errors.nama}
                                      />{" "}
                                      <Input
                                        placeholder="Alamat"
                                        name={"alamat"}
                                        type="text"
                                        value={formikEdit.values.alamat}
                                        onChange={formikEdit.handleChange}
                                        onBlur={formikEdit.handleBlur}
                                        isError={
                                          formikEdit.touched.alamat &&
                                          formikEdit.errors.alamat
                                        }
                                        textError={formikEdit.errors.alamat}
                                      />
                                      <Select
                                        name="jenis_kelamin"
                                        value={formikEdit.values.jenis_kelamin}
                                        onChange={formikEdit.handleChange}
                                        isError={
                                          formikEdit.errors.jenis_kelamin &&
                                          formikEdit.touched.jenis_kelamin
                                        }
                                        textError={
                                          formikEdit.errors.jenis_kelamin
                                        }
                                      >
                                        <option
                                          value=""
                                          className="text-gray-400"
                                        >
                                          Pilih Jenis Kelamin
                                        </option>
                                        <option value="Laki-Laki">
                                          Laki-Laki
                                        </option>
                                        <option value="Perempuan">
                                          Perempuan
                                        </option>
                                      </Select>
                                      <Input
                                        placeholder="Telephone"
                                        name={"telephone"}
                                        type="text"
                                        value={formikEdit.values.telephone}
                                        onChange={formikEdit.handleChange}
                                        onBlur={formikEdit.handleBlur}
                                        isError={
                                          formikEdit.touched.telephone &&
                                          formikEdit.errors.telephone
                                        }
                                        textError={formikEdit.errors.telephone}
                                      />
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
                            <div className="fixed inset-0 z-40 w-screen bg-black opacity-5"></div>
                          </>
                        ) : null}
                        <ModalDelete
                          onclick={async (e) => {
                            try {
                              e.preventDefault();
                              const response = await deletePelanggan(item.id);
                              console.log("delete =>", response);
                              console.log("delete ID =>", item.id);
                              toast.success(response.data.msg);
                              getListPelangganHandle();
                              return setShowModal(false);
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          color={"#fafafa"}
                          margin={"12px 0"}
                          height={"40px"}
                          width={"95px"}
                          title={"Delete"}
                          subTitle={"Pelanggan / Customer"}
                        >
                          <TrashIcon className="h-[22px] w-[22px] text-black" />
                        </ModalDelete>
                      </td>
                    </tr>
                  ))}
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

export default Pelanggan;
