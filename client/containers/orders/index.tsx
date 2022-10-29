import { VStack, Image, Heading, Button, HStack, Text } from "@chakra-ui/react";
import { useCart } from "../../contexts/cart";
import { useCheckout, ADDRESSES } from "../../contexts/checkout";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

export const Orders = () => {
  const { orders, fetchUserSavedOrders } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (orders === null) {
        setLoading(true);
        await fetchUserSavedOrders();
        setLoading(false);
      }
    })();
  }, []);

  return (
    <VStack
      py="40px"
      w="100%"
      px="40px"
      alignItems={"flex-start"}
      mx="auto"
      border="1px solid #e8e8e8"
      gap="10px"
    >
      <VStack alignItems={"flex-start"} w="100%">
        <Heading fontSize={"28px"} mb="15px" mt="15px">
          Ypur Orders
        </Heading>
        {loading ? (
          <Heading>Loading</Heading>
        ) : (
          <>
            {orders?.map((item: any) => (
              
              <HStack
                alignItems={"center"}
                border="1px solid #e8e8e8"
                pb="10px"
                w="100%"
                position={"relative"}
                
              >
                <Image src={"/images/product.webp"} mx="auto" maxH="250px" />
                <VStack w="100%" px={"20px"} alignItems={"flex-end"}>
                  <Heading fontSize={"22px"}>{item.name}</Heading>
                  <Heading fontSize={"20px"} fontWeight={400}>
                    {item.description}
                  </Heading>
                  <Heading fontSize={"22px"}>$ {item.price}</Heading>
                  <Link href={`/order-item/${item.id}`}>
                  <Button>details</Button></Link>
                 
                  <Link href={`/order/${item.orderId}`}>
                  <Text position={"absolute"} top={'10px'} right="10px" >Order id: {item.orderId}</Text>
                  </Link>
                </VStack>
              </HStack>
            ))}
          </>
        )}

        {orders?.length === 0 && <Heading>No orders</Heading>}
      </VStack>
    </VStack>
  );
};
