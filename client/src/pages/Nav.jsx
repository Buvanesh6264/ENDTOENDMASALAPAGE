import React, { useState } from "react";
import "../css/Nav.css";
// import logo from "../assets/images/blue-white.png"; // Ensure the correct path

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="navbar">
      <label className="toggle-button" onClick={toggleSidebar}>
        ☰
      </label>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
          <ul className="sidebar-links">
            <li><a href="/home">HOME</a></li>
            <li><a href="/about">about</a></li>
            <li><a href="/services">services</a></li>
             <li><a href="/Enquiry">Enquiry</a></li>
            <li><a href="/ContactUs">Contact Us</a></li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
           <li><a href="/home">HOME</a></li>
            <li><a href="/about">about</a></li>
            <li><a href="/services">services</a></li>
        <li className="logo">
            <a href="#Home" className="scroll">
              <img src={"logo"} alt="Company Logo" />
            </a>
         </li>
           <li><a href="/Enquiry">Enquiry</a></li>
            <li><a href="/ContactUs">Contact Us</a></li>
      </ul>
    </nav>
    
  );
};

export default Nav;
