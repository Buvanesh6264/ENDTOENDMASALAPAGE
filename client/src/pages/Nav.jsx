import React, { useState, useEffect } from "react";
import "../css/Nav.css";
import logo from "../images/Product.png";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar" style={{ backgroundColor: scrolled ? "#fff" : "transparent" }}>
      <img src={logo} alt="Company Logo" className="logo-img" />

      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)} aria-label="Open Menu">
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close Menu">×</button>
        <ul className="sidebar-links">
          <li><a href="/">HOME</a></li>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/shop">Shop Now</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a href="/contactus">Contact Us</a></li>
        </ul>
      </div>

      {isOpen && <div className="overlay active" onClick={() => setIsOpen(false)}></div>}

      <ul className="nav-links">
        <li><a href="/">HOME</a></li>
        <li><a href="/aboutus">About Us</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/shop">Shop Now</a></li>
        <li><a href="/recipes">Recipes</a></li>
        <li><a href="/ContactUs">Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
