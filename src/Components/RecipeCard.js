import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import './App.css';

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.count); // Retrieve cart count from Redux state

  const checkRecipeAvailableAndNavigate = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(recipe));
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
      <button onClick={handleAddToCart} className="add-to-cart-button">
        Add to Cart {cartCount > 0 && `(${cartCount})`}
      </button>
    </div>
  );
};

export default RecipeCard;
