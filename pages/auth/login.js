import React, { useEffect } from "react";
import AuthLayout from "../../module/LayoutAuth";
import { Form, Formik, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  Select,
} from "@chakra-ui/react";

const LoginSchema = Yup.object({
  email: Yup.string().nullable().required("Wajib").email("Wajin Email"),
  password: Yup.string().min(8, "Minimal wajib 8 angka").required("Wajib"),
  level: Yup.string().required("Wajib Pilih"),
});

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = async (values) => {
    console.log(values);
  };

  const initialValues = {
    email: "",
    password: "",
    level: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    enableReinitialize: true,
  });

  let {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
  } = formik;
  return (
    <AuthLayout>
      <section>
        <FormikProvider value={values}>
          <div className="w-full   px-5 h-screen flex items-center justify-center">
            {console.log("err", errors)}
            <Container>
              <h2 className="text-3xl font-bold mb-10 text-[#38A169] ">
                Login Form
              </h2>
              <Form onSubmit={handleSubmit}>
                <section className="space-y-5">
                  <FormControl isInvalid={errors?.email}>
                    <FormLabel
                      color="#38A169"
                      htmlFor="email"
                      fontWeight="semibold"
                    >
                      email
                    </FormLabel>
                    <Input
                      id="email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Ketik email"
                    />

                    <FormErrorMessage fontWeight="bold">
                      {errors?.email}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.password}>
                    <FormLabel
                      color="#38A169"
                      htmlFor="password"
                      fontWeight="semibold"
                    >
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        type={show ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Ketik email"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <FormErrorMessage fontWeight="bold">
                      {errors?.password}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.level}>
                    <FormLabel
                      color="#38A169"
                      htmlFor="level"
                      fontWeight="semibold"
                    >
                      Masuk Sebagai
                    </FormLabel>
                    <InputGroup>
                      <Select
                        name="level"
                        onChange={handleChange}
                        value={values.level}
                        placeholder="Pilih"
                      >
                        <option value="1">Administrator</option>
                        <option value="2">Petugas</option>
                      </Select>
                    </InputGroup>

                    <FormErrorMessage fontWeight="bold">
                      {errors?.level}
                    </FormErrorMessage>
                  </FormControl>
                  <Button type="submit" width={"100%"} colorScheme="green">
                    Login
                  </Button>
                </section>
              </Form>
              <section className="mt-5 flex items-center justify-center ">
                <Button
                  onClick={() => signIn("google")}
                  type="button"
                  width={"50%"}
                >
                  Google Sign In
                </Button>
              </section>
            </Container>
          </div>
        </FormikProvider>
      </section>
    </AuthLayout>
  );
}
