import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Navigation } from "../containers/navigation";
import { AuthProvider } from "../contexts/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
      <Navigation/>
      <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
