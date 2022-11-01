import React, { useState, useEffect, useMemo } from "react";
import { VStack, Heading, Button, Image } from "@chakra-ui/react";
import { Grid, Box } from "@chakra-ui/react";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {SingleProduct} from "./single"

export const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      setLoading(true)
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
      setLoading(false)
    })();
  }, []);



  const specialAppreances = useMemo(() => {
    return products.filter((item: any) => item.id === 17 || item.id === 18);
  }, [products]);

  return (
    <div>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <Heading my="10px">Special Appreances</Heading>
          <Grid mb="20px" templateColumns="repeat(4, 1fr)" gap={6} mx={"auto"}>
            {specialAppreances?.map((item: any) => (
              <SingleProduct item={item}/>
            ))}
          </Grid>
          <Heading my="10px">In Stock</Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} mx={"auto"}>
            {products?.map((item: any) => (
              <SingleProduct item={item}/>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
