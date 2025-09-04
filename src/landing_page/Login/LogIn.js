import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../signup/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");   // success/error msg
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(" https://zerodha-backend-fhtv.onrender.com/login", formData);
      localStorage.setItem("token", res.data.token); // JWT save

      setMessage("✅ Login successfull ...");
      setIsError(false);

      // 2 sec baad dashboard redirect
      setTimeout(() => {
        window.location.href = "/dashboard/index.html";
      }, 2000);

    } catch (err) {
      setMessage("❌ Login failed: " + (err.response?.data?.message || "Try again"));
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img
          src="media/images/logo.svg"
          style={{ width: "50%" }}
          alt="Logo"
        />

        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>

        {/* Success / Error message */}
        {message && (
          <p className={isError ? "error-msg" : "success-msg"}>{message}</p>
        )}

        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
