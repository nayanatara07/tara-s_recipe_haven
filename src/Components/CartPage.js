import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import './App.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.recipe_id}>
              <h3>{item.title}</h3>
              <img src={item.image_url} alt={item.title} />
              <p>Publisher: {item.publisher}</p>
              <p>Quantity: {item.quantity}</p> {/* Display item quantity */}
              <button onClick={() => handleRemoveFromCart(item)} className="remove-button">
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart</p>
      )}
      <button onClick={() => navigate('/app')} className="back-button">
        Back to Recipes
      </button>
    </div>
  );
};

export default CartPage;