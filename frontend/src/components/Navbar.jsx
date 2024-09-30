import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaCartArrowDown } from "react-icons/fa";
import Cookies from "js-cookie";
import Modal from "./Modal";
import Login from "./Login";
import SignUp from "./SignUp";
import CartCanvas from "./CartCanvas"; // Import CartCanvas component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for login modal
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State for sign-up modal
  const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart open/close
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
    const user = localStorage.getItem("user");
    setUsername(user);
  }, []);

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
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-10 bg-white">
      <div className="flex items-center justify-between py-4 max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-black">
          <Link to="/">AshapuriGas</Link>
        </div>
        <div>
          <ul className="flex gap-4 items-center">
            <li>
              <Link
                to="/"
                className="text-xl font-semibold hover:underline text-black hover:text-neon transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-xl font-semibold hover:underline text-black hover:text-neon transition-colors duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-xl font-semibold hover:underline text-black hover:text-neon transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-xl font-semibold hover:underline text-black hover:text-neon transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-4 items-center">
            {isLoggedIn && (
              <li className="font-semibold text-black cursor-pointer text-3xl p-1 hover:scale-105 hover:transition-transform hover:hue-rotate-180 " onClick={toggleCart}>
                <FaCartArrowDown /> {/* Cart Icon */}
              </li>
            )}
            {isLoggedIn ? (
              <li className="relative">
                <span
                  className="text-xl font-semibold text-black cursor-pointer flex flex-row items-center gap-2"
                  onClick={toggleDropdown}
                >
                  {username} <FaAngleDown />
                </span>
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-24 bg-gray-200 border border-gray-200 rounded-md shadow-lg z-10">
                    <li className="block px-4 py-2 text-black text-xl hover:text-gray-200 hover:bg-black cursor-pointer">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li
                      className="block px-4 py-2 text-black text-xl hover:text-gray-200 hover:bg-black cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="relative flex justify-center w-full px-4 py-2 text-lg font-semibold text-black border border-black bg-gradient-to-r from-neon to-neon-hover rounded-md group transition-colors duration-300 ease-in-out hover:from-neon-hover hover:to-neon-hover hover:bg-black hover:bg-opacity-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsSignUpModalOpen(true)}
                    className="relative flex justify-center w-full px-4 py-2 text-lg font-semibold text-black border border-black bg-gradient-to-r from-neon to-neon-hover rounded-md group transition-colors duration-300 ease-in-out hover:from-neon-hover hover:to-neon-hover hover:bg-black hover:bg-opacity-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Cart Canvas */}
      <CartCanvas isOpen={isCartOpen} toggleCart={toggleCart} />

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login onClose={() => setIsLoginModalOpen(false)} onSwitchToSignUp={handleSwitchToSignUp} />
      </Modal>

      {/* Sign-Up Modal */}
      <Modal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)}>
        <SignUp onClose={() => setIsSignUpModalOpen(false)} onSwitchToLogin={handleSwitchToLogin} />
      </Modal>
    </div>
  );
};

export default Navbar;
