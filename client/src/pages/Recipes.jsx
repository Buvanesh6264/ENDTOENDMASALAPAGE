import React, { useState, useEffect } from "react";
import "../css/recipes.css"; 
import Nav from "./Nav";

const categories = ["All", "Veg", "Non-Veg"];

function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; 

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory, currentPage]);

  const fetchRecipes = async () => {
    let apiUrl = "http://localhost:5000/getrecipes";

    if (selectedCategory === "Veg") {
      apiUrl = "http://localhost:5000/getvegrecipes"; 
    } else if (selectedCategory === "Non-Veg") {
      apiUrl = "http://localhost:5000/getnonvegrecipes"; 
    }

    try {
      const response = await fetch(`${apiUrl}?page=${currentPage}&limit=${limit}`);
      const data = await response.json();
      setRecipes(data.recipes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="recipes-page">
      <Nav />
      <div className="recipes-banner">
        <img src="https://tamronhallshow.com/wp-content/uploads/2021/04/RecipeVideos-v4.jpg" alt="Food Ingredients Market" className="about-banner-image"/>
      </div>
      
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); 
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="dish-image" />
            <div className="recipe-info">
              <h3>
                {recipe.name}{" "}
                <span className={`veg-icon ${recipe.type === "Veg" ? "veg" : "non-veg"}`}></span>
              </h3>
              <p>👥 {recipe.servings} ⏳ {recipe.time}</p>
              <p>{recipe.description}</p>
              <a href="#">VIEW RECIPE →</a>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Recipes;
