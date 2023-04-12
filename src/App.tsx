import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./auth/context";

type Props = {
  children: JSX.Element;
};

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
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
