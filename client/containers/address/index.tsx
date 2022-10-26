import { Input, VStack, Button, Text, Heading, HStack } from "@chakra-ui/react";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import {
  useCheckout,
  ADD_NEW_ADDDRESS,
  CART,
  ORDER_SUCCESSFULL,
} from "../../contexts/checkout";
import { useCart } from "../../contexts/cart";
import axios from "axios";
import { useRouter } from "next/router";

export const Address = () => {
  const router = useRouter();
  const { fetchUserSavedAddresses, addresses, fetchUserSavedOrders } =
    useAuth();
  const { setAddressId, addressId, setNavigation, reset } = useCheckout();
  const [loading, setLoading] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      if (addresses === null) await fetchUserSavedAddresses();
    })();
  }, []);

  const placeOrder = async () => {
    const body = {
      totalAmount: cart.totalAmount,
      addressId,
      items: Object.values(cart.items),
    };

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/product/order",
        body,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      await fetchUserSavedOrders();
      reset();
      router.replace(`/order/${data.data.orderId}`);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <VStack w="100%">
      <Button onClick={() => setNavigation(CART)}>back</Button>
      <Heading>Saved Address</Heading>
      {addresses?.map((address: any) => (
        <VStack
          p="40px"
          w="100%"
          justifyContent={"space-between"}
          border={
            addressId === address.id ? "1px solid #0c4ff7" : "1px solid #e8e8e8"
          }
          _hover={{
            border: "1px solid #0c4ff7",
          }}
          onClick={() => setAddressId(address.id)}
        >
          <HStack w="100%" justifyContent={"space-between"}>
            <Text fontSize={"20px"} fontWeight={500}>
              mobile_number:
            </Text>
            <Text fontSize={"20px"} fontWeight={500}>
              {address.mobile_number}
            </Text>
          </HStack>

          <HStack w="100%" justifyContent={"space-between"}>
            <Text fontSize={"20px"} fontWeight={500}>
              pin_code:
            </Text>
            <Text fontSize={"20px"} fontWeight={500}>
              {" "}
              {address.pin_code}
            </Text>
          </HStack>

          <HStack w="100%" justifyContent={"space-between"}>
            <Text fontSize={"20px"} fontWeight={500}>
              city:
            </Text>
            <Text fontSize={"20px"} fontWeight={500}>
              {address.city}
            </Text>
          </HStack>

          <HStack w="100%" justifyContent={"space-between"}>
            <Text fontSize={"20px"} fontWeight={500}>
              state:
            </Text>
            <Text fontSize={"20px"} fontWeight={500}>
              {address.state}
            </Text>
          </HStack>

          <HStack w="100%" justifyContent={"space-between"}>
            <Text fontSize={"20px"} fontWeight={500}>
              landmark:
            </Text>
            <Text fontSize={"20px"} fontWeight={500}>
              {address.landmark}
            </Text>
          </HStack>
        </VStack>
      ))}

      {addressId && (
        <Button
          isLoading={loading}
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
          onClick={placeOrder}
        >
          Place order
        </Button>
      )}

      <Button
        type="submit"
        w="100%"
        fontSize={"22px"}
        _hover={{
          opacity: ".8",
        }}
        py={"30px"}
        mt={"80px"}
        onClick={() => setNavigation(ADD_NEW_ADDDRESS)}
      >
        Add new address
      </Button>
    </VStack>
  );
};
