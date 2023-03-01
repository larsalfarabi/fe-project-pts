import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../komponen/button";
import { Input } from "../../komponen/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../../komponen/InputPassword";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { authLogin } from "../redux/action/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username  is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await dispatch(authLogin(values));
        console.log(response);
        if (response?.status === "berhasil") {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          return navigate("/home/dashboard", { replace: true });
        }
      } catch (error) {
        console.log(error);
        setIsLoading(true);
        if (error?.response?.status === 422) {
          toast.error(error?.response?.data?.msg, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-[#F5F2EA]">
      {" "}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="bg-white w-[26rem] px-[2rem] py-[2.1rem] rounded-[1.5rem]">
        <div className="text-center px-9">
          {" "}
          <h1 className="font-semibold text-2xl">Sign In</h1>
          <p className="my-4 text-[15px] font-medium">
            Hey, Enter your details to get sing In to your account
          </p>
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Input
            value={formik.values.username}
            placeholder={"Enter Username"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name={"username"}
            isError={formik.touched.username && formik.errors.username}
            textError={formik.errors.username}
          />
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
          {/* <Select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            isError={formik.errors.role && formik.touched.role}
            textError={formik.errors.role}
          >
            <option value="" className="text-gray-400">Select an option</option>
            <option value="admin" >Admin</option>
            <option value="kasir">Kasir</option>
            <option value="owner">Owner</option>
          </Select> */}
          <div className="grid grid-cols-1 gap-5 mt-8">
            <Button title={isLoading ? "Proses" : "Sign in"} />
          </div>
        </form>
        {/* <p className="text-sm text-center font-medium my-5">
          - or sign in with -
        </p>
        <div className="grid grid-cols-3 gap-1 my-5">
          <Sosmed title={"Google"} />
          <Sosmed title={"Apple ID"} />
          <Sosmed title={"Facebook"} />
        </div> */}
        <p className="text-[13px] text-center mt-5">
          Don't have an account?{" "}
          <span
            className="font-semibold text-[13px] cursor-pointer"
            onClick={() => {
              return navigate("/register", { replace: true });
            }}
          >
            Request Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
