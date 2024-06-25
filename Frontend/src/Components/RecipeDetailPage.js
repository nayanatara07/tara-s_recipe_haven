import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetailPage = () => {
	const { id } = useParams();
	const [ingredients, setIngredients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchIngredients = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://forkify-api.herokuapp.com/api/get?rId=${id}`
				);
				const data = await response.json();
				if (data && data.recipe && data.recipe.ingredients) {
					setIngredients(data.recipe.ingredients);
					setError("");
				} else {
					setIngredients([]);
					setError("No ingredients found");
				}
			} catch (error) {
				setError(
					"Error fetching ingredients. Please try again later."
				);
			} finally {
				setLoading(false);
			}
		};

		fetchIngredients();
	}, [id]);

	return (
		<div className="recipe-detail-page">
			<h2>RECIPE INGREDIENTS</h2>
			{loading ? (
				<p>Loading ingredients...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<ul>
					{ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default RecipeDetailPage;
