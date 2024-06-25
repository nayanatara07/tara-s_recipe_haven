import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import "./App.css";

const RecipeCard = ({ recipe }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [itemQuantity, setItemQuantity] = useState(0);

	const cartItems = useSelector((state) => state.cart.items);

	const existingCartItem = cartItems.find(
		(item) => item.recipe_id === recipe.recipe_id
	);
	if (existingCartItem) {
		if (itemQuantity === 0) {
			setItemQuantity(existingCartItem.quantity);
		}
	}

	const checkRecipeAvailableAndNavigate = () => {
		navigate(`/recipe/${recipe.recipe_id}`);
	};

	const handleAddToCart = async () => {
		dispatch(addToCart(recipe));
		const dish = {
			name: recipe.title,
			image: recipe.image_url,
			publisher: recipe.publisher,
			quantity: itemQuantity + 1,
			dish_id: recipe.recipe_id,
		};
		setItemQuantity(itemQuantity + 1);
		try {
			const response = await fetch(
				`http://localhost:8080/api/cart/addToCart/${
					JSON.parse(localStorage.getItem("user"))._id
				}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ dish }),
				}
			);
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="recipe-card">
			<h2>{recipe.title}</h2>
			<img src={recipe.image_url} alt={recipe.title} />
			<p>Publisher: {recipe.publisher}</p>
			<a
				href={recipe.source_url}
				target="_blank"
				rel="noopener noreferrer"
				className="button"
			>
				View Recipe
			</a>
			<span
				onClick={checkRecipeAvailableAndNavigate}
				className="view-ingredients-link"
			>
				View More
			</span>
			<button
				onClick={handleAddToCart}
				className="add-to-cart-button"
			>
				Add to Cart {itemQuantity > 0 && `(${itemQuantity})`}
			</button>
		</div>
	);
};

export default RecipeCard;
