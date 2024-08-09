import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
    const user = localStorage.getItem('user');
    setUsername(user);
  });

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        Cookies.remove("token");
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("Failed to log out. Status:", response.status);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="sticky top-0 left-0 right-0 bg-black bg-opacity-50 z-10">
      <div className="flex items-center justify-between py-4 max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-white">
          <Link to="/">E-Commerce</Link>
        </div>
        <div>
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/" className="text-xl font-semibold text-white hover:text-neon transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-xl font-semibold text-white hover:text-neon transition-colors duration-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-xl font-semibold text-white hover:text-neon transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-xl font-semibold text-white hover:text-neon transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-4 items-center">
            {isLoggedIn ? (
              <>
                <li className="relative">
                  <span
                    className="text-xl font-semibold text-white cursor-pointer flex flex-row items-center gap-2"
                    onClick={toggleDropdown}
                  >
                    {username} <FaAngleDown />
                  </span>
                  {isDropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-20 bg-white bg-opacity-10 border border-gray-200 rounded-md shadow-lg z-10">
                      <li className="block px-4 py-2 hover:bg-opacity-30 text-white hover:bg-gray-200 hover:text-black cursor-pointer text-center">
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li className="block px-4 py-2 text-white hover:bg-gray-200 hover:bg-opacity-30 hover:text-black cursor-pointer text-center" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <button
                      type="button"
                      className="relative flex justify-center w-full px-4 py-2 text-lg font-semibold text-white border border-white bg-gradient-to-r from-neon to-neon-hover rounded-md group transition-colors duration-300 ease-in-out hover:from-neon-hover hover:to-neon-hover hover:bg-white hover:bg-opacity-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon"
                    >
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <button
                      type="button"
                      className="relative flex justify-center w-full px-4 py-2 text-lg font-semibold text-white border border-white bg-gradient-to-r from-neon to-neon-hover rounded-md group transition-colors duration-300 ease-in-out hover:from-neon-hover hover:to-neon-hover hover:bg-white hover:bg-opacity-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon"
                    >
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
