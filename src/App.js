import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}
