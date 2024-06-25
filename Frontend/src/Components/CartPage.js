import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import "./App.css";

const CartPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart.items);
	const userId = JSON.parse(
		localStorage.getItem("user")
	)._id;

	const handleRemoveFromCart = async (recipe_id) => {
		dispatch(removeFromCart({ recipe_id }));
		try {
			const response = await fetch(
				`http://localhost:8080/api/cart/removeFromCart/${userId}/${recipe_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			if (response.ok) {
				console.log(data);
			} else {
				console.error("Failed to remove item:", data.error);
			}
		} catch (error) {
			console.error("Error:", error);
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
							<button
								onClick={() => handleRemoveFromCart(item.recipe_id)}
								className="remove-button"
							>
								Remove
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>No items in cart</p>
			)}
			<button
				onClick={() => navigate("/app")}
				className="back-button"
			>
				Back to Recipes
			</button>
		</div>
	);
};

export default CartPage;
