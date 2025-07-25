import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-green-600">
          BhojanBridge
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="hover:text-green-500">
            Home
          </NavLink>
          <NavLink to="/login" className="hover:text-green-500">
            Login
          </NavLink>
          <NavLink to="/register" className="hover:text-green-500">
            Register
          </NavLink>
          <NavLink to="/surplus" className="hover:text-green-500">
            Surplus
          </NavLink>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 animate-slideDown bg-white shadow-md">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="block">
            Home
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Register
          </NavLink>
          <NavLink
            to="/surplus"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Surplus
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
