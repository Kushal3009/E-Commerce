import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import "./Login.css"; // Custom CSS file for additional styles

const Login = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include", // Include credentials (cookies)
      });

      if (response.ok) {
        const { username } = await response.json();
        localStorage.setItem("user", username);
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-hero-pattern bg-cover bg-center">
      {error && (
        <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50 p-4 text-center text-xl font-semibold text-black bg-red-50 border border-red-500 rounded">
          {error}
        </div>
      )}
      <animated.div
        style={fadeIn}
        className="z-10 w-full max-w-md p-8 space-y-8 bg-white bg-opacity-5 rounded-lg shadow-2xl backdrop-blur-sm"
      >
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white font-sans">
            Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-t-md focus:outline-none focus:ring-neon focus:border-neon focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-b-md focus:outline-none focus:ring-neon focus:border-neon focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/signup"
                className="font-medium text-neon hover:text-neon-hover text-white"
              >
                Don't have an account?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-lg font-semibold text-white border border-white bg-gradient-to-r from-neon to-neon-hover rounded-md group transition-colors duration-300 ease-in-out hover:from-neon-hover hover:to-neon-hover hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon"
            >
              Sign in
            </button>
          </div>
        </form>
      </animated.div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default Login;
