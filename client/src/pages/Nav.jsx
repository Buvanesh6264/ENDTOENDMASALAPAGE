import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/Nav.css";
import logo from "../images/Product.png";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); 

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
          {["/", "/aboutus", "/products", "/shop", "/recipes", "/contactus"].map((path, index) => (
            <li key={index}>
              <a href={path} className={location.pathname === path ? "active-link" : ""}>
                {path === "/" ? "Home" : path.replace("/", "").replace(/-/g, " ")}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && <div className="overlay active" onClick={() => setIsOpen(false)}></div>}

      <ul className="nav-links">
        {["/", "/AboutUs", "/Products", "/Shop", "/Recipes", "/ContactUs"].map((path, index) => (
          <li key={index}>
            <a href={path} className={location.pathname === path ? "active-link" : ""}>
              {path === "/" ? "Home" : path.replace("/", "").replace(/-/g, " ")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
