import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { addAllToCart } from "../redux/reducers/cartReducer";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setError("Username and password are required");
      return;
    }

    setError("");

    try {
      const response = await fetch("https://tara-s-recipe-haven-backend.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        
        if (data.user.cart && data.user.cart.length > 0) {
          dispatch(addAllToCart(data.user.cart));
        }

        onLogin({ username, password });
        navigate("/app");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login Page</h2>
      {error && <div className="error">{error}</div>}
      <div className="input-container">
        <FaUser className="input-icon" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <FaLock className="input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
