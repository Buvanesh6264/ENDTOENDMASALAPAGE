import React, { useState, useEffect } from 'react';
import '../css/Products.css';
import Nav from './Nav';
import cover from '../images/productscover.jpg';
import Footer from './Footer';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/getcategories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/getproducts?category=${selectedCategory}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, currentPage]);

  return (
    <div className="products-page">
      <Nav />
      <div className="products-banner">
        <img src={cover} alt="Food Ingredients Market" className="products-banner-image" />
      </div>
      <div className="banner">
        <h2 className='main-title'>Our <span className="highlight">Products</span></h2>
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

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={require(`../images/${product.image}`)} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.name} / {product.category}</p>
              </div>
            ))}
          </div>
          
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
      <Footer/>
    </div>
  );
};

export default Products;
