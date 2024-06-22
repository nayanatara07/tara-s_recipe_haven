import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './App.css';

const CartButton = () => {
  const navigate = useNavigate();
  const itemCount = useSelector((state) => state.cart.count);

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <button onClick={handleNavigateToCart} className="view-cart-button">
      View Cart {itemCount > 0 && `(${itemCount})`}
    </button>
  );
};

export default CartButton;