import React from "react";
import AuthLayout from "../module/LayoutAuth";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
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
  useToast,
} from "@chakra-ui/react";
import { login } from "@/api/auth";
import Cookies from "js-cookie";

const LoginSchema = Yup.object({
  nama: Yup.string().nullable().required("Wajib"),
  password: Yup.string().min(8, "Minimal wajib 8 angka").required("Wajib"),
});

export default function Login() {
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const onSubmit = async (values) => {
    console.log("submit =>", values);
    try {
      const response = await login(values);
      console.log(response);
      let token = response.data.token;
      Cookies.set("chat_token", token);
      Cookies.set("authMyApp", true);
      Cookies.set("auth", true);
      router.push("/chat");
      return toast({
        title: "Success",
        description: response?.data?.msg,
        status: "success",
        variant: "subtle",
        colorScheme: "whatsapp",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log("err =>", error);
      toast({
        title: "Error",
        description: error?.response?.data?.msg,
        status: "error",
        duration: 5000,
        variant: "subtle",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  const initialValues = {
    nama: "",
    password: "",
  };

  return (
    <AuthLayout>
      <section>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
          }) => (
            <div className="flex  h-screen w-full items-center justify-center px-5">
              {console.log("err", errors)}
              <Container>
                <h2 className="mb-10 text-3xl font-bold text-[#38A169] ">
                  Login Form
                </h2>
                <Form onSubmit={handleSubmit}>
                  <section className="space-y-5">
                    <FormControl isInvalid={errors?.nama}>
                      <FormLabel
                        color="#38A169"
                        htmlFor="nama"
                        fontWeight="semibold"
                      >
                        Username
                      </FormLabel>
                      <Input
                        id="nama"
                        type="text"
                        value={values.nama}
                        onChange={handleChange}
                        placeholder="Ketik Nama"
                      />

                      <FormErrorMessage fontWeight="bold">
                        {errors?.nama}
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
                          placeholder="Ketik Username"
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

                    <Button type="submit" width={"100%"} colorScheme="green">
                      Login
                    </Button>
                  </section>
                </Form>
              </Container>
            </div>
          )}
        </Formik>
      </section>
    </AuthLayout>
  );
}
