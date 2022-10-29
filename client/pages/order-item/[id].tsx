import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Button, Heading, VStack, Text, HStack, Image } from "@chakra-ui/react";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data } = await axios.post(
          "http://localhost:4000/product/getOrderedItemDetails",
          { orderItemId: id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setOrderDetails(data?.data?.[0]);
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Please refresh or try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        console.log("error :", error);
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <VStack
      pt="100px"
      maxW={"1000px"}
      mx="auto"
      alignItems={"flex-start"}
      textAlign="left"
      border="1px solid #e8e8e8"
    >
      {loading ? (
        <>Loading....</>
      ) : (
        <>
          {orderDetails ? (
            <VStack
              w="100%"
              px="20px"
              alignItems={"flex-start"}
              textAlign="left"
            >
              <HStack
                alignItems={"center"}
                border="1px solid #e8e8e8"
                pb="10px"
                w="100%"
                position={"relative"}
              >
                <Image src={"/images/product.webp"} mx="auto" maxH="250px" />
                <VStack w="100%" px={"20px"} alignItems={"flex-end"}>
                  <Heading fontSize={"22px"}>{orderDetails.name}</Heading>
                  <Heading fontSize={"20px"} fontWeight={400}>
                    {orderDetails.description}
                  </Heading>
                </VStack>
              </HStack>

              <VStack py="20px" alignItems={"flex-start"}>
                <Heading fontSize={"23px"}>Item Price</Heading>
                <Text fontSize={"20px"} fontWeight={500}>
                  $ {orderDetails?.price}
                </Text>
              </VStack>

              <Heading fontSize={"23px"}>Shipping Address</Heading>
              <HStack w="100%" justifyContent={"space-between"}>
                <Text fontSize={"20px"} fontWeight={500}>
                  mobile_number:
                </Text>
                <Text fontSize={"20px"} fontWeight={500}>
                  {orderDetails?.mobile_number}
                </Text>
              </HStack>

              <HStack w="100%" justifyContent={"space-between"}>
                <Text fontSize={"20px"} fontWeight={500}>
                  pin_code:
                </Text>
                <Text fontSize={"20px"} fontWeight={500}>
                  {" "}
                  {orderDetails?.pin_code}
                </Text>
              </HStack>

              <HStack w="100%" justifyContent={"space-between"}>
                <Text fontSize={"20px"} fontWeight={500}>
                  city:
                </Text>
                <Text fontSize={"20px"} fontWeight={500}>
                  {orderDetails?.city}
                </Text>
              </HStack>

              <HStack w="100%" justifyContent={"space-between"}>
                <Text fontSize={"20px"} fontWeight={500}>
                  state:
                </Text>
                <Text fontSize={"20px"} fontWeight={500}>
                  {orderDetails?.state}
                </Text>
              </HStack>

              <HStack w="100%" justifyContent={"space-between"}>
                <Text fontSize={"20px"} fontWeight={500}>
                  landmark:
                </Text>
                <Text fontSize={"20px"} fontWeight={500}>
                  {orderDetails?.landmark}
                </Text>
              </HStack>
            </VStack>
          ) : (
            <Heading fontSize={"23px"}>Invalid order id</Heading>
          )}
        </>
      )}
    </VStack>
  );
};

export default Index