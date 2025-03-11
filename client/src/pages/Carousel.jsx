import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import "../css/Carousel.css";
import carosal1 from "../images/carosal1.jpg";
import carosal2 from "../images/carosal2.jpg";
import carosal3 from "../images/carosal3.jpg";
import carosal4 from "../images/carosal4.jpg";


const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        <SwiperSlide>
          <img src={carosal1} alt="Home view 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carosal2} alt="Home view 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carosal3} alt="Home view 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carosal4} alt="Home view 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
