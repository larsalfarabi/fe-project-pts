import { useFormik } from "formik";
import Input from "../../komponen/input";
import Modal from "../../komponen/Modal";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../../komponen/ModalDelete";
import Textarea from "../../komponen/Textarea";
export default function Outlet() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nama: "",
      alamat: "",
      telephone: "",
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
        <p>Outlet Data</p>
        <Modal title={"Create Outlet"} color={"#B8C0B8"}>
          <Input
            placeholder="Nama"
            name={"nama"}
            values={formik.values.nama}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Textarea
            placeholder="Alamat"
            name={"alamat"}
            values={formik.values.alamat}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            placeholder="Telephone"
            name={"telephone"}
            values={formik.values.telephone}
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
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300">
                1
              </td>
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300">
                Malcolm Lockyer
              </td>
              <td className="font-medium text-[15px] border-b border-dashed border-gray-300">
                1961
              </td>

              <td className="grid grid-cols-2 w-[200px] gap-2 border-b border-dashed border-gray-300">
                <Modal title={"Edit"} color={"#E0D5C4"} margin={"12px 0"}>
                  <Input
                    placeholder="Nama"
                    name={"nama"}
                    values={formik.values.nama}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Textarea
                    placeholder="Alamat"
                    name={"alamat"}
                    values={formik.values.alamat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Input
                    placeholder="Telephone"
                    name={"telephone"}
                    values={formik.values.telephone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Modal>
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
