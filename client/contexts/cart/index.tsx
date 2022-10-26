import React, { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState({
    totalAmount: 0,
    items: {},
  });

  const addItemToCart = (item: Record<string, string>) => {
    // @ts-ignore
    setCart((prev) => ({
      ...prev,
      items: { ...prev.items, [item.id]: item },
      totalAmount: prev.totalAmount + Number(item?.price),
    }));
  };

  const values = {
    cart,
    addItemToCart,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
