import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Windmill } from "@windmill/react-ui";
import { theme } from "./theme/theme";
import { SidebarProvider } from "./context/SidebarContext";
import client from "./apollo/client";
import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <SidebarProvider>
        <Windmill theme={theme}>
          <App />
        </Windmill>
      </SidebarProvider>
    </ApolloProvider>
  </>,
  document.getElementById("root")
);
