import { Formik, Form } from "formik";
import { Input, VStack, Button, Text, Heading, HStack } from "@chakra-ui/react";
import { useAuth } from "../../contexts/auth";
import { useCheckout, ADDRESSES, CART } from "../../contexts/checkout";
import validationSchema from "./validate";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const AddAddress = () => {
  const { fetchUserSavedAddresses } = useAuth();
  const { setNavigation } = useCheckout();
  const toast = useToast()

  return (
    <VStack w="100%">
      <Button onClick={() => setNavigation(ADDRESSES)}>back</Button>
      <Formik
        initialValues={{
          mobile_number: "",
          pin_code: "",
          city: "",
          state: "",
          landmark: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await axios.post(
              "http://localhost:4000/auth/addNewAddress",
              {
                mobile_number: values.mobile_number,
                pin_code : values.pin_code,
                city : values.city,
                state: values.state,
                landmark: values.landmark,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );

            await fetchUserSavedAddresses()
            setNavigation(ADDRESSES)
          } catch (error) {
            toast({
              title: 'Something went wrong',
              description: "Please refresh or try again later",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
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
              name="mobile_number"
              onChange={handleChange}
              value={values.mobile_number}
              borderColor={
                errors.mobile_number && touched.mobile_number
                  ? "red"
                  : "#e8e8e8"
              }
              borderWidth="2px"
              h="60px"
              w="100%"
              placeholder="mobile_number"
            />
            {errors.mobile_number && touched.mobile_number && (
              <Text color="red">{errors.mobile_number}</Text>
            )}
            <Input
              name="pin_code"
              onChange={handleChange}
              value={values.pin_code}
              borderColor={
                errors.pin_code && touched.pin_code ? "red" : "#e8e8e8"
              }
              borderWidth="2px"
              h="60px"
              w="100%"
              placeholder="pin_code"
            />
            {errors.pin_code && touched.pin_code && (
              <Text color={"red"}>{errors.pin_code}</Text>
            )}

            <Input
              name="city"
              onChange={handleChange}
              value={values.city}
              borderColor={errors.city && touched.city ? "red" : "#e8e8e8"}
              borderWidth="2px"
              h="60px"
              w="100%"
              placeholder="city"
            />
            {errors.city && touched.city && (
              <Text color={"red"}>{errors.city}</Text>
            )}

            <Input
              name="state"
              onChange={handleChange}
              value={values.state}
              borderColor={errors.state && touched.state ? "red" : "#e8e8e8"}
              borderWidth="2px"
              h="60px"
              w="100%"
              placeholder="state"
            />
            {errors.state && touched.state && (
              <Text color={"red"}>{errors.state}</Text>
            )}

            <Input
              name="landmark"
              onChange={handleChange}
              value={values.landmark}
              borderColor={
                errors.landmark && touched.landmark ? "red" : "#e8e8e8"
              }
              borderWidth="2px"
              h="60px"
              w="100%"
              placeholder="landmark"
            />
            {errors.landmark && touched.landmark && (
              <Text color={"red"}>{errors.landmark}</Text>
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
    </VStack>
  );
};
