import React from 'react';
import Slider from 'react-slick';

// Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  // Function to generate placeholder image URL using Placeholder.com
  const getPlaceholderImageUrl = () => {
    return `https://via.placeholder.com/300x200?text=Credit+Card`;
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="card-placeholder"
            style={{ borderRadius: '5px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
          >
            <img src={getPlaceholderImageUrl()} alt={`Card ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardCarousel;
