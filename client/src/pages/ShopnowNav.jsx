import React, { useEffect, useState} from "react";
import "../css/shopnav.css";
import logo from "../images/shopicon.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ShopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }
  useEffect(()=>{
    const token = sessionStorage.getItem("token")
    const total = sessionStorage.getItem("orderTotal")
    if(token){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
    setCartTotal(total)
  },[])
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="ShopNav-navbar">
      <img src={logo} alt="Company Logo" className="ShopNav-logo-img" />
      <label className="ShopNav-toggle-button" onClick={toggleSidebar}>
        ☰
      </label>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="ShopNav-close-btn" onClick={toggleSidebar}>×</button>
        <ul className="ShopNav-sidebar-links">
          <li><a href="/">HOME</a></li>
          <li><a href="/shop">Shop Now</a></li>
          <li><a href="/profile">PROFILE</a></li>
          <li><a href="/cart">CART</a></li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <ul className={isOpen ? "ShopNav-nav-links open" : "ShopNav-nav-links"}>
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop Now</a></li>

        <div className="profile-section" onClick={toggleModal}>
        <i className="fa fa-user profile-icon"></i> 

        {isModalOpen && (
          <div className="profile-modal">
            {isLoggedIn ? (
              <>
                <a href="/account" className="modal-item">
                  <i className="fa fa-user"></i> My Account
                </a>
                <a href="/login" className="modal-item" onClick={() => {setIsLoggedIn(false);sessionStorage.clear("token")}}>
                  <i className="fa fa-sign-out"></i> Log Out
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="modal-item">
                  <i className="fa fa-lock"></i> Log In
                </a>
                <a href="/register" className="modal-item">
                  <i className="fa fa-user-plus"></i> Create Account
                </a>
              </>
            )}
          </div>
          )}
        </div>


        <a href="/cart" className="nav-cart">
          <i className="fa fa-shopping-bag nav-cart-icon"></i>
          <span className="nav-cart-price">₹ {cartTotal}</span>
        </a>
      </ul>
    </nav>
  );
};

export default ShopNav;
