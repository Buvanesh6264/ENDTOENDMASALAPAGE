import React from "react";
import "../css/aboutus.css";
import Nav from "./Nav";
import md from "../images/md.jpg";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="about-container">
        <Nav />
        <div class="about-banner">
            <img src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/8880e8b2-4c23-4c00-97b3-38a130b36ef5.__CR0,0,1464,625_PT0_SX1464_V1___.jpg" alt="Food Ingredients Market" class="about-banner-image"/>
        </div>
      <div className="about-content">
        <div className="about-text">
          <h3 className="about-subtitle">High Quality of Pure Spices</h3>
          <h1 className="about-title">ABHIRRA MASALA</h1>
          <p className="about-description">
            100% Natural and High Quality of Pure Spices Products had its birth as a cottage
            industry with a investment of Rs. 50,00,000/- The founder <strong>Dr. R.Duraisamy</strong> ventured into trading turmeric in 2014 and then into manufacturing pure 
            spice powders like turmeric powder, chilli powder, coriander powder, and expanded his expertise into producing 
            various masala powders. He promoted Jai Sakthi Foods India Private Limited   Trading Company and marketed his products in the brand name <strong>ABHIRRA</strong>.
          </p>
        </div>

        <div className="about-image-container">
          <img src={md} alt="Founder" className="about-image" />
          <p className="about-image-caption">Mr. R. Duraisamy</p>
        </div>
      </div>
        <div>
      <p className="about-paragraph">
        <strong>The story may look like a miracle</strong>, but the hard work, the potholes, and the bumps on the way 
        and the stormy inclement weather are known only to him. The person who stood behind him for all his
         achievements was his business partner and understanding life partner <strong>Dr. Bharathi Duraisamy</strong>, the Director of the Company.
      </p>
      </div>
      <div class="advertisement-section">
        <div class="advertisement-text">
            <h2>Our <span class="highlight">Advertisement</span></h2>
        </div>
        <div class="advertisement-video">
        <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/lfTi6e21ngU?si=h3O50mwM2sEtbWkU" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
        </div>
    </div>


      <div className="vision-mission-section">
        <div className="vision">
          <h3>ABHIRRA MASALA</h3>
          <h2 className="highlight-text">OUR VISION</h2>
          <p>
            To be the finest humanitarian assistance organization that cares for the sufferings of the underprivileged – 
            the poor, the disabled, and the illiterates, and to champion the cause of creating a green earth.
          </p>
        </div>
        <div className="mission">
          <h3>ABHIRRA MASALA</h3>
          <h2 className="highlight-text">OUR MISSION</h2>
          <p>
            Sakthi Masala ensures product superiority by offering quality products, enhancing the corporate image through 
            fair business practices, and emulating the cardinal principle – Service to humanity is the best work of life.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
