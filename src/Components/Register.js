import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';

const RegisterPage = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (name === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    onRegister({ name, email, phone, password });
    navigate('/login'); 
  };

  return (
    <div className="form-container">
      <h2>Register Page</h2>
      {error && <div className="error">{error}</div>}
      <div className="input-container">
        <FaUser className="input-icon" />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <FaEnvelope className="input-icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <FaPhone className="input-icon" />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
      <div className="input-container">
        <FaLock className="input-icon" />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
