import React, { useState } from 'react';
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import './App.css';

const AppContent = ({ onLogout, onAddToCart }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`);
      const data = await response.json();
      if (data && data.recipes) {
        setRecipes(data.recipes);
        setError('');
      } else {
        setRecipes([]);
        setError('No recipes found');
      }
    } catch (error) {
      setError('Error fetching recipes. Please try again later.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === '') {
      setRecipes([]);
      setError('');
      return;
    }

    fetchRecipes(searchQuery.trim());
  };

  return (
    <div className="App">
      <div className="header">
        <h1>TARA'S RECIPES</h1>
        <Link to="/cart" className="view-cart-button">
          View Cart
        </Link>
        <SearchBar onSearch={handleSearch} />
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="loading">{error}</p>
      ) : (
        <div className="recipe-container">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.recipe_id} recipe={recipe} onAddToCart={onAddToCart} />
            ))
          ) : null}
        </div>
      )}
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default AppContent;
