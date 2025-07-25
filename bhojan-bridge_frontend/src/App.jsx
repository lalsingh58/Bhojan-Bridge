import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddSurplusForm from "./components/AddSurplusForm";
import SurplusList from "./pages/SurplusList";

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
      </Routes>
    </>
  );
}

export default App;
