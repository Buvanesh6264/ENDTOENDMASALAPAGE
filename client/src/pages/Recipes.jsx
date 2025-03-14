import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/recipes.css"; 
import Nav from "./Nav";
import Footer from "./Footer";

const categories = ["All", "Veg", "Non-Veg"];

function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); 
  const limit = 5; 

  useEffect(() => {
    fetchRecipes();
    window.scrollTo(0, 0);
  }, [selectedCategory, currentPage]);
 

  // const fetchRecipes = async () => {
  //   let apiUrl = "http://localhost:5000/getrecipes";

  //   if (selectedCategory === "Veg") {
  //     apiUrl = "http://localhost:5000/getvegrecipes"; 
  //   } else if (selectedCategory === "Non-Veg") {
  //     apiUrl = "http://localhost:5000/getnonvegrecipes"; 
  //   }

  //   try {
  //     const response = await fetch(`${apiUrl}?page=${currentPage}&limit=${limit}`);
  //     const data = await response.json();
  //     setRecipes(data.recipes);
  //     setTotalPages(data.totalPages);
  //   } catch (error) {
  //     console.error("Error fetching recipes:", error);
  //   }
  // };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); 
  };
  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getrecipes?page=${currentPage}&limit=${limit}&type=${selectedCategory}`);
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
          <button key={category} className={selectedCategory === category ? "active" : ""}
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
              {recipe.name}
              <span className={`veg-icon ${recipe.type === "Veg" ? "veg" : "non-veg"}`}></span>
            </h3>
            <p>👥 {recipe.servings} ⏳ {recipe.time}</p>
            <p>{recipe.description}</p>
            <button className="view-recipe-btn" onClick={() => navigate("/recipeinfo", { state: { recipe } })}>
              VIEW RECIPE →
            </button>
          </div>
        </div>
      ))}
    </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default Recipes;
