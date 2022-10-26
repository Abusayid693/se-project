import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext<any>(null);

export function useCheckout() {
  return useContext(CheckoutContext);
}

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState({
    navigation: 0,
    addressId: null,
  });

  const proceedNavigation = () => {
    setState((prev) => ({ ...prev, navigation: prev.navigation + 1 }));
  };

  const backNavigation = () => {
    setState((prev) => ({ ...prev, navigation: prev.navigation - 1 }));
  };

  const values = {
    ...state,
    proceedNavigation,
    backNavigation,
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
