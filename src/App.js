import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/Register';
import AppContent from './Components/AppContent';
import RecipeDetailPage from './Components/RecipeDetailPage';
import CartPage from './Components/CartPage';
import './Components/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [cart, setCart] = useState([]);

  const handleRegister = (user) => {
    setRegisteredUsers([...registeredUsers, user]);
  };

  const handleLogin = (user) => {
    const isRegistered = registeredUsers.some(
      (registeredUser) =>
        registeredUser.name === user.name && registeredUser.password === user.password
    );

    if (isRegistered) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid login credentials');
    }
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
          <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
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
