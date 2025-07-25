import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ detect route changes

  const linkStyle =
    "block py-2 px-4 rounded hover:bg-green-100 hover:text-green-700 transition";

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // ✅ Update on every route change
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const renderLinks = () => (
    <>
      <NavLink to="/" className={linkStyle}>
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/surplus" className={linkStyle}>
            View Surplus
          </NavLink>
          <NavLink to="/surplus/add" className={linkStyle}>
            Share Surplus
          </NavLink>
          <button onClick={handleLogout} className={linkStyle}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={linkStyle}>
            Login
          </NavLink>
          <NavLink to="/register" className={linkStyle}>
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-green-600">
          BhojanBridge
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">{renderLinks()}</div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow-lg rounded-b-lg animate-fade-in-down space-y-2">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
