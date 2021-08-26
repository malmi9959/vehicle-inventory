import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Windmill } from "@windmill/react-ui";
import { theme } from "./theme/theme";
import { SidebarProvider } from "./context/SidebarContext";

ReactDOM.render(
  <React.StrictMode>
    <SidebarProvider>
      <Windmill theme={theme}>
        <App />
      </Windmill>
    </SidebarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
