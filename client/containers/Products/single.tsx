import React, { useState, useEffect, useMemo } from "react";
import { VStack, Heading, Button, Image } from "@chakra-ui/react";
import { Grid, Box } from "@chakra-ui/react";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";
import { useToast } from "@chakra-ui/react";

export const SingleProduct: React.FC<{
  item: any;
}> = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const { addItemToCart, cart, fetchCartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const handleCartRequest = async (item: any) => {
    if (!isAuthenticated()) {
      toast({
        title: "Please login to add item to cart",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    setLoading(true);

    try {
      await addItemToCart(item.id);
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
      alignItems={"flex-start"}
      border="1px solid #e8e8e8"
      pb="10px"
      position={"relative"}
    >
      <Box
        bg="rgb(236, 172, 53);"
        borderRadius={"50%"}
        p="10px"
        position={"absolute"}
        top="5%"
        left="5%"
      >
        {item.discount_percent} %
      </Box>

      <Image
        src={item.image_link ?? "/images/product.webp"}
        mx="auto"
        h={"350px"}
      />
      <VStack w="100%" px={"20px"} alignItems={"flex-start"}>
        <Heading fontSize={"22px"}>{item.name}</Heading>
        <Heading fontSize={"20px"} fontWeight={400}>
          {item.description}
        </Heading>
        <Heading fontSize={"19px"} opacity=".6" textDecoration="line-through">$ {item.price}</Heading>
        <Heading fontSize={"22px"} >$ {item.buyingPrice}</Heading>
        <Button
          bg={cart.items[item.id] ? "#e8e8e8" : "#0c4ff7"}
          color={cart.items[item.id] ? "black" : "white"}
          w="100%"
          fontSize={"22px"}
          _hover={{
            opacity: ".8",
          }}
          py={"30px"}
          onClick={() => handleCartRequest(item)}
          disabled={cart.items[item.id]}
          isLoading={loading}
        >
          {cart.items[item.id] ? "Added to cart" : "Add to cart"}
        </Button>
      </VStack>
    </VStack>
  );
};
