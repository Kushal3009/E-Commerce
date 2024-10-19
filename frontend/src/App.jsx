import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SignUp from './components/SignUp';
import Login from './components/Login';
import gas from '/gas.jpeg'; // Import the background image
import Product from './components/Product';
import Products from './components/Products';
import Footer from './components/Footer';
import OrderSummary from './components/OrderSummary';


const App = () => {
  const location = useLocation();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' }); // 'success' or 'error'

  const showBackground = ['/', '/login', '/signup'].includes(location.pathname);

  const openSignUp = () => setIsSignUpOpen(true);
  const openLogin = () => setIsLoginOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);
  const closeLogin = () => setIsLoginOpen(false);

  const handleAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 2000);
  };

  return (
    <div className={`min-h-screen ${showBackground ? 'bg-cover bg-opacity-0 bg-center' : ''}`} style={showBackground ? { backgroundImage: `url(${gas})` } : {}}>
      <Navbar openSignUp={openSignUp} openLogin={openLogin} />

      {/* Alert display */}
      {alert.message && (
        <div className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 p-4 text-center text-xl font-semibold ${alert.type === 'success' ? 'text-green-700 bg-green-100 border border-green-500' : 'text-red-700 bg-red-100 border border-red-500'} rounded`}>
          {alert.message}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>

      {/* Modal components */}
      {isSignUpOpen && (
        <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
          <SignUp
            onSuccess={() => {
              closeSignUp();
              handleAlert('Register Successfully', 'success');
              openLogin();
            }}
            onError={(message) => handleAlert(message, 'error')}
          />
        </Modal>
      )}

      {isLoginOpen && (
        <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
          <Login
            onClose={() => closeLogin()}
            onError={(message) => handleAlert(message, 'error')}
          />
        </Modal>
      )}
      <Footer/>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;