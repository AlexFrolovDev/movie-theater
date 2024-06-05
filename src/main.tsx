import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";
import routes from "./components/pages/routes.tsx";
import { GlobalStyle } from "./styles.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <ChakraProvider>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>
);
