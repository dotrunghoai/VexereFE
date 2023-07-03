import React, { Component } from "react";

export default class FooterComponent extends Component {
  render() {
    return (
      <div className="footer">
        <h5>Công ty TNHH Thương Mại Dịch Vụ VeXeRe</h5>
        <span>
          Địa chỉ đăng ký kinh doanh: 8C Chữ Đồng Tử, Phường 7, Quận Tân Bình,
          Thành Phố Hồ Chí Minh, Việt Nam
        </span>
        <span>
          Địa chỉ: Lầu 8,9, Tòa nhà CirCO, 222 Điện Biên Phủ, Quận 3, TP. Hồ Chí
          Minh, Việt Nam
        </span>
        <span>
          Giấy chứng nhận ĐKKD số 0315133726 do Sở KH và ĐT TP. Hồ Chí Minh cấp
          lần đầu ngày 27/6/2018
        </span>
        <span>Bản quyền © 2020 thuộc về VeXeRe.Com (Đỗ Trung Hoài Edited)</span>
      </div>
    );
  }
}
