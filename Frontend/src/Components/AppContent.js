import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import CartButton from "./CartButton";
import "./App.css";

const AppContent = ({ onLogout }) => {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchRecipes = async (searchQuery) => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch recipes");
			}
			const data = await response.json();
			if (data.recipes.length > 0) {
				setRecipes(data.recipes);
				setError("");
			} else {
				setRecipes([]);
				setError("No recipes found");
			}
		} catch (error) {
			setError(
				"Error fetching recipes. Please try again later."
			);
			setRecipes([]);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (searchQuery) => {
		if (searchQuery.trim() === "") {
			setRecipes([]);
			setError("");
			return;
		}

		fetchRecipes(searchQuery.trim());
	};

	return (
		<div className="App">
			<div className="header-buttons">
				<CartButton />
				<button onClick={onLogout} className="logout-button">
					Logout
				</button>
			</div>
			<div className="header">
				<h1>TARA'S RECIPES</h1>
				<SearchBar onSearch={handleSearch} />
			</div>
			{loading ? (
				<p className="loading">Loading...</p>
			) : error ? (
				<p className="error">{error}</p>
			) : (
				<div className="recipe-container">
					{recipes.length > 0 ? (
						recipes.map((recipe) => (
							<RecipeCard key={recipe.recipe_id} recipe={recipe} />
						))
					) : (
						<p>No recipes found</p>
					)}
				</div>
			)}
		</div>
	);
};

export default AppContent;
