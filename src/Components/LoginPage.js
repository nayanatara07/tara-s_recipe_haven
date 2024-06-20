import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    if (name === '' || password === '') {
      setError('Name and password are required');
      return;
    }

    // Add additional validation rules as needed
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');
    onLogin();
    navigate('/app');
  };

  return (
    <div className="form-container">
      <h2>Login Page</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
