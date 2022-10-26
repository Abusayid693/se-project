import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext<any>(null);

export const CART = 0;
export const ADDRESSES = 1;
export const ADD_NEW_ADDDRESS = 2;
export const CONFIRM_ORDER = 3;
export const ORDER_SUCCESSFULL = 4;

export function useCheckout() {
  return useContext(CheckoutContext);
}

const initialState = {
    navigation: 0,
    addressId: null,
  }

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialState);

  const setNavigation = (index:any) => {
    setState((prev) => ({ ...prev, navigation: index }));
  };

  const setAddressId = (id:any) =>{
    setState((prev) => ({ ...prev, addressId: id }));
  }

  const reset = () =>{
    setState(initialState)
  }

  const values = {
    ...state,
    setNavigation,
    setAddressId,
    reset
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
