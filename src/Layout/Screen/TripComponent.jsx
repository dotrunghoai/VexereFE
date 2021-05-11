import React, { Component } from "react";
import { connect } from "react-redux";
import DescriptionComponent from "../Component/DescriptionComponent";
import DetailComponent from "../Component/DetailComponent";
import FilterComponent from "../Component/FilterComponent";
import FooterComponent from "../Component/FooterComponent";
import HeaderComponent from "../Component/HeaderComponent";
import NewsComponent from "../Component/NewsComponent";
import QuestionComponent from "../Component/QuestionComponent";
import SearchComponent from "../Component/SearchComponent";
import TripInfoComponent from "../Component/TripInfoComponent";

export default class TripComponent extends Component {
  render() {
    return (
      <div>
        <SearchComponent />
        <div className="trip_content">
          <div className="container-fluid">
            <div className="row">
              <FilterComponent />
              <DetailComponent />
            </div>
          </div>
        </div>
        <QuestionComponent />
        <TripInfoComponent />
        <DescriptionComponent />
        <NewsComponent />
        <FooterComponent />
      </div>
    );
  }
}