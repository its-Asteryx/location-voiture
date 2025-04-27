import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation and useNavigate
import { useAuth } from "../context/authContext"; // Import useAuth

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Get login function from AuthContext

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(""); // State to hold error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new submission

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // If login failed (non-2xx response), show error message
        setError(data.message || "Login failed.");
        return;
      }

      // After successful login, save token and user data
      login(data.token, data.user);

      // Redirect to the page they were trying to access before login
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <img src="/images/logo1.png" alt="Logo" className="w-24 mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-center">Log in to your account</h2>

        <form className="w-full flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <div className="text-red-600 text-sm text-center mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
