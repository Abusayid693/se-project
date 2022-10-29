import React from "react";
import { Formik, Form } from "formik";
import { Input, VStack, Button, Text, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../contexts/auth";
import validationSchema from "./validate";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Signup = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const toast = useToast();
  const router = useRouter()

  return (
    <VStack pt="5%" w="800px" mx="auto">
      {isAuthenticated() ? (
        <>
          <Heading fontSize={"23px"}>
            You are logged in as {currentUser.username}
          </Heading>
          <Heading fontSize={"23px"}>first log out to again sign up</Heading>
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
          <Heading fontSize={"23px"}>Sign up</Heading>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              username: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors }) => {
              try {
                await axios.post("http://localhost:4000/auth/create", {
                  email: values.email,
                  password: values.password,
                  username: values.username,
                });

                toast({
                  title: "User registered.",
                  description :"Plase login to continue shopping",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.replace("/login")
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
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                  borderColor={
                    errors.username && touched.username ? "red" : "#e8e8e8"
                  }
                  borderWidth="2px"
                  h="60px"
                  w="100%"
                  placeholder="username"
                />
                {errors.username && touched.username && (
                  <Text color="red">{errors.username}</Text>
                )}

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

                <Input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  borderColor={
                    errors.confirmPassword && touched.confirmPassword
                      ? "red"
                      : "#e8e8e8"
                  }
                  borderWidth="2px"
                  h="60px"
                  w="100%"
                  placeholder="confirm password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text color={"red"}>{errors.confirmPassword}</Text>
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
