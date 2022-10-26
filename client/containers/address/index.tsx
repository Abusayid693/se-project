import { Formik, Form } from "formik";
import { Input, VStack, Button, Text, Heading } from "@chakra-ui/react";

export const Address = () => {
  return (
    <Formik
      initialValues={{
        mobile_number: "",
        pin_code: "",
        city: "",
        state: "",
        landmark: "",
      }}
      validate={(values) => {
        const errors = {} as any;
        if (!values.mobile_number) {
          errors.email = "Required";
        } else if (!values.pin_code) {
          errors.pin_code = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {}}
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
              errors.mobile_number && touched.mobile_number ? "red" : "#e8e8e8"
            }
            borderWidth="2px"
            h="60px"
            w="100%"
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
  );
};
