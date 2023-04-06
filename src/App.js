import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import { useSelector } from "react-redux";
import Register from "./pages/auth/register";
import Home from "./pages/Sidebar";
import { Outlet, Paket, User, Pelanggan, Transaksi } from "./pages/admin";

import NotFound from "./pages/error/404";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./routers/protectRoute";
import DetailTransaksi from "./pages/admin/DetailTransaksi";
import Laporan from "./pages/admin/Laporan";

// import Input from "./component/Input";
// import TextArea from "./component/TextArea";
// import Button from "./component/Button";
// import Card from "./component/Card;

export default function App() {
  const color = useSelector((state) => state.color);
  console.log(color);
  const role = useSelector((state) => state.authProcess.role);

  return (
    <div className="select">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path={`${
            role === "kasir"
              ? "kasir"
              : role === "admin"
              ? "admin"
              : role === "owner"
              ? "owner"
              : null
          }`}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {/* <Route
            path="dashboard"
            element={
              <>
                <Dashboard />
              </>
            }
          /> */}
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
                  <User />
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
          <Route
            path="laporan"
            element={
              <ProtectedRoute>
                <Laporan />
              </ProtectedRoute>
            }
          />
        </Route>{" "}
        <Route
          path="/admin/transaksi/detail/:id"
          element={
            <ProtectedRoute>
              <DetailTransaksi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/404"
          element={
            <ProtectedRoute>
              <NotFound />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={`${
                role === "kasir"
                  ? "kasir/transaksi"
                  : role === "admin"
                  ? "admin/transaksi"
                  : role === "owner"
                  ? "owner/transaksi"
                  : null
              }`}
            />
          }
        />
      </Routes>
    </div>
  );
}
