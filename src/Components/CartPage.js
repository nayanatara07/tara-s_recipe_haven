import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/actions/cartActions';
import './App.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <img src={item.image_url} alt={item.title} />
              <p>Publisher: {item.publisher}</p>
              <button onClick={() => handleRemoveFromCart(index)} className="remove-button">
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
