import React, { Component } from "react";
import Search from "./Search";

export default class CarouselComponent extends Component {
  render() {
    return (
      <div className="carouselSelect">
        <span>VeXeRe.com - Chắc vé trong tay cho hành trình trọn vẹn</span>
        <div className="searchContent">
          <Search />
        </div>
      </div >
    );
  }
}