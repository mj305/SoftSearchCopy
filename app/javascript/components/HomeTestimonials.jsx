import React from "react";
import Slider from "react-slick";

const HomeTestimonials  = () => {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>        
        <Slider {...settings}>
          <div>
           
            <div class="card-slideshow" width="250px">
              <div class="card-body">
                  <img class = "card-img" src="assets/ruby.png"/>
                  <h5 class="card-title">Name</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          
          </div>
          <div>
            <div class="card-slideshow" width="250px">
              <div class="card-body">
                  <img class = "card-img" src="assets/ruby.png"/>
                  <h5 class="card-title">Name</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div>
            <div class="card-slideshow" width="250px">
              <div class="card-body">
                  <img class = "card-img" src="assets/ruby.png"/>
                  <h5 class="card-title">Name</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div>
            <div class="card-slideshow" width="250px">
              <div class="card-body">
                  <img class = "card-img" src="assets/ruby.png"/>
                  <h5 class="card-title">Name</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div>
            <div class="card-slideshow" width="250px">
              <div class="card-body">
                  <img class = "card-img" src="assets/ruby.png"/>
                  <h5 class="card-title">Name</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          
        </Slider>
      </div>
    );
};

export default HomeTestimonials;