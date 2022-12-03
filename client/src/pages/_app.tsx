// import "../styles/globals.css";
import { Fragment } from "react";
import type { AppProps } from "next/app";
import { Header } from "../compoents/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { MetaMaskInpageProvider } from "@metamask/providers";

import { AppContextProvider } from "../context/AppContext";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Fragment>
        <Header />
        <Component {...pageProps} />
      </Fragment>
    </AppContextProvider>
  );
}
