import React from "react";
import Input from "../../komponen/input";
import Modal from "../../komponen/Modal";
import Select from "../../komponen/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../../komponen/ModalDelete";

const Paket = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nama_outlet: "",
      jenis: "",
      nama_paket: "",
      harga: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username  is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
      return navigate("/home/outlet", { replace: true });
    },
  });
  return (
    <div className="border border-gray-100 h-full rounded-lg px-4 py-3">
      <div className="flex justify-between mb-3">
        <p>Paket Data</p>
        <Modal title={"Create Paket"} color={"#B8C0B8"}>
          <Select
            name="nama_outlet"
            value={formik.values.nama_outlet}
            onChange={formik.handleChange}
            isError={formik.errors.nama_outlet && formik.touched.nama_outlet}
            textError={formik.errors.nama_outlet}
          >
            <option value="" className="text-gray-400">
              Pilih Nama Outlet
            </option>
            <option value="admin">Admin</option>
            <option value="kasir">Kasir</option>
            <option value="owner">Owner</option>
            <option value="owner">Owner</option>
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
            values={formik.values.nama_paket}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            placeholder="Harga"
            name={"harga"}
            type="number"
            values={formik.values.harga}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Modal>
      </div>
      <div className="px-3">
        {" "}
        <table class="table-auto ">
          <thead>
            <tr>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[50px]">
                No
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[350px] ">
                Nama Outlet
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Jenis
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[250px]">
                Nama Paket
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Harga
              </th>
              <th className="font-medium text-start border-b border-dashed border-gray-200 w-[200px]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-left ">
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300">
                1
              </td>
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300 ">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300">
                Malcolm Lockyer
              </td>
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300">
                1961
              </td>
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300">
                1961
              </td>
              <td className="grid grid-cols-2 w-[200px] gap-2 border-b border-dashed border-gray-300">
                <Modal title={"Edit"} color={"#E0D5C4"} margin={"12px 0"}>
                  <Select
                    name="nama_outlet"
                    value={formik.values.nama_outlet}
                    onChange={formik.handleChange}
                    isError={
                      formik.errors.nama_outlet && formik.touched.nama_outlet
                    }
                    textError={formik.errors.nama_outlet}
                  >
                    <option value="" className="text-gray-400">
                      Pilih Nama Outlet
                    </option>
                    <option value="admin">Admin</option>
                    <option value="kasir">Kasir</option>
                    <option value="owner">Owner</option>
                    <option value="owner">Owner</option>
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
                    values={formik.values.nama_paket}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Input
                    placeholder="Harga"
                    name={"harga"}
                    type="number"
                    values={formik.values.harga}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Modal>
                <ModalDelete color={"black"} margin={"12px 0"} title={'Delete'} subTitle={'Paket'} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Paket;
