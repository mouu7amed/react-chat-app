import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Chats } from "./Chats";
import { AuthProvider } from "../utilities/Auth";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
