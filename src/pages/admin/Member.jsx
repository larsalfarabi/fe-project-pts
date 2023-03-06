import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Filter, Input, Search } from "../../komponen/input";
import ModalDelete from "../../komponen/ModalDelete";
import Select from "../../komponen/select";
import * as Yup from "yup";
import PasswordInput from "../../komponen/InputPassword";
import {
  createMember,
  deleteMember,
  getAllMember,
  getDetailUser,
  updateUser,
} from "../../API/member";
import { getAllOutlet } from "../../API/outlet";
import { toast } from "react-toastify";
const Member = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [listMember, setListMember] = useState([]);
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
        const response = await createMember(values);
        console.log("create =>", response);
        if (response?.status === 200) {
          toast.success(response?.data?.msg, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          formik.resetForm();
          getListMemberHandle();
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
        getListMemberHandle();
        return setShowModal(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const getListMemberHandle = async () => {
    try {
      setIsLoading(true);
      const response = await getAllMember(
        search.values.keyword,
        page,
        pageSize
      );
      console.log("User =>", response);
      setListMember(response?.data?.data?.rows);
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
  const getDetailMember = async (id) => {
    try {
      setShowModal(true);
      const response = await getDetailUser(id);
      console.log(response);
      const dataUser = response.data.data;
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
    getListMemberHandle();
    getListOutletHandle();
  }, [search.values.keyword, page, pageSize]);
  return (
    <div className="border border-gray-100 h-full rounded-lg px-4 py-3">
      <div className="flex justify-between mb-5">
        <p className="font-semibold text-lg ">Member Data</p>
        <div className="flex">
          {" "}
          <Search
            nama="keyword"
            value={search.values.keyword}
            change={search.handleChange}
          />
          <Filter />
          <button
            className="text-black h-10 active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            style={{
              background: "#fafafa",
            }}
            onClick={() => setShowCreate(true)}
          >
            Create Member
          </button>
          {showCreate ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
                <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between py-4 px-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-semibold">Create Member</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-red-00 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowCreate(false)}
                      >
                        ×
                      </button>
                    </div>
                    {/*body*/}
                    <form action="" onSubmit={formik.handleSubmit}>
                      <div className="relative p-6 my-4 space-y-3 flex-auto ">
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Nama Pengguna"
                            name={"nama"}
                            type="text"
                            values={formik.values.nama}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.nama && formik.errors.nama}
                            textError={formik.errors.nama}
                          />{" "}
                          <Input
                            placeholder="Username"
                            name={"username"}
                            type="text"
                            values={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                              formik.touched.username && formik.errors.username
                            }
                            textError={formik.errors.username}
                          />{" "}
                        </div>
                        <PasswordInput
                          value={formik.values.password}
                          placeholder={"Passcode"}
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
                            formik.errors.id_outlet && formik.touched.id_outlet
                          }
                          textError={formik.errors.id_outlet}
                        >
                          <option value="" className="text-gray-400">
                            Pilih Nama Outlet
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
                            Pilih Role
                          </option>
                          <option value="admin">Admin</option>
                          <option value="kasir">Kasir</option>
                          <option value="owner">Owner</option>
                        </Select>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowCreate(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}{" "}
        </div>
      </div>
      <div className="px-3">
        {" "}
        <table class="table-auto ">
          <thead>
            <tr>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[100px]">
                No
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[250px] ">
                Nama
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[250px]">
                Username
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[250px]">
                Nama Outlet
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[250px]">
                Role
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {listMember?.map((item, index) => {
              return (
                <tr className="text-left " key={index}>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                    {item.id}
                  </td>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300 ">
                    {item.nama}
                  </td>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                    {item.username}
                  </td>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                    {item.outlet.nama}
                  </td>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                    {item.role}
                  </td>
                  <td className="grid grid-cols-2 w-[200px] gap-2 border-b border-dashed border-gray-300">
                    <button
                      className="text-black h-10 active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      style={{
                        background: "#E0D5C4",
                        margin: "12px 0",
                      }}
                      onClick={() => getDetailMember(item.id)}
                    >
                      Edit
                    </button>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
                          <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between py-4 px-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-2xl font-semibold">
                                  Edit Member
                                </h3>
                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-red-00 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
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
                                <div className="relative p-6 my-4 space-y-3 flex-auto ">
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
                                    placeholder="Username"
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
                                    textError={formikEdit.errors.id_outlet}
                                  >
                                    <option value="" className="text-gray-400">
                                      Pilih Nama Outlet
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
                                    <option value="" className="text-gray-400">
                                      Pilih Jenis
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="owner">Owner</option>
                                  </Select>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                        <div className="opacity-5 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}

                    <ModalDelete
                      onclick={async (e) => {
                        try {
                          e.preventDefault();
                          const response = await deleteMember(item.id);
                          console.log("delete =>", response);
                          console.log("delete ID =>", item.id);
                          getListMemberHandle();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      color={"black"}
                      margin={"12px 0"}
                      title={"Delete"}
                      subTitle={"Pengguna"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Member;
