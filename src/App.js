import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routers/protectRoute";
import Login from "./pages/auth/login";
import { useSelector } from "react-redux";
import Register from "./pages/auth/register";
import Home from "./pages/Home";
import { Outlet, Paket } from "./pages/admin";
// import Input from "./component/Input";
// import TextArea from "./component/TextArea";
// import Button from "./component/Button";
// import Card from "./component/Card;

export default function App() {
  const color = useSelector((state) => state.color);
  console.log(color);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route path="outlet" element={<Outlet />} />
          <Route path="paket" element={<Paket />} />
        </Route>

        <Route path="*" element={<Navigate to="/article" replace={true} />} />
      </Routes>
    </div>
  );
}
