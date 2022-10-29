import React from "react";
import { Formik, Form } from "formik";
import { Input, VStack, Button, Text, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../contexts/auth";
import validationSchema from "./validate"

export const Login = () => {
  const { login, isAuthenticated, currentUser, logout } = useAuth();
  return (
    <VStack pt="5%" w="800px" mx="auto">
      {isAuthenticated() ? (
        <>
          <Heading fontSize={"23px"}>
            You are logged in as {currentUser.username}
          </Heading>
          <Heading fontSize={"23px"}>first log out to again login</Heading>
          <Button
            bg="#0c4ff7"
            color={"white"}
            w="100%"
            fontSize={"22px"}
            _hover={{
              opacity: ".8",
            }}
            py={"30px"}
            mt={"80px"}
            onClick={logout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Heading fontSize={"23px"}>Log in</Heading>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const { data } = await axios.post(
                  "http://localhost:4000/auth/login",
                  {
                    email: values.email,
                    password: values.password,
                  }
                );

                if (!data) {
                  setErrors({ email: "Invalid crediantials" });
                }
                login(data.data);
              } catch (error: any) {
                let errors: Record<string, string> = {};

                error.response.data.errors.forEach(
                  (error: any) =>
                    (errors[error.field as string] = error.message)
                );

                setErrors(errors);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Input
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  borderColor={
                    errors.email && touched.email ? "red" : "#e8e8e8"
                  }
                  borderWidth="2px"
                  h="60px"
                  w="100%"
                  placeholder="email"
                />
                {errors.email && touched.email && (
                  <Text color="red">{errors.email}</Text>
                )}
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  borderColor={
                    errors.password && touched.password ? "red" : "#e8e8e8"
                  }
                  borderWidth="2px"
                  h="60px"
                  w="100%"
                  placeholder="password"
                />
                {errors.password && touched.password && (
                  <Text color={"red"}>{errors.password}</Text>
                )}

                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  bg="#0c4ff7"
                  color={"white"}
                  w="100%"
                  fontSize={"22px"}
                  _hover={{
                    opacity: ".8",
                  }}
                  py={"30px"}
                  mt={"80px"}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </VStack>
  );
};
