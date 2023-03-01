import { useFormik } from "formik";
import React, { useState } from "react";
import { Filter, Input, Search } from "../../komponen/input";
import ModalDelete from "../../komponen/ModalDelete";
import Select from "../../komponen/select";
import * as Yup from "yup";
import PasswordInput from "../../komponen/InputPassword";
const Member = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const formik = useFormik({
    initialValues: {
      nama: "",
      username: "",
      password: "",
      nama_outlet: "",
      role: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama  is required"),
      username: Yup.string().required("Username  is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      nama_outlet: Yup.string().required("Nama Outlet is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
      return setShowCreate(false)
    },
  });
  const formikEdit = useFormik({
    initialValues: {
      nama: "",
      username: "",
      password: "",
      nama_outlet: "",
      role: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama  is required"),
      username: Yup.string().required("Username  is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      nama_outlet: Yup.string().required("Nama Outlet is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
      return setShowModal(false)
    },
  });
  return (
    <div className="border border-gray-100 h-full rounded-lg px-4 py-3">
      <div className="flex justify-between mb-5">
        <p className="font-semibold text-lg ">Member Data</p>
        <div className="flex">
          {" "}
          <Search />
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
                          name="nama_outlet"
                          value={formik.values.nama_outlet}
                          onChange={formik.handleChange}
                          isError={
                            formik.errors.nama_outlet &&
                            formik.touched.nama_outlet
                          }
                          textError={formik.errors.nama_outlet}
                        >
                          <option value="" className="text-gray-400">
                            Pilih Nama Outlet
                          </option>
                          <option value="admin">Option 1</option>
                          <option value="kasir">Option 2</option>
                          <option value="owner">Option 3</option>
                        </Select>
                        <Select
                          name="role"
                          value={formik.values.role}
                          onChange={formik.handleChange}
                          isError={formik.errors.role && formik.touched.role}
                          textError={formik.errors.role}
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
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[50px]">
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
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Akses
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-left ">
              <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                1
              </td>
              <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300 ">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                Malcolm Lockyer
              </td>
              <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                1961
              </td>
              <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                1961
              </td>
              <td className="grid grid-cols-2 w-[200px] gap-2 border-b border-dashed border-gray-300">
                <button
                  className="text-black h-10 active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  style={{
                    background: "#E0D5C4",
                    margin: "12px 0",
                  }}
                  onClick={() => setShowModal(true)}
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
                              Edit Outlet
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-red-00 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              ×
                            </button>
                          </div>
                          {/*body*/}
                          <form action="" onSubmit={formikEdit.handleSubmit}>
                            <div className="relative p-6 my-4 space-y-3 flex-auto ">
                              <div className="grid grid-cols-2 gap-4">
                                <Input
                                  placeholder="Nama Pengguna"
                                  name={"nama"}
                                  type="text"
                                  values={formikEdit.values.nama}
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
                                  values={formikEdit.values.username}
                                  onChange={formikEdit.handleChange}
                                  onBlur={formikEdit.handleBlur}
                                  isError={
                                    formikEdit.touched.username &&
                                    formikEdit.errors.username
                                  }
                                  textError={formikEdit.errors.username}
                                />{" "}
                              </div>
                              <PasswordInput
                                value={formikEdit.values.password}
                                placeholder={"Passcode"}
                                name={"password"}
                                type="password"
                                onBlur={formikEdit.handleBlur}
                                onChange={formikEdit.handleChange}
                                isError={
                                  formikEdit.touched.password &&
                                  formikEdit.errors.password
                                }
                                textError={formikEdit.errors.password}
                              />
                              <Select
                                name="nama_outlet"
                                value={formikEdit.values.nama_outlet}
                                onChange={formikEdit.handleChange}
                                isError={
                                  formikEdit.errors.nama_outlet &&
                                  formikEdit.touched.nama_outlet
                                }
                                textError={formikEdit.errors.nama_outlet}
                              >
                                <option value="" className="text-gray-400">
                                  Pilih Nama Outlet
                                </option>
                                <option value="admin">Option 1</option>
                                <option value="kasir">Option 2</option>
                                <option value="owner">Option 3</option>
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
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}

                <ModalDelete
                  color={"black"}
                  margin={"12px 0"}
                  title={"Delete"}
                  subTitle={"Pengguna"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Member;
