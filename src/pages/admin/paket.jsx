import React, { useEffect, useState } from "react";
import { Filter, Input, Search } from "../../komponen/input";
import Select from "../../komponen/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalDelete from "../../komponen/ModalDelete";
import {
  createPaket,
  deletePaket,
  getAllPaket,
  getDetailPaket,
  updatePaket,
} from "../../API/paket";
import { toast } from "react-toastify";
import { getAllOutlet } from "../../API/outlet";

const Paket = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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
          getListPaketHandle();
          alert(JSON.stringify(values, null, 2));
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
      setListPaket(response.data.data.rows);
    } catch (error) {
      console.log(error);
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
    <div className="border border-gray-100 h-full rounded-lg px-4 py-3">
      <div className="flex justify-between mb-5">
        <p className="font-semibold text-lg">Paket Data</p>
        <div className="flex ">
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
            Create Paket
          </button>
          {showCreate ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
                <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between py-4 px-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-semibold">Create Paket</h3>
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
                          name="jenis"
                          value={formik.values.jenis}
                          onChange={formik.handleChange}
                          isError={formik.errors.jenis && formik.touched.jenis}
                          textError={formik.errors.jenis}
                        >
                          <option value="" className="text-gray-400">
                            Pilih Jenis
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
                        <Input
                          placeholder="Harga"
                          name={"harga"}
                          type="number"
                          value={formik.values.harga}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isError={formik.errors.harga && formik.touched.harga}
                          textError={formik.errors.harga}
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
                          {isLoading ? "Proses" : "Save Change"}
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
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[100px]">
                No
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[250px] ">
                Nama Outlet
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Jenis
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[250px]">
                Nama Paket
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[250px]">
                Harga
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {listPaket?.map((item, index) => {
              return (
                <tr className="text-left ">
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                    {item.id}
                  </td>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300 ">
                    {item.outlet.nama}
                  </td>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                    {item.jenis}
                  </td>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                    {item.nama_paket}
                  </td>
                  <td className="font-medium text-[14.5px] border-b border-dashed border-gray-300">
                    {item.harga}
                  </td>
                  <td className="grid grid-cols-2 w-[200px] gap-2 border-b border-dashed border-gray-300">
                    {" "}
                    <button
                      className="text-black h-10 active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      style={{
                        background: "#E0D5C4",
                        margin: "12px 0",
                      }}
                      onClick={() => getDetailPaketHandle(item?.id)}
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
                                <h3 className="text-2xl font-semibold text-black">
                                  Edit Paket
                                </h3>
                                <button
                                  className="p-1 text-black ml-auto bg-transparent border-0 text-red-00 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
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
                                <div className="relative p-6 my-4 space-y-3 flex-auto">
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
                                    name="jenis"
                                    value={formikEdit.values.jenis}
                                    onChange={formikEdit.handleChange}
                                    isError={
                                      formikEdit.errors.jenis &&
                                      formikEdit.touched.jenis
                                    }
                                    textError={formikEdit.errors.jenis}
                                  >
                                    <option value="" className="text-gray-400">
                                      Pilih Jenis
                                    </option>
                                    <option value="kiloan">Kiloan</option>
                                    <option value="selimut">Selimut</option>
                                    <option value="bed_cover">Bed Cover</option>
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
                                    textError={formikEdit.errors.nama_paket}
                                  />
                                  <Input
                                    placeholder="Harga"
                                    name="harga"
                                    type="number"
                                    value={formikEdit.values.harga}
                                    onChange={formikEdit.handleChange}
                                    onBlur={formikEdit.handleBlur}
                                    isError={
                                      formikEdit.errors.harga &&
                                      formikEdit.touched.harga
                                    }
                                    textError={formikEdit.errors.harga}
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
                                    onClick={async () => {
                                      try {
                                        setIsLoading(true);
                                        const response = await updatePaket(
                                          formikEdit.values.id,
                                          formikEdit.values
                                        );
                                        console.log("update =>", response);
                                        getListPaketHandle();
                                        return setShowModal(false);
                                      } catch (error) {
                                        console.log(error);
                                      } finally {
                                        setIsLoading(false);
                                      }
                                    }}
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
                      onclick={async (e) => {
                        try {
                          e.preventDefault();
                          const response = await deletePaket(item?.id);
                          console.log("delete =>", response);
                          console.log("delete ID =>", item.id);
                          getListPaketHandle();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      color={"black"}
                      margin={"12px 0"}
                      title={"Delete"}
                      subTitle={"Paket"}
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

export default Paket;
