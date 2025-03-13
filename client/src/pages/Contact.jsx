import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "../css/contact.css";
import Nav from "./Nav";
import Footer from "./Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <Nav />
      <div className="contact-banner">
        <img
          src="https://www.shutterstock.com/image-photo/contact-us-telephone-envelope-letter-260nw-2369194627.jpg"
          alt="Food Ingredients Market"
          className="contact-banner-image"
        />
      </div>

      <h2 className="page-title">CONTACT US</h2>

      <div className="contact-info">
        <div className="info-card">
          <FontAwesomeIcon icon={faPhone} className="fa-icon" />
          <h3>Phone number</h3>
          <p>+91 9843314428</p>
          <p>+91 9600914428</p>
        </div>

        <div className="info-card email-card">
          <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
          <h3>Email address</h3>
          <p>
            <a href="mailto:abhirramasala@gmail.com">abhirramasala@gmail.com</a>
          </p>
        </div>

        <div className="info-card">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-icon" />
          <h3>Address info</h3>
          <p>NO 7 SADACHIAMMAN, Kovil St, VINNILAI, Uppidamangalam, Tamil Nadu 639114, India</p>
        </div>
      </div>

      <div className="contact-form">
        <h3>DROP US A MESSAGE</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Please Enter Your Name *" required value={formData.name} onChange={handleChange}/>
          <input type="email" name="email" placeholder="Please Enter Your Email ID *" required value={formData.email} onChange={handleChange}/>
          <input type="tel" name="phone" placeholder="Please Enter Your Phone Number *" required value={formData.phone} onChange={handleChange}/>
          <textarea name="message" placeholder="Your Message" rows="4" value={formData.message} onChange={handleChange}></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>

      <div className="map-container-group">
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.9941312682545!2d78.17351007512465!3d10.888049989267596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa3b211f7b5069%3A0xd371ebd1224920e4!2sABHIRRA%20MASALA%20FACTORY!5e0!3m2!1sen!2sus!4v1741452236155!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4643.438714273458!2d78.0715664116781!3d10.959114765195238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2fa57a537cc1%3A0xeefc694e201e23c2!2sAbhirra%20Masala%20-%20Traditional%20Taste!5e0!3m2!1sen!2sus!4v1741497591479!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
