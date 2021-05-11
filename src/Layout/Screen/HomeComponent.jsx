import React, { Component } from "react";
import CarouselComponent from "../Component/CarouselComponent";
import DiscountComponent from "../Component/DiscountComponent";
import FooterComponent from "../Component/FooterComponent";
import HeaderComponent from "../Component/HeaderComponent";
import NewsComponent from "../Component/NewsComponent";
import StatisticComponent from "../Component/StatisticComponent";

export default class HomeComponent extends Component {
  render() {
    return (
      <div>
        <CarouselComponent />
        <DiscountComponent />
        <StatisticComponent />
        <NewsComponent />
        <FooterComponent />
      </div>
    );
  }
}
