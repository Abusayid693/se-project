import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth";
import { useToast } from "@chakra-ui/react";

const CartContext = createContext<any>(null);

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const toast = useToast()
  const [cart, setCart] = useState({
    totalAmount: 0,
    totalItem: 0,
    items: {},
  });

  useEffect(() => {
    (async () => {
      if (isAuthenticated()){
        try {
           await fetchCartItems();
        } catch (error) {
          toast({
            title: 'Something went wrong',
            description: "Please refresh or try again later",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      }
    })();
  }, [isAuthenticated()]);

  const addItemToCart = async (itemId: string) => {
    try {
      await axios.post(
        "http://localhost:4000/product/addProductToCart",
        { itemId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {throw error}
  };

  const fetchCartItems = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/product/getProductsFromCart",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const filteredData: Record<string, any> = {};
      const totalItem =  data.data.length;
      let totalAmount = 0;

      data.data.forEach((item: any) => (filteredData[item.id] = item, totalAmount+=item.buyingPrice));

      setCart((prev) => ({
        ...prev,
        ["items"]: filteredData,
        totalItem,
        totalAmount
      }));
    } catch (error) {throw error}
  };


  const removeItemFromCart = async (itemId: string)=>{
    try {
      await axios.post(
        "http://localhost:4000/product/removeProductFromCart",
        { itemId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      throw error
    }
  }

  const values = {
    cart,
    addItemToCart,
    fetchCartItems,
    removeItemFromCart
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
