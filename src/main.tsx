import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";

const mantineTheme: MantineThemeOverride = {
  colorScheme: "dark",
  components: {
    Button: {
      defaultProps: {
        uppercase: true,
      },
      variants: {
        subtle: () => ({
          root: {
            padding: 0,
            border: 0,
            ":hover": {
              backgroundColor: "transparent",
            },
            ":active": {
              transform: "none",
            },
          },
        }),
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={mantineTheme} withNormalizeCSS withGlobalStyles>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
