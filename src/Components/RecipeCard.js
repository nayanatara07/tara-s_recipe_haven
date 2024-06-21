// src/components/RecipeCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onAddToCart }) => {
  const navigate = useNavigate();

  const checkRecipeAvailableAndNavigate = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.image_url} alt={recipe.title} />
      <p>Publisher: {recipe.publisher}</p>
      <a href={recipe.source_url} target="_blank" rel="noopener noreferrer" className="button">
        View Recipe
      </a>
      <span onClick={checkRecipeAvailableAndNavigate} className="view-ingredients-link">
        View More
      </span>
      <button onClick={() => onAddToCart(recipe)} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
};

export default RecipeCard;
