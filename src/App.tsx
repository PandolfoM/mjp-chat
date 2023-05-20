import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Suspense, lazy, useContext } from "react";
import { AuthContext } from "./auth/context";
import { LoadingOverlay } from "@mantine/core";

type Props = {
  children: JSX.Element;
};

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));

function App() {
  const { loading, currentUser } = useContext(AuthContext);
  const ProtectedRoute = (prop: Props) => {
    if (!currentUser?.uid && !loading) {
      return <Navigate to="/login" />;
    }
    return prop.children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={<LoadingOverlay visible={true} overlayOpacity={1} />}>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="resetpassword"
          element={
            <Suspense
              fallback={<LoadingOverlay visible={true} overlayOpacity={1} />}>
              <ProtectedRoute>
                <PasswordReset />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense
              fallback={<LoadingOverlay visible={true} overlayOpacity={1} />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense
              fallback={<LoadingOverlay visible={true} overlayOpacity={1} />}>
              <Register />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
