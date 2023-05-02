import React from "react";
import { Formik, Form } from "formik";
import { Input, VStack, Button, Text, Heading, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../contexts/auth";
import validationSchema from "./validate";
import { useRouter } from "next/router";
import {useCheckout, PAYMENTS} from "../../contexts/checkout"

export const AddPayment = () => {
  const {isAuthenticated, addNewPaymentMethod, fetchUserpayments } = useAuth();
  const { setNavigation } = useCheckout();
  const router = useRouter()

  return (
    <VStack pt="5%" w="800px" mx="auto">
      {!isAuthenticated() ? (
        <>
          <Heading fontSize={"23px"}>Please login first</Heading>
        </>
      ) : (
        <>
          <Heading fontSize={"23px"}>Log in</Heading>
          <Formik
            initialValues={{ card: "", cvv: "", expiry: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await addNewPaymentMethod(
                  values.cvv,
                  values.card,
                  values.expiry
                );
                 await fetchUserpayments()
                 setNavigation(PAYMENTS)
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
                  name="card"
                  onChange={handleChange}
                  value={values.card}
                  borderColor={errors.card && touched.card ? "red" : "#e8e8e8"}
                  borderWidth="2px"
                  h="60px"
                  w="100%"
                  placeholder="card"
                />
                {errors.card && touched.card && (
                  <Text color="red">{errors.card}</Text>
                )}

                <HStack my="10px">
                  <Input
                    name="cvv"
                    onChange={handleChange}
                    value={values.cvv}
                    borderColor={errors.cvv && touched.cvv ? "red" : "#e8e8e8"}
                    borderWidth="2px"
                    h="60px"
                    w="100%"
                    placeholder="cvv"
                  />
                  {errors.cvv && touched.cvv && (
                    <Text color={"red"}>{errors.cvv}</Text>
                  )}

                  <Input
                    type="expiry"
                    name="expiry"
                    onChange={handleChange}
                    value={values.expiry}
                    borderColor={
                      errors.expiry && touched.expiry ? "red" : "#e8e8e8"
                    }
                    borderWidth="2px"
                    h="60px"
                    w="100%"
                    placeholder="expiry"
                  />
                  {errors.expiry && touched.expiry && (
                    <Text color={"red"}>{errors.expiry}</Text>
                  )}
                </HStack>

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
