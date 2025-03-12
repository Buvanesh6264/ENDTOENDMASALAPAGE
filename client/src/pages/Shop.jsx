import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/shop.css";
import ShopNav from "./ShopnowNav";
import cover from '../images/productscover.jpg';
import { useNavigate } from "react-router-dom";


const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = [];
  
        if (selectedSizes.length > 0) {
          query.push(`sizes=${selectedSizes.join(",")}`);
        }
  
        if (availabilityFilter.length > 0) {
          query.push(`availability=${availabilityFilter.join(",")}`);
        }
  
        query.push(`page=${page}`);
        query.push(`limit=10`);
  
        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        const response = await fetch(`http://localhost:5000/getshopproducts${queryString}`);
        const data = await response.json();
  
        if (response.ok) {
          setFilteredProducts(data.products);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, [selectedSizes, availabilityFilter, page]);
  

  const handleSizeFilterChange = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleAvailabilityFilterChange = (status) => {
    setAvailabilityFilter(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleWeightChange = (productId, weight) => {
    setSelectedWeights(prev => ({
      ...prev,
      [productId]: weight,
    }));
  };

  const handleAddToCart = async (product) => {
    const token = sessionStorage.getItem("token"); // Get token from session storage

    if (!token) {
        navigate("/login"); // Redirect if user is not logged in
        return;
    }

    try {
        const size = selectedWeights[product.id] || product.weights[0].size;
        const price = product.weights.find(w => w.size === size)?.price || 0;

        const response = await fetch("http://localhost:5000/addtocart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId: product.id, name: product.name, size, price }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Added to cart successfully!");
        } else {
            alert(data.error || "Failed to add to cart");
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};


  return (
    <div>
      <ShopNav />
      <div className="products-banner">
        <img src={cover} alt="Food Ingredients Market" className="products-banner-image" />
      </div>
      <div className="shop-container">
        <aside className="shop-sidebar">
          <h2 className="sidebar-title">Filter:</h2>

          <div className="sidebar-section">
            <h3 className="sidebar-subtitle">Weight</h3>
            <ul className="sidebar-list">
              {["20g", "50g", "100g", "500g"].map(size => (
                <li key={size}>
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeFilterChange(size)}
                  />
                  {size}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-subtitle">Availability</h3>
            <ul className="sidebar-list">
              <li>
                <input
                  type="checkbox"
                  className="filter-checkbox"
                  checked={availabilityFilter.includes("inStock")}
                  onChange={() => handleAvailabilityFilterChange("inStock")}
                />
                In Stock
              </li>
              <li>
                <input
                  type="checkbox"
                  className="filter-checkbox"
                  checked={availabilityFilter.includes("outOfStock")}
                  onChange={() => handleAvailabilityFilterChange("outOfStock")}
                />
                Out of Stock
              </li>
            </ul>
          </div>
        </aside>

        <div className="shop-main">
          <h2 className="shop-title">Products</h2>
          <div className="product-grid">
            {filteredProducts.map(product => {
              const selectedWeight = selectedWeights[product.id] || product.weights?.[0]?.size || "";
              const selectedPrice =
                product.weights?.find(w => w.size === selectedWeight)?.price || "N/A";

              return (
                <div key={product.id} className="product-card">
                  {product.discount && <span className="product-discount-badge">{product.discount}% off</span>}
                  <img src={require(`../images/${product.image}`)} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₹ {selectedPrice}</p>

                  <div className="product-weight-options">
                    {product.weights?.map(w => (
                      <button
                        key={w.size}
                        className={`weight-btn ${selectedWeight === w.size ? "active" : ""}`}
                        onClick={() => handleWeightChange(product.id, w.size)}
                      >
                        {w.size}
                      </button>
                    ))}
                  </div>

                  {product.inStock ? (
                    <button className="product-add-to-cart-button" onClick={() => handleAddToCart(product)}>
                      <FontAwesomeIcon icon={faCartPlus} className="cart-icon" /> Add to Cart
                    </button>
                
                  ) : (
                    <button className="product-unavailable-button" disabled>
                      Sold Out
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
              Previous
            </button>
            <span> Page {page} of {totalPages} </span>
            <button disabled={page >= totalPages} onClick={() => setPage(prev => prev + 1)}>
              Next
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Shop;
