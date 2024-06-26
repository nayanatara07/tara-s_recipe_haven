import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";

const RegisterPage = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (name === "" || username === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      } else {
        if (data.message === "User already exists") {
          setError("User already exists. Please try logging in.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);  
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <h2>Register Page</h2>
      {error && <div className="error">{error}</div>}
      <div className="input-container">
        <FaUser className="input-icon" />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="input-container">
        <FaUser className="input-icon" />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-container">
        <FaEnvelope className="input-icon" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-container">
        <FaPhone className="input-icon" />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="input-container">
        <FaLock className="input-icon" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="input-container">
        <FaLock className="input-icon" />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
