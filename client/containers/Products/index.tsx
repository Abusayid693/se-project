import React, { useState, useEffect } from "react";
import { VStack, Heading, Button, Image } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export const Products = () => {
  const [loading, setLoading] = useState(false);
  const { addItemToCart, cart, fetchCartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/product/all");

        setProducts(data?.data);
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Please refresh or try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    })();
  }, []);

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
    <div>
      {loading ? (
        <>Loading...</>
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap={6} mx={"auto"}>
          {products?.map((item: any) => (
            <VStack
              alignItems={"flex-start"}
              border="1px solid #e8e8e8"
              pb="10px"
            >
              <Image src={"/images/product.webp"} mx="auto" />
              <VStack w="100%" px={"20px"} alignItems={"flex-start"}>
                <Heading fontSize={"22px"}>{item.name}</Heading>
                <Heading fontSize={"20px"} fontWeight={400}>
                  {item.description}
                </Heading>
                <Heading fontSize={"22px"}>$ {item.price}</Heading>
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
          ))}
        </Grid>
      )}
    </div>
  );
};
