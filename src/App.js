import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import { useSelector } from "react-redux";
import Register from "./pages/auth/register";
import Home from "./pages/Home";
import { Outlet, Paket, Member, Pelanggan, Transaksi } from "./pages/admin";

import NotFound from "./pages/error/404";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./routers/protectRoute";

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
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="data">
            <Route
              path="outlet"
              element={
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              }
            />
            <Route
              path="paket"
              element={
                <ProtectedRoute>
                  <Paket />
                </ProtectedRoute>
              }
            />
            <Route
              path="member"
              element={
                <ProtectedRoute>
                  <Member />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="pelanggan"
            element={
              <ProtectedRoute>
                <Pelanggan />
              </ProtectedRoute>
            }
          />
          <Route
            path="transaksi"
            element={
              <ProtectedRoute>
                <Transaksi />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace={true} />} />
      </Routes>
    </div>
  );
}
