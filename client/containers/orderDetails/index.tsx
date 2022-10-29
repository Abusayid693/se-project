import { useRouter } from "next/router";
import { Button, Heading, VStack, Text, HStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data } = await axios.post(
          "http://localhost:4000/product/getOrderDetails",
          { orderId: id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setOrderDetails(data?.data?.order?.[0]);
        setItems(data?.data?.items);
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
    >
      {loading ? (
        <>Loading....</>
      ) : (
        <>
          {orderDetails && items ? (
            <VStack
              w="100%"
              px="20px"
              alignItems={"flex-start"}
              textAlign="left"
            >
              <VStack w="100%" border="1px solid #e8e8e8" py="10px">
                <Image src="/icons/order-placed.svg" />
                <Heading fontSize={"22px"}>Your order is complete</Heading>
                <Text fontSize={"16px"}>
                  your order id is ${id}, please vrify yoyr order details below
                </Text>
              </VStack>

              <VStack py="20px" alignItems={"flex-start"}>
                <Heading fontSize={"23px"}>Total Order Price</Heading>
                <Text fontSize={"20px"} fontWeight={500}>
                  $ {orderDetails?.total_amount}
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

              <VStack py="20px" w="100%" alignItems={"flex-start"}>
                <Heading fontSize={"23px"}>Items</Heading>
                {items?.map((item: any) => (
                  <HStack
                    alignItems={"center"}
                    border="1px solid #e8e8e8"
                    pb="10px"
                    w="100%"
                    position={"relative"}
                  >
                    <Image
                      src={"/images/product.webp"}
                      mx="auto"
                      maxH="250px"
                    />
                    <VStack w="100%" px={"20px"} alignItems={"flex-end"}>
                      <Heading fontSize={"22px"}>{item.name}</Heading>
                      <Heading fontSize={"20px"} fontWeight={400}>
                        {item.description}
                      </Heading>
                      <Heading fontSize={"22px"}>$ {item.price}</Heading>
                      <Link href={`/order/${item.orderId}`}></Link>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          ) : (
            <Heading fontSize={"23px"}>Invalid order id</Heading>
          )}
        </>
      )}
    </VStack>
  );
};
