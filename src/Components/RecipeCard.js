import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import './App.css';

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemQuantity, setItemQuantity] = useState(0); // Local state to track quantity for this recipe item

  // Retrieve cart items and count from Redux state
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.count);

  // Find if this recipe is already in the cart to set initial quantity
  const existingCartItem = cartItems.find((item) => item.recipe_id === recipe.recipe_id);
  if (existingCartItem) {
    // Initialize local state with existing quantity from cart
    if (itemQuantity === 0) {
      setItemQuantity(existingCartItem.quantity);
    }
  }

  const checkRecipeAvailableAndNavigate = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(recipe));
    setItemQuantity(itemQuantity + 1); // Increment local quantity state
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
        Add to Cart {itemQuantity > 0 && `(${itemQuantity})`}
      </button>
    </div>
  );
};

export default RecipeCard;
