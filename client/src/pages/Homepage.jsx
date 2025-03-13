import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import Nav from "./Nav";
import Footer from "./Footer";
import "../css/home.css"; 
import turmeric from "../images/product7.jpg";
import ac1 from "../images/ac1.jpg";
import ac2 from "../images/ac2.jpg";

function Homepage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [recipes, setRecipes] = useState([]);
  const currentIndex =0;

  useEffect(() => {
    fetch("http://localhost:5000/homepagerecipes")
      .then((response) => response.json())
      .then((data) => {
        if (data.recipes && data.recipes.length > 0) {
          setRecipes(data.recipes);
        }
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="homepage">
      <Nav scrolled={scrolled} activeImage={activeImage} />
      
      <section className="top-section">
        <Carousel setActiveImage={setActiveImage} />
      </section>
      
      <section className="second-section">
        <div className="content-container">
          <div className="text-section">
            <h5 className="subtitle">High Quality of Pure Spices</h5>
            <h2 className="title">ABHIRRA</h2>
            <p className="description">
              100% Natural and High Quality of Pure Spices Products had its birth as a cottage
              industry with an investment of Rs. 50,00,000/-. The founder Dr. R.
              Duraisamy ventured into trading turmeric in 2014 and then into
              manufacturing pure spice powders like turmeric powder, chilli
              powder, coriander powder, and expanded his expertise into producing
              various masala powders.
            </p>
            <a href="/aboutus" className="read-more">READ MORE →</a>
          </div>

          <div className="image-section">
            <div className="image-container">
              <img src={ac1} alt="Woman sorting chilies" className="image" />
            </div>
            <div className="image-container">
              <img src={ac2} alt="Trophy" className="image" />
            </div>
          </div>
        </div>
      </section>

      <section className="trending-products">
        <h2 className="section-title">TRENDING PRODUCT</h2>
        <div className="trading-product-container">
          <img src={turmeric} alt="Turmeric Powder Pack" className="trending-products-image"/>
          <div className="product-details">
            <h3 className="product-title">Turmeric Powder</h3>
            <p className="product-description">
              The spice known as turmeric may be the most effective nutritional supplement in existence. 
              Many high-quality studies show that turmeric has major benefits for your body and brain. 
              Many of these benefits come from its main active ingredient, curcumin.
            </p>
            <a href="/products" className="read-more">VIEW ALL PRODUCTS →</a>
          </div>
        </div>
      </section>

      <section className="hottest-recipes">
        <h2 className="section-title">Cooking Direction</h2>

        {recipes.length > 0 ? (
          <div className="recipe-container">
            <div className="recipe-image">
              <img
                src={recipes[currentIndex].image}
                alt={recipes[currentIndex].name}
                className="dish-image"
              />
            </div>

            <div className="recipe-details">
              <h3 className="recipe-title">{recipes[currentIndex].name}</h3>
              <p className="recipe-description">
                {recipes[currentIndex].description}
              </p>
              <div className="recipe-links">
                <a href="/recipes" className="read-more">VIEW ALL →</a>
              </div>
            </div>
          </div>
        ) : (
          <p className="no-recipes">No recipes available at the moment.</p>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Homepage;
