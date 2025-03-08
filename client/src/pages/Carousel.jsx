import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import "../css/Carousel.css"; // Add your custom styles

const Carousel = () => {
  return (
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      {/* Indicators */}
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img 
            src="https://source.unsplash.com/1600x900/?anime,landscape" 
            alt="Anime Landscape 1" 
            className="d-block w-100" 
          />
        </div>
        <div className="carousel-item">
          <img 
            src="https://source.unsplash.com/1600x900/?anime,city" 
            alt="Anime City" 
            className="d-block w-100" 
          />
        </div>
        <div className="carousel-item">
          <img 
            src="https://source.unsplash.com/1600x900/?anime,fantasy" 
            alt="Anime Fantasy" 
            className="d-block w-100" 
          />
          <div className="carousel-caption">
            <img 
              src="https://source.unsplash.com/100x100/?buy" 
              alt="Buy It" 
              className="small-img" 
            />
            <img 
              src="https://source.unsplash.com/100x100/?food" 
              alt="Taste It" 
              className="small-img" 
            />
            <img 
              src="https://source.unsplash.com/100x100/?feeling" 
              alt="Feel It" 
              className="small-img" 
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  );
};

export default Carousel;
