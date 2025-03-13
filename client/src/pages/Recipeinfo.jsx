import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "../css/recipeinfo.css";
import Nav from "./Nav";
import Footer from "./Footer";
import cover from '../images/recipeinfo.jpg';

const Recipeinfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {}; 

  if (!recipe) {
    return (
      <div>
        <Nav />
        <h2>Recipe not found!</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="products-banner">
        <img src={cover} alt="Food Ingredients Market" className="products-banner-image" />
      </div>
      <div className="recipeinfo-container">
        <div className="recipeinfo-header">
          <div className="recipeinfo-info">
            <h1>{recipe.name}</h1>
            <p><strong>Main Ingredient:</strong> {recipe.mainIngredient || "Not specified"}</p>
            <p>{recipe.description}</p>
          </div>
          <div className="recipeinfo-image">
            <img src={recipe.image} alt={recipe.name} />
          </div>
        </div>

        <div className="recipeinfo-details">
          <div className="detail">🍽️ <span>{recipe.details.servings || "N/A"} Servings</span></div>
          <div className="detail">⏳ <span>Prep Time: {recipe.details.prepTime || "N/A"}</span></div>
          <div className="detail">🔥 <span>Cook Time: {recipe.details.cookTime || "N/A"}</span></div>
          <div className="detail">⏲️ <span>Total Time: {recipe.details.totalTime || "N/A"}</span></div>
        </div>

        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients ? (
              recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
            ) : (
              <li>No ingredients listed.</li>
            )}
          </ul>
        </div>

        <div className="instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions ? (
              recipe.instructions.map((step, index) => <li key={index}>{step}</li>)
            ) : (
              <li>No instructions provided.</li>
            )}
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recipeinfo;
