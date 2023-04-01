import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import Register from "./pages/Register";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }}>
      {/* <App /> */}
      <Register />
    </MantineProvider>
  </React.StrictMode>
);
