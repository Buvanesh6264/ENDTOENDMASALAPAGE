import React from "react";
import "../css/footer.css";
import logo from "../images/Product.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
                <img src={logo} alt="Company Logo" className="footer-logo" />
          <p className="footer-description">
            Delight your taste buds with the authentic flavors of Abhirra Masala!
          </p>
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>

        </div>

        <div className="footer-column">
          <h3 className="footer-title">Our Company</h3>
          <ul className="footer-links">
          <li><a href="/">HOME</a></li>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/contactus">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
          <li><a href="/shop">Shop Now</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-text">
            <i className="fa fa-map-marker"></i> NO 7 SADACHIAMMAN, Kovil St, VINNILAI, Uppidamangalam, Tamil Nadu 639114, India
          </p>
          <p className="footer-text">
            <i className="fa fa-phone"></i> +91 9843314428 / +91 9600914428
          </p>
          <p className="footer-text">
            <i className="fa fa-envelope"></i> <a href="mailto:abhirramasala@gmail.com">abhirramasala@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2025 <span className="highlight">Jai Sakthi Foods India Private Limited</span>. All rights reserved.</p>
        <p>Web Designed by <span className="highlight">Buvanesh M</span></p>
      </div>
    </footer>
  );
}
