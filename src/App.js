// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import AppContent from './Components/AppContent';
import RecipeDetailPage from './Components/RecipeDetailPage';
import CartPage from './Components/CartPage';
import './Components/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddToCart = (recipe) => {
    setCart((prevCart) => [...prevCart, recipe]);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          {isLoggedIn ? (
            <>
              <Route path="/app" element={<AppContent onLogout={handleLogout} onAddToCart={handleAddToCart} />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={handleRemoveFromCart} />} />
            </>
          ) : (
            <Route path="*" element={<HomePage isLoggedIn={isLoggedIn} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
