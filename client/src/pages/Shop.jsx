import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import shopdata from "../data/shopdata";
import "../css/shop.css";
import ShopNav from "./ShopnowNav";
import cover from '../images/productscover.jpg';


const Shop = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState(
    shopdata.reduce((acc, product) => {
      acc[product.id] = product.weights?.[0]?.size || "";
      return acc;
    }, {})
  );

  const handleSizeFilterChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleAvailabilityFilterChange = (status) => {
    setAvailabilityFilter((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const filteredProducts = shopdata.filter((product) => {
    // const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSize =
      selectedSizes.length === 0 ||
      product.weights.some((weight) => selectedSizes.includes(weight.size));
    const matchesAvailability =
      availabilityFilter.length === 0 ||
      (availabilityFilter.includes("inStock") && product.inStock) ||
      (availabilityFilter.includes("outOfStock") && !product.inStock);

    return matchesSize && matchesAvailability;
  });

  const handleWeightChange = (productId, weight) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [productId]: weight,
    }));
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
              {["20g", "50g", "100g", "500g"].map((size) => (
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
            {filteredProducts.map((product) => {
              const selectedWeight =
                selectedWeights[product.id] || product.weights?.[0]?.size || "";
              const selectedPrice =
                product.weights?.find((w) => w.size === selectedWeight)?.price || "N/A";

              return (
                <div key={product.id} className="product-card">
                  {product.discount && <span className="product-discount-badge">{product.discount}% off</span>}
                  <img src={require(`../images/${product.image}`)} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₹ {selectedPrice}</p>

                  <div className="product-weight-options">
                    {product.weights?.map((w) => (
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
                    <button className="product-add-to-cart-button">
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
        </div>
      </div>
    </div>
  );
};

export default Shop;
