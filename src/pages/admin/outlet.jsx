import { useFormik } from "formik";
import { Filter, Input, Search } from "../../komponen/input";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../../komponen/ModalDelete";
import Textarea from "../../komponen/Textarea";
import { useState } from "react";
export default function Outlet() {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
      return setShowModal(false) || setShowCreate(false);
      // return navigate("/home/outlet", { replace: true });
    },
  });
  return (
    <div className="border border-gray-100 h-full rounded-lg px-4 py-3">
      <div className="flex justify-between mb-5">
        <p className="font-semibold text-lg">Outlet Data</p>
        <div className="flex space-x-3">
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
            Create Outlet
          </button>
          {showCreate ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
                <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between py-4 px-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-semibold">Create Outlet</h3>
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
                        <Input
                          placeholder="Nama"
                          name={"nama"}
                          values={formik.values.nama}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isError={formik.errors.nama && formik.touched.nama}
                          textError={formik.errors.nama}
                        />
                        <Textarea
                          placeholder="Alamat"
                          name={"alamat"}
                          values={formik.values.alamat}
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
                          values={formik.values.telephone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isError={
                            formik.errors.telephone && formik.touched.telephone
                          }
                          textError={formik.errors.telephone}
                        />
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
          ) : null}
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
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[400px]">
                Nama
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Alamat
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Telephone
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
              <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                Malcolm Lockyer
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
                          <form action="" onSubmit={formik.handleSubmit}>
                            <div className="relative p-6 my-4 space-y-3 flex-auto ">
                              <Input
                                placeholder="Nama"
                                name={"nama"}
                                values={formik.values.nama}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isError={
                                  formik.errors.nama && formik.touched.nama
                                }
                                textError={formik.errors.nama}
                              />
                              <Textarea
                                placeholder="Alamat"
                                name={"alamat"}
                                values={formik.values.alamat}
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
                                values={formik.values.telephone}
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
                ) : null}
                <ModalDelete
                  color={"black"}
                  margin={"12px 0"}
                  title={"Delete"}
                  subTitle={"Outlet"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
