import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to Tara's Recipes Haven</h1>
      <div className="login-button-container">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
