import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalContext } from "./../data/AppContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContext>
      <ChakraProvider>
        <Component {...pageProps} />;
      </ChakraProvider>
    </GlobalContext>
  );
}

export default MyApp;
