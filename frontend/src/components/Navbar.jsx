import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import Cookies from 'js-cookie';
import Modal from './Modal';
import Login from './Login';
import SignUp from './SignUp'; // Import SignUp component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for login modal
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State for sign-up modal
  const [opacity, setOpacity] = useState(0.5); // Initial opacity set to 0.5
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const showBackground = ['/', '/login', '/signup'].includes(location.pathname);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
    const user = localStorage.getItem('user');
    setUsername(user);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const newOpacity = Math.min(0.5 * 1+ scrollPosition / maxScroll); // Calculate opacity
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        Cookies.remove('token');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Failed to log out. Status:', response.status);
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginModalOpen(false); // Close login modal
    setIsSignUpModalOpen(true); // Open sign-up modal
  };

  const handleSwitchToLogin = () => {
    setIsSignUpModalOpen(false); // Close sign-up modal
    setIsLoginModalOpen(true); // Open login modal
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-10" style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})`, transition: 'background-color 0.3s ease-in-out' }}>
      <div className="flex items-center justify-between py-4 max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-black">
          <Link to="/">AshapuriGas</Link>
        </div>
        <div>
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/" className="text-xl font-semibold hover:underline text-black hover:text-neon transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-xl font-semibold hover:underline text-black hover:text-neon transition-colors duration-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-xl font-semibold hover:underline text-black hover:text-neon transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-xl font-semibold hover:underline text-black hover:text-neon transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-4 items-center">
            {isLoggedIn ? (
              <li className="relative">
                <span
                  className="text-xl font-semibold text-black cursor-pointer flex flex-row items-center gap-2"
                  onClick={toggleDropdown}
                >
                  {username} <FaAngleDown />
                </span>
                {isDropdownOpen && (
                  <ul className={`absolute right-0 mt-2 w-24 ${showBackground ? "bg-white bg-opacity-10" : "bg-black"} border border-gray-200 rounded-md shadow-lg z-10`}>
                    <li className={`block px-4 py-2 hover:bg-opacity-30 text-white text-xl hover:font-bold font-semibold text-center hover:bg-gray-200 ${showBackground ? "hover:text-black" : ""} cursor-pointer text-center`}>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li
                      className={`block px-4 py-2 text-white text-xl hover:font-bold font-semibold hover:bg-gray-200 hover:bg-opacity-30 cursor-pointer text-center ${showBackground ? "hover:text-black" : ""}`}
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
                    onClick={() => setIsLoginModalOpen(true)} // Open the login modal
                    type="button"
                    className="relative flex justify-center w-full px-4 py-2 text-lg font-semibold text-black border border-white bg-gradient-to-r from-neon to-neon-hover rounded-md group transition-colors duration-300 ease-in-out hover:from-neon-hover hover:to-neon-hover hover:bg-black hover:bg-opacity-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsSignUpModalOpen(true)} // Open the sign-up modal
                    type="button"
                    className="relative flex justify-center w-full px-4 py-2 text-lg font-semibold text-black border border-white bg-gradient-to-r from-neon to-neon-hover rounded-md group transition-colors duration-300 ease-in-out hover:from-neon-hover hover:to-neon-hover hover:bg-black hover:bg-opacity-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login onClose={() => setIsLoginModalOpen(false)} onSwitchToSignUp={handleSwitchToSignUp} />
      </Modal>
      {/* Sign-Up Modal */}
      <Modal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)}>
        <SignUp 
          onClose={() => setIsSignUpModalOpen(false)} 
          onSwitchToLogin={handleSwitchToLogin} // Pass the switch function
        />
      </Modal>
    </div>
  );
};

export default Navbar;
