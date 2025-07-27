import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddSurplusForm from "./components/AddSurplusForm";
import SurplusList from "./pages/SurplusList";
import Profile from "./pages/Profile";
import ClaimPage from "./pages/ClaimPage";
import NotificationsPage from "./components/NotificationsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/surplus/add" element={<AddSurplusForm />} />
        <Route path="/surplus" element={<SurplusList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/surplus/claim/:id" element={<ClaimPage />} />
      </Routes>
    </>
  );
}

export default App;
