import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/reducers/cartReducer';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleRemoveFromCart = async (recipe_id) => {
    dispatch(removeFromCart({ recipe_id }));
    try {
      const response = await fetch(`https://tara-s-recipe-haven-backend.vercel.app/api/cart/removeFromCart/${userId}/${recipe_id}`, {
      // const response = await fetch(`${process.env.SERVER_URL}/api/cart/removeFromCart/${userId}/${recipe_id}`, {
      method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        console.error('Failed to remove item:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`https://tara-s-recipe-haven-backend.vercel.app/api/cart/checkout/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Checkout successful:', data);
        dispatch(clearCart());
        alert('Checkout successful! Your items are locked.');
        setIsCheckoutModalOpen(false);
      } else {
        console.error('Checkout failed:', data.error);
        alert('Checkout failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during checkout.');
    }
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
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.recipe_id)} className="remove-button">
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart</p>
      )}
      <div className="button-container">
        <button onClick={() => navigate('/app')} className="nav-button">
          Back to Recipes
        </button>
        {cartItems.length > 0 && (
          <button onClick={() => setIsCheckoutModalOpen(true)} className="checkout-button">
            Checkout
          </button>
        )}
        <Link to="/orders">
          <button className="order-button">Your Orders</button>
        </Link>
      </div>
      {isCheckoutModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Checkout</h2>
            <p>Are you sure you want to checkout and lock your cart items?</p>
            <div className="button-container">
              <button onClick={handleCheckout} className="confirm-button">
                Confirm
              </button>
              <button onClick={() => setIsCheckoutModalOpen(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
