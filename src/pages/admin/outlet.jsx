import { useFormik } from "formik";
import { Filter, Input, Search } from "../../komponen/input";
import * as Yup from "yup";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ModalDelete from "../../komponen/Modals/ModalDelete";
import Textarea from "../../komponen/Textarea";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import {
  createOutlet,
  deleteOutlet,
  detailOutlet,
  getAllOutlet,
  updateOutlet,
} from "../../API/outlet";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { PatternFormat } from "react-number-format";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import phoneNumberFormatter from "phone-number-formats";
import { parsePhoneNumber } from "libphonenumber-js";

export default function Outlet() {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listOutlet, setListOutlet] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const search = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => {},
  });
  const formik = useFormik({
    initialValues: {
      nama: "",
      alamat: "",
      telephone: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama Outlet is required"),
      alamat: Yup.string().required("Alamat is required"),
      telephone: Yup.string().required("Telephone is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const response = await createOutlet(values);
        console.log(response);
        if (response?.status === 200) {
          toast.success(response?.data?.msg);
          formik.resetForm();
          getListOutletHandle();
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
      nama: "",
      alamat: "",
      telephone: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama Outlet is required"),
      alamat: Yup.string().required("Alamat is required"),
      telephone: Yup.number().required("Telephone is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await updateOutlet(values.id, values);
        console.log(response);
        toast.success(response?.data?.msg);
        getListOutletHandle();
        return setShowModal(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const getListOutletHandle = async () => {
    try {
      setIsLoading(true);
      const response = await getAllOutlet(
        search.values.keyword,
        page,
        pageSize
      );
      console.log(response.data.data);
      setListOutlet(response.data.data.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListOutletHandle();
  }, [search.values.keyword, page, pageSize]);

  //   if (role === 'adin') [

  //   ]else {
  //     return (<div>anda tidak memiliki role untuk mengakses halaman ini</div>)
  // }
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-lg border border-gray-100 px-4 py-3">
      {" "}
      <div>
        <div className="mb-5 flex justify-between">
          <p className="text-lg font-semibold">Data Toko</p>
          <div className="flex">
            {" "}
            <Search
              nama={"keyword"}
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
              Buat Toko
            </button>
            {showCreate ? (
              <>
                <div className="fixed inset-0 z-50 flex w-screen items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                  <div className="relative my-6 mx-auto w-1/3 max-w-3xl">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 py-4 px-5">
                        <h3 className="text-2xl font-semibold">Buat Toko</h3>
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
                            placeholder="Nama"
                            name={"nama"}
                            value={formik.values.nama}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.errors.nama && formik.touched.nama}
                            textError={formik.errors.nama}
                          />
                          <Textarea
                            placeholder="Alamat"
                            name={"alamat"}
                            value={formik.values.alamat}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                              formik.errors.alamat && formik.touched.alamat
                            }
                            textError={formik.errors.alamat}
                          />
                          <Input
                            placeholder="Telephone"
                            name={"telephone"}
                            type="number"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                              formik.errors.telephone &&
                              formik.touched.telephone
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
                            onClick={(e) => {
                              e.preventDefault();
                              formik.handleSubmit();
                            }}
                          >
                            Simpan Perubahan
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
          <table class="relative table-auto">
            <thead>
              <tr>
                <th className="w-[100px] border-b border-dashed border-gray-200 text-start  font-medium">
                  No
                </th>
                <th className="w-[265px] border-b border-dashed border-gray-200 text-start font-medium">
                  Nama
                </th>
                <th className="w-[265px] border-b border-dashed border-gray-200 text-start font-medium">
                  Alamat
                </th>
                <th className="w-[265px] border-b border-dashed border-gray-200 text-start font-medium">
                  Telephone
                </th>
                <th className="w-[200px] border-b border-dashed border-gray-200 text-start font-medium">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {listOutlet.length === 0 ? (
                <div className="flex">
                  <p className="absolute top-[13rem] right-[28rem]">
                    *** Tidak Ada Data ***
                  </p>
                </div>
              ) : (
                <>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5}>
                        <Skeleton
                          baseColor="white"
                          highlightColor="grey"
                          height={80}
                          count={20}
                        />
                      </td>
                    </tr>
                  ) : (
                    listOutlet?.map((item, index) => {
                      return (
                        <tr className="text-left " key={index}>
                          <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                            {index + 1}
                          </td>
                          <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                            {item.nama}
                          </td>
                          <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                            {item.alamat}
                          </td>
                          <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                            {item?.tlp}
                          </td>

                          <td className="grid w-[200px] grid-cols-2 gap-2 border-b border-dashed border-gray-300">
                            <button
                              className="mr-1 mb-1 flex h-10 items-center justify-center rounded  text-sm font-bold uppercase text-black outline-none transition-all duration-150 ease-linear focus:outline-none"
                              type="button"
                              style={{
                                background: "#fafafa",
                                margin: "12px 0",
                              }}
                              onClick={async () => {
                                try {
                                  const response = await detailOutlet(item.id);
                                  console.log(response);
                                  const dataOutlet = response.data.data;
                                  console.log("dataOutlet =>", dataOutlet);
                                  formikEdit.setValues({
                                    id: dataOutlet?.id,
                                    nama: dataOutlet?.nama,
                                    alamat: dataOutlet?.alamat,
                                    telephone: dataOutlet?.tlp,
                                  });
                                  setShowModal(true);
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
                                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-sm outline-none focus:outline-none">
                                      {/*header*/}
                                      <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 py-4 px-5">
                                        <h3 className="text-2xl font-semibold">
                                          Edit Toko
                                        </h3>
                                        <button
                                          className="text-red-00 float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                                          onClick={async () => {
                                            setShowModal(false);
                                          }}
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
                                            placeholder="Nama"
                                            name={"nama"}
                                            value={formikEdit.values.nama}
                                            onChange={formikEdit.handleChange}
                                            onBlur={formikEdit.handleBlur}
                                            isError={
                                              formikEdit.errors.nama &&
                                              formikEdit.touched.nama
                                            }
                                            textError={formikEdit.errors.nama}
                                          />
                                          <Textarea
                                            placeholder="Alamat"
                                            name={"alamat"}
                                            value={formikEdit.values.alamat}
                                            onChange={formikEdit.handleChange}
                                            onBlur={formikEdit.handleBlur}
                                            isError={
                                              formikEdit.errors.alamat &&
                                              formikEdit.touched.alamat
                                            }
                                            textError={formikEdit.errors.alamat}
                                          />
                                          <Input
                                            placeholder="Telephone"
                                            name={"telephone"}
                                            type="number"
                                            value={formikEdit.values.telephone}
                                            onChange={formikEdit.handleChange}
                                            onBlur={formikEdit.handleBlur}
                                            isError={
                                              formikEdit.errors.telephone &&
                                              formikEdit.touched.telephone
                                            }
                                            textError={
                                              formikEdit.errors.telephone
                                            }
                                          />{" "}
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
                                            onClick={() => formik.handleSubmit}
                                          >
                                            {isLoading
                                              ? "Proses"
                                              : "Simpan Perubahan"}
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div className="fixed inset-0 z-40 bg-black opacity-[0.03]"></div>
                              </>
                            ) : null}
                            <ModalDelete
                              onclick={async (e) => {
                                try {
                                  e.preventDefault();
                                  const response = await deleteOutlet(item.id);
                                  console.log("delete =>", response);
                                  console.log("delete ID =>", item.id);
                                  toast.success(response.data.msg);
                                  getListOutletHandle();
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
                              subTitle={"Toko"}
                            >
                              {" "}
                              <TrashIcon className="h-[22px] w-[22px] text-black" />
                            </ModalDelete>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
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
}
