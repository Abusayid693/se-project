import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Navigation } from "../containers/navigation";
import { AuthProvider } from "../contexts/auth";
import { CartProvider } from "../contexts/cart";
import { CheckoutProvider } from "../contexts/checkout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <Navigation />
            <Component {...pageProps} />
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
