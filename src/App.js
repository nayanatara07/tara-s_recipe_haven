import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import AppContent from './Components/AppContent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          {isLoggedIn ? (
            <Route path="/app" element={<AppContent onLogout={handleLogout} />} />
          ) : (
            <Route path="*" element={<HomePage isLoggedIn={isLoggedIn} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
