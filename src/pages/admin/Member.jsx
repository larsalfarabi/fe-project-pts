import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../komponen/input";
import Modal from "../../komponen/Modal";
import ModalDelete from "../../komponen/ModalDelete";
import Select from "../../komponen/select";
import * as Yup from "yup";
import PasswordInput from "../../komponen/InputPassword";
const Member = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nama: "",
      username: "",
      password: "",
      nama_outlet: "",
      role: "",
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
        <p>Member Data</p>
        <Modal title={"Create Paket"} color={"#B8C0B8"}>
          {" "}
          <Input
            placeholder="Nama Pengguna"
            name={"nama"}
            type="text"
            values={formik.values.nama}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
          <Input
            placeholder="Username"
            name={"username"}
            type="text"
            values={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
          <PasswordInput
            value={formik.values.password}
            placeholder={"Passcode"}
            name={"password"}
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={formik.touched.password && formik.errors.password}
            textError={formik.errors.password}
          />
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
                  <Input
                    placeholder="Nama Pengguna"
                    name={"nama"}
                    type="text"
                    values={formik.values.nama}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />{" "}
                  <Input
                    placeholder="Username"
                    name={"username"}
                    type="text"
                    values={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />{" "}
                  <PasswordInput
                    value={formik.values.password}
                    placeholder={"Passcode"}
                    name={"password"}
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isError={formik.touched.password && formik.errors.password}
                    textError={formik.errors.password}
                  />
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
                </Modal>
                <ModalDelete
                  color={"black"}
                  margin={"12px 0"}
                  title={"Delete"}
                    subTitle={'Pengguna'}
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
