import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Filter, Input, Search } from "../../komponen/input";
import ModalDelete from "../../komponen/Modals/ModalDelete";
import Select from "../../komponen/select";
import * as Yup from "yup";
import PasswordInput from "../../komponen/InputPassword";
import {
  createUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  updateUser,
} from "../../API/user";
import { getAllOutlet } from "../../API/outlet";
import toast from "react-hot-toast";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [listUser, setListUser] = useState([]);
  const [listOutlet, setListOutlet] = useState([]);
  const search = useFormik({
    initialValues: {
      keyword: "",
    },
  });
  const formik = useFormik({
    initialValues: {
      nama: "",
      username: "",
      password: "",
      id_outlet: "",
      role: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama  is required"),
      username: Yup.string().required("Username  is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      id_outlet: Yup.string().required("Nama Outlet is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await createUser(values);
        console.log("create =>", response);
        if (response?.status === 200) {
          toast.success(response?.data?.msg);
          formik.resetForm();
          getListUserHandle();
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
      username: "",
      password: "",
      id_outlet: "",
      role: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama  is required"),
      username: Yup.string().required("Username  is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      id_outlet: Yup.string().required("Nama Outlet is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await updateUser(values.id, values);
        console.log(response);
        getListUserHandle();
        return setShowModal(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const getListUserHandle = async () => {
    try {
      setIsLoading(true);
      const response = await getAllUser(search.values.keyword, page, pageSize);
      console.log("User =>", response);
      setListUser(response?.data?.data?.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getListOutletHandle = async () => {
    try {
      setIsLoading(true);
      const response = await getAllOutlet(
        search.values.keyword,
        page,
        pageSize
      );
      console.log(response.data.data);
      setListOutlet(response?.data?.data?.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getDetailUserHandle = async (id) => {
    try {
      setShowModal(true);
      const response = await getDetailUser(id);
      console.log(response);
      const dataUser = response?.data?.data;
      formikEdit.setValues({
        id: dataUser?.id,
        nama: dataUser?.nama,
        username: dataUser?.username,
        password: dataUser?.password,
        id_outlet: dataUser?.id_outlet,
        role: dataUser?.role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListUserHandle();
    getListOutletHandle();
  }, [search.values.keyword, page, pageSize]);
  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-gray-100 px-4 py-3">
      <div>
        {" "}
        <div className="mb-5 flex justify-between">
          <p className="text-lg font-semibold ">Data Pengguna</p>
          <div className="flex">
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
              Buat Pengguna
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
                          Buat Pengguna
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
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="Nama Pengguna"
                              name={"nama"}
                              type="text"
                              values={formik.values.nama}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isError={
                                formik.touched.nama && formik.errors.nama
                              }
                              textError={formik.errors.nama}
                            />{" "}
                            <Input
                              placeholder="Nama belakang"
                              name={"username"}
                              type="text"
                              values={formik.values.username}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isError={
                                formik.touched.username &&
                                formik.errors.username
                              }
                              textError={formik.errors.username}
                            />
                          </div>
                          <PasswordInput
                            value={formik.values.password}
                            placeholder={"Kode Sandi"}
                            name={"password"}
                            type="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isError={
                              formik.touched.password && formik.errors.password
                            }
                            textError={formik.errors.password}
                          />
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
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            isError={formik.errors.role && formik.touched.role}
                            textError={formik.errors.role}
                          >
                            <option value="" className="text-gray-400">
                              Pilih Peran
                            </option>
                            <option value="admin">Admin</option>
                            <option value="kasir">Kasir</option>
                            <option value="owner">Owner</option>
                          </Select>
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
                            Simpan Perubahan
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
        <div className="px-3">
          {" "}
          <table class="table-auto ">
            <thead>
              <tr>
                <th className="w-[100px] border-b border-dashed border-gray-200 text-start font-medium">
                  No
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium ">
                  Name
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium">
                  Nama Belakang
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium">
                  Nama Toko
                </th>
                <th className="w-[250px] border-b border-dashed border-gray-200 text-start font-medium">
                  Peran
                </th>
                <th className="w-[200px] border-b border-dashed border-gray-200 text-start font-medium">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="relative">
              {listUser.length === 0 ? (
                <div className="flex">
                  <p className="absolute top-[13rem] right-[28rem]">
                    *** Tidak Ada Data ***
                  </p>
                </div>
              ) : (
                <>
                  {" "}
                  {listUser?.map((item, index) => {
                    return (
                      <tr className="text-left " key={index}>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                          {index + 1}
                        </td>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium ">
                          {item.nama}
                        </td>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                          {item.username}
                        </td>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                          {item.outlet.nama}
                        </td>
                        <td className="border-b border-dashed border-gray-300 text-[14.5px] font-medium">
                          {item.role}
                        </td>
                        <td className="grid w-[200px] grid-cols-2 gap-2 border-b border-dashed border-gray-300">
                          <button
                            className="mr-1 mb-1 flex h-10 items-center justify-center rounded text-sm font-bold uppercase  text-black outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-pink-600"
                            type="button"
                            style={{
                              background: "#fafafa",
                              margin: "12px 0",
                            }}
                            onClick={() => getDetailUserHandle(item?.id)}
                          >
                            <PencilIcon className="h-[22px] w-[22px] text-black" />{" "}
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
                                        Edit Pengguna
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
                                          placeholder="Nama Pengguna"
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
                                          placeholder="Nama Belakang"
                                          name={"username"}
                                          type="text"
                                          value={formikEdit.values.username}
                                          onChange={formikEdit.handleChange}
                                          onBlur={formikEdit.handleBlur}
                                          isError={
                                            formikEdit.touched.username &&
                                            formikEdit.errors.username
                                          }
                                          textError={formikEdit.errors.username}
                                        />{" "}
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
                                          name="role"
                                          value={formikEdit.values.role}
                                          onChange={formikEdit.handleChange}
                                          isError={
                                            formikEdit.errors.role &&
                                            formikEdit.touched.role
                                          }
                                          textError={formikEdit.errors.role}
                                        >
                                          <option
                                            value=""
                                            className="text-gray-400"
                                          >
                                            Pilih Peran
                                          </option>
                                          <option value="admin">Admin</option>
                                          <option value="kasir">Kasir</option>
                                          <option value="owner">Owner</option>
                                        </Select>
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
                                          onClick={() =>
                                            formikEdit?.handleSubmit
                                          }
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
                            onclick={async (e) => {
                              try {
                                e.preventDefault();
                                const response = await deleteUser(item?.id);
                                console.log("delete =>", response);
                                console.log("delete ID =>", item.id);
                                getListUserHandle();
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                            color={"#fafafa"}
                            margin={"12px 0"}
                            height={"40px"}
                            width={"95px"}
                            title={"Delete"}
                            subTitle={"Pengguna"}
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
};

export default User;
