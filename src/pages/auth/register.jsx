import React from "react";
import Button from "../../komponen/button";
import Input from "../../komponen/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import "../../../src/styles/styles.css";
import { useFormik } from "formik";
import Select from "../../komponen/select";
import InputPassword from "../../komponen/InputPassword";

const Register = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  // const [messageError, setMessageError] = React.useState("");
  // const [errorName, setErrorName] = React.useState("");
  // const [errorEmail, setErrorEmail] = React.useState("");
  // const [errorPassword, setErrorPassword] = React.useState("");
  // const [errorConfirmPassword, setErrorConfirmPassword] = React.useState("");
  // const [payload, setPayload] = React.useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   password_confirmation: "",
  // });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
      return navigate("/outlet/createOutlet", { replace: true });
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[26rem] px-[2rem] py-[2.1rem] rounded-[1.5rem]">
        <div className="text-center px-9">
          {" "}
          <h1 className="font-semibold text-2xl">Sign Up</h1>
          <p className="my-4 text-[15px] font-medium">
            Hey, Enter your details to get sing In to your account
          </p>
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Input
            value={formik.values.email}
            placeholder={"Enter Email"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name={"email"}
            isError={formik.touched.email && formik.errors.email}
            textError={formik.errors.email}
          />
          <InputPassword
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
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            isError={formik.errors.role && formik.touched.role}
            textError={formik.errors.role}
          >
            <option value="" className="text-gray-400">
              Select an option
            </option>
            <option value="admin" className="text-black">
              Admin
            </option>
            <option value="kasir">Kasir</option>
            <option value="owner">Owner</option>
          </Select>
          <div className="grid grid-cols-1 gap-5 mt-5">
            <Button title={isLoading ? "Proses" : "Sign up"} />
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

export default Register;
