import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./App.css";

const CartButton = () => {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart.items);
	const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
	console.log("itemCount-->", itemCount);
	console.log("cart-->", cartItems);
  
	const handleNavigateToCart = () => {
	  navigate("/cart");
	};

	return (
		<button
			onClick={handleNavigateToCart}
			className="view-cart-button"
		>
			View Cart {itemCount > 0 && `(${itemCount})`}
		</button>
	);
};

export default CartButton;
