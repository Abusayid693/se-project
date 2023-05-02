import { VStack, Image, Heading, Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "../../contexts/cart";
import { useCheckout, PAYMENTS } from "../../contexts/checkout";
import { useToast } from "@chakra-ui/react";

export const Cart = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { cart, removeItemFromCart, fetchCartItems } = useCart();
  const { setNavigation } = useCheckout();

  const handleRemoveRequest = async (itemId: string) => {
    setLoading(true);

    try {
      await removeItemFromCart(itemId);
      await fetchCartItems();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please refresh or try again later",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

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
      <Heading fontSize={"28px"}>Bills</Heading>
      <VStack
        alignItems={"flex-start"}
        w="100%"
        justifyContent={"space-between"}
      >
        <HStack
          p={"10px"}
          alignItems={"flex-start"}
          w="100%"
          justifyContent={"space-between"}
        >
          <Text fontSize={"19px"} fontWeight={400}>
            Items total
          </Text>
          <Text fontSize={"19px"} fontWeight={400}>
            $ {cart.totalAmount}
          </Text>
        </HStack>

        <HStack
          p={"10px"}
          alignItems={"flex-start"}
          w="100%"
          justifyContent={"space-between"}
        >
          <Text fontSize={"22px"} fontWeight={600}>
            Total discount
          </Text>
          <Text fontSize={"22px"} fontWeight={600}>
            $ 0
          </Text>
        </HStack>

        <HStack
          p={"10px"}
          bg={"rgb(236, 240, 244)"}
          w="100%"
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Text fontSize={"25px"} fontWeight={700}>
            To pay
          </Text>
          <Text fontSize={"25px"} fontWeight={700}>
            $ {cart.totalAmount}
          </Text>
        </HStack>

        <Button
          bg={"#0c4ff7"}
          color={"white"}
          fontSize={"22px"}
          w="100%"
          _hover={{
            opacity: ".8",
          }}
          py={"30px"}
          onClick={() => setNavigation(PAYMENTS)}
          disabled={!(Object.keys(cart.items).length > 0)}
        >
          Purchase
        </Button>
      </VStack>
      <VStack alignItems={"flex-start"} w="100%">
        <Heading fontSize={"28px"} mb="15px" mt="15px">
          Items in your cart
        </Heading>
        {Object.keys(cart.items).map((id: any) => (
          <HStack
            alignItems={"center"}
            border="1px solid #e8e8e8"
            pb="10px"
            w="100%"
          >
            <Image src={"/images/product.webp"} mx="auto" maxH="250px" />
            <VStack w="100%" px={"20px"} alignItems={"flex-end"}>
              <Heading fontSize={"22px"}>{cart.items[id].name}</Heading>
              <Heading fontSize={"20px"} fontWeight={400}>
                {cart.items[id].description}
              </Heading>
              <Heading
                fontSize={"19px"}
                opacity=".6"
                textDecoration="line-through"
              >
                $ {cart.items[id].price}
              </Heading>
              <Heading fontSize={"22px"}>
                $ {cart.items[id].buyingPrice}
              </Heading>
              <Button
                fontSize={"17px"}
                _hover={{
                  opacity: ".8",
                }}
                py={"20px"}
                isLoading={loading}
                onClick={() => handleRemoveRequest(id)}
              >
                Remove
              </Button>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
