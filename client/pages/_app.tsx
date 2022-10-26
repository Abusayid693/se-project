import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Navigation } from "../containers/navigation";
import { AuthProvider } from "../contexts/auth";
import {CartProvider} from "../contexts/cart"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <CartProvider>
      <Navigation/>
      <Component {...pageProps} />
      </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
