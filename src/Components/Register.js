import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Register Page</h2>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
