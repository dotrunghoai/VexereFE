import React, { Component } from "react";
import DiscountImage1 from "../../images/discount1.png";
import DiscountImage2 from "../../images/discount2.png";
import DiscountImage3 from "../../images/discount3.png";
import DiscountImage4 from "../../images/discount4.png";
import DiscountImage5 from "../../images/discount5.png";

import "bootstrap/dist/css/bootstrap.min.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import "./owl.css";

export default class DiscountComponent extends Component {
  state = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
    },
  };
  render() {
    return (
      <div className="discount">
        <h4>Ưu đãi nổi bật</h4>
        <div className="container-fluid discount_carousel">
          <OwlCarousel
            responsive={this.state.responsive}
            items={3}
            className="owl-theme"
            loop
            nav
            margin={8}
          >
            <div className="discount_item">
              <img className="img" src={DiscountImage1} />
            </div>
            <div className="discount_item">
              <img className="img" src={DiscountImage2} />
            </div>
            <div className="discount_item">
              <img className="img" src={DiscountImage3} />
            </div>
            <div className="discount_item">
              <img className="img" src={DiscountImage4} />
            </div>
            <div className="discount_item">
              <img className="img" src={DiscountImage5} />
            </div>
            <div className="discount_item">
              <img className="img" src={DiscountImage1} />
            </div>
            <div className="discount_item">
              <img className="img" src={DiscountImage2} />
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}
