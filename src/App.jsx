import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const {currentUser} = useContext(AuthContext)

  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
