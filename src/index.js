import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Windmill } from "@windmill/react-ui";
import { theme } from "./theme/theme";
import { SidebarProvider } from "./context/SidebarContext";
import client from "./apollo/client";
import { ApolloProvider } from "@apollo/client";
import ThemedSuspense from "./components/ThemedSuspense";

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <SidebarProvider>
        <Suspense fallback={<ThemedSuspense />}>
          <Windmill theme={theme}>
            <App />
          </Windmill>
        </Suspense>
      </SidebarProvider>
    </ApolloProvider>
  </>,
  document.getElementById("root")
);
