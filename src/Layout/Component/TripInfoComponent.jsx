import React, { Component } from "react";

export default class TripInfoComponent extends Component {
  render() {
    return (
      <div className="tripInfo">
        <div className="tripInfo_route">
          <h6>Thông tin tuyến đường Hà Nội đi Sài Gòn</h6>
          <div className="tripInfo_route_content">
            <div className="tripInfo_route_item">
              <span>Chiều dài tuyến đường</span>
              <span>1709 km</span>
            </div>
            <div className="tripInfo_route_item">
              <span>Thời gian di chuyển</span>
              <span>35.4 giờ</span>
            </div>
            <div className="tripInfo_route_item">
              <span>Giá vé trung bình</span>
              <span>770.833 VNĐ</span>
            </div>
            <div className="tripInfo_route_item">
              <span>Số lượng chuyến xe</span>
              <span>24 chuyến</span>
            </div>
            <div className="tripInfo_route_item">
              <span>Số lượng nhà xe</span>
              <span>10 nhà xe</span>
            </div>
          </div>
        </div>
        <div className="tripInfo_time">
          <h6>
            Đặt vé xe khách, xe Limousine các hãng xe từ Hà Nội đến Sài Gòn
          </h6>
          <div className="tripInfo_time_content">
            <div className="tripInfo_brand">
              <p>NHÀ XE</p>
              <p>Tín Nghĩa</p>
              <p>Hoàng Long - Hà Nội</p>
              <p>Hoàng Long</p>
              <p>Mai Linh</p>
            </div>
            <div className="tripInfo_price">
              <p>GIÁ VÉ</p>
              <p>700.000 đ</p>
              <p>700.000 đ</p>
              <p>720.000 đ</p>
              <p>1.430.000 đ</p>
            </div>
            <div className="tripInfo_departureTime">
              <p>GIỜ CHẠY</p>
              <p>09h00, 13h00, 18h00, 21h00</p>
              <p>08h00, 14h00, 20h00</p>
              <p>21h30, 18h00</p>
              <p>11h00, 17h00</p>
            </div>
            <div className="clear-float"></div>
          </div>
        </div>
      </div>
    );
  }
}
