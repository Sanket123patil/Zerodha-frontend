import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../signup/Auth.css"; // Zerodha style

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");   // success/error message
  const [isError, setIsError] = useState(false); // style ke liye

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://zerodha-backend-fhtv.onrender.com/signup", formData);
      setMessage("✅ Signup successful! Please login.");
      setIsError(false);

      // 2 sec baad login page pe bhej do
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("❌ Signup failed: " + (err.response?.data?.message || "Try again"));
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="media/images/logo.svg" style={{ width: "50%" }} alt="Logo" />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        {/* success / error message */}
        {message && (
          <p className={isError ? "error-msg" : "success-msg"}>{message}</p>
        )}

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
