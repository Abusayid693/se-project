import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext<any>(null);

export function useCheckout() {
  return useContext(CheckoutContext);
}

export const CheckoutProvider = ()=>{
    
}