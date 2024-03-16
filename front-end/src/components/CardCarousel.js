import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';
import { useQuery } from '@apollo/client';

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
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                <div className="card-placeholder">
                    <h3>Card 1</h3>
                </div>
                <div className="card-placeholder">
                    <h3>Card 2</h3>
                </div>
                <div className="card-placeholder">
                    <h3>Card 3</h3>
                </div>
                <div className="card-placeholder">
                    <h3>Card 4</h3>
                </div>
                <div className="card-placeholder">
                    <h3>Card 5</h3>
                </div>
            </Slider>
        </div>
    );
};

export default CardCarousel;
