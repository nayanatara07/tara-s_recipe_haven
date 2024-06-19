import React, { useState } from 'react';

const RecipeCard = ({ recipe }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchIngredients = async (recipeId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
      const data = await response.json();
      if (data && data.recipe && data.recipe.ingredients) {
        setIngredients(data.recipe.ingredients);
        setError('');
      } else {
        setIngredients([]);
        setError('No ingredients found');
      }
    } catch (error) {
      setError('Error fetching ingredients. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = () => {
    if (!showIngredients) {
      fetchIngredients(recipe.recipe_id);
    }
    setShowIngredients(!showIngredients);
  };

  if (!recipe) {
    return null;
  }

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.image_url} alt={recipe.title} />
      <p>Publisher: {recipe.publisher}</p>
      <a href={recipe.source_url} target="_blank" rel="noopener noreferrer">View Recipe</a>
      <button className="buttons" onClick={handleViewMore}>
        {showIngredients ? 'View Less' : 'View More'}
      </button>
      {loading ? (
        <p>Loading ingredients...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        showIngredients && (
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default RecipeCard;