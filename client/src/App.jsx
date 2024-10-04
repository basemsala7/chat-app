import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up//SignUp";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
