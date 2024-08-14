import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const Login = ({ onClose, onSwitchToSignUp }) => { // Added onSwitchToSignUp prop
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 300 },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

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
        setMessage("Login Successful");
        setMessageType("success");

        setTimeout(() => {
          setMessage(""); // Clear the message
          onClose(); // Close the modal
          location.reload(); // Reload the page
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Something wrong. Please try again.");
        setMessageType("error");
        setTimeout(() => setMessage(""), 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 1500);
    }
  };

  return (
    <animated.div
      style={fadeIn}
      className="relative flex flex-col items-center p-8 bg-white rounded-lg shadow-lg bg-opacity-10"
    >
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {message && (
        <div
          className={`mb-4 text-center font-semibold p-2 border text-black rounded ${
            messageType === "success" ? "bg-green-100 border-green-800" : "bg-red-100 border-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="email-address"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => {
              onClose(); // Close sign-in modal
              onSwitchToSignUp(); // Open sign-up modal
            }}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Don't have an account?
          </button>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </div>
      </form>
    </animated.div>
  );
};

export default Login;
