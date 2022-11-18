import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { MantineProvider } from "@mantine/core";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <MantineProvider
      theme={{
        // colorScheme: "dark",
        fontFamily: "Poppins, sans-serif",
        fontFamilyMonospace: "JetBrains Mono, monospace",
        colors: {
          tokyo: [
            "#16161e", //0:  nav/inputs
            "#1a1b26", //1:  chat area
            "#b1bae6", //2:  text
            "#171722", //3:  sidebar
            "#55576b", //4:  interactive-muted
            "#a2a6c2", //5:  interactive-hover
            "#b5bad1", //6:  interactive-active
            "#24263171", //7:  bg-selected
            "#212331c0", //8:  bg-hover
            "#13131a", //9:  bg-profile
            "#5f647e", //10: interactive-normal
            "#161620", //11: popout
            "#565f89", //12: text-muted
            "#24263171", //13: bg-mod-selected
            "#7aa2f7", //14: accent
            "#7289da", //15: button
            "#5c6fb1", //16: button-hover
          ],
        },
        globalStyles: (theme) => ({
          body: {
            background: theme.colors.tokyo[1],
            margin: 0,
            padding: 0,
          },
        }),
      }}
      withGlobalStyles
      withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
