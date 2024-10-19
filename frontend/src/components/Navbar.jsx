import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
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
  const [navbarOpacity, setNavbarOpacity] = useState(1); // Default opacity 1 (no effect)

  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
    const user = localStorage.getItem("user");
    setUsername(user);
  }, []);

  // Scroll event listener for changing navbar opacity (only on route '/')
  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const newOpacity = Math.min(1, 0.1 + scrollY / 200); // Adjust the opacity based on scroll
        setNavbarOpacity(newOpacity);
      };

      window.addEventListener("scroll", handleScroll);

      // Cleanup listener when component unmounts or location changes
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setNavbarOpacity(1); // Reset opacity to 1 for other routes
    }
  }, [location.pathname]);

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
    <div className="sticky top-0 left-0 right-0 z-10" style={{ backgroundColor: `rgba(255, 255, 255, ${navbarOpacity})` }}>
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
          <ul className="flex items-center">
            {isLoggedIn && location.pathname !== '/order-summary' && (
              <li
                className="font-semibold text-black cursor-pointer text-3xl p-1 hover:scale-105 hover:transition-transform hover:hue-rotate-180"
                onClick={toggleCart}
              >
                <FaCartArrowDown /> {/* Cart Icon */}
              </li>
            )}
            {isLoggedIn ? (
              <li className="flex items-center gap-2">
                <span className="text-xl font-semibold text-black cursor-pointer">
                  {username}
                </span>
                <Link
                  to="/profile"
                  className="text-xl text-black border border-3 border-black hover:text-gray-200 hover:bg-black px-4 py-2 rounded-md cursor-pointer"
                >
                  Profile
                </Link>
                <span
                  className="text-xl text-black border border-3 border-black hover:text-gray-200 hover:bg-black px-4 py-2 rounded-md cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>

            ) : (
              <>
                <li>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-xl text-black border border-3 border-black hover:text-gray-200 hover:bg-black px-4 py-2 rounded-md cursor-pointer"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsSignUpModalOpen(true)}
                    className="text-xl text-black border border-3 border-black hover:text-gray-200 hover:bg-black px-4 py-2 rounded-md cursor-pointer"
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
