import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import { useAuth, AuthProvider } from "./provider/AuthProvider.jsx";
import RoutesPath from "./routes/Routes";
import { inject } from "@vercel/analytics";
inject();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <RoutesPath/>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
