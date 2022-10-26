import React from "react";
import { VStack, Heading, Button, Image } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useCart } from "../../contexts/cart";

const data = [
  {
    id: 1,
    name: "Air Jordhan",
    description: "Air jordhan shoes",
    inventory: 10,
    price: 1500,
    discount_percent: 13,
    image_link: null,
  },
  {
    id: 2,
    name: "Nike shoes",
    description: "top quality shoes",
    inventory: 10,
    price: 1500,
    discount_percent: 13,
    image_link: null,
  },
  {
    id: 3,
    name: "adidas originals",
    description: "advance quality adidas shoes",
    inventory: 10,
    price: 1500,
    discount_percent: 13,
    image_link: null,
  },
];

export const Products = () => {
  const { addItemToCart, cart } = useCart();
  return (
    <div>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mx={"auto"}>
        {data.map((item) => (
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
                onClick={() => addItemToCart(item)}
              >
                {cart.items[item.id] ? "Added to cart" : "Add to cart"}
              </Button>
            </VStack>
          </VStack>
        ))}
      </Grid>
    </div>
  );
};
