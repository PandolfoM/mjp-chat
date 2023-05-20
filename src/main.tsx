import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { AuthContextProvider } from "./auth/context";
import { PageContextProvider } from "./context/PageContext";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

const mantineTheme: MantineThemeOverride = {
  colorScheme: "dark",
  components: {
    ActionIcon: {
      styles: {
        root: {
          ":active": {
            transform: "none",
          },
        },
      },
    },
    Button: {
      styles: {
        root: {
          ":active": {
            transform: "none",
          },
        },
      },
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
          },
        }),
      },
    },
  },
  globalStyles: () => ({
    a: {
      textDecoration: "none",
      color: "inherit",
    },
  }),
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PageContextProvider>
        <MantineProvider theme={mantineTheme} withNormalizeCSS withGlobalStyles>
          <Notifications />
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </MantineProvider>
      </PageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
