import React from "react";
import AuthLayout from "../module/LayoutAuth";
import { Form, Formik } from "formik";
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
  username: Yup.string().nullable().required("Wajib"),
  password: Yup.string().min(8, "Minimal wajib 8 angka").required("Wajib"),
  level: Yup.string().required("Wajib Pilih"),
});

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = () => {
    console.log("submit");
  };

  const initialValues = {
    username: "",
    password: "",
    level: "",
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
            <div className="w-full  px-5 h-screen flex items-center justify-center">
              {console.log("err", errors)}
              <Container>
                <h2 className="text-3xl font-bold mb-10 text-[#38A169] ">Login Form</h2>
                <Form onSubmit={handleSubmit}>
                  <section className="space-y-5">
                    <FormControl isInvalid={errors?.username}>
                      <FormLabel  color='#38A169' htmlFor="username" fontWeight="semibold">Username</FormLabel>
                      <Input
                        id="username"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        placeholder="Ketik Username"
                      />

                      <FormErrorMessage fontWeight="bold">
                        {errors?.username}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.password}>
                      <FormLabel color='#38A169' htmlFor="password" fontWeight="semibold">Password</FormLabel>
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
                    <FormControl isInvalid={errors?.level}>
                      <FormLabel color='#38A169' htmlFor="level" fontWeight="semibold">Masuk Sebagai</FormLabel>
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
              </Container>
            </div>
          )}
        </Formik>
      </section>
    </AuthLayout>
  );
}
