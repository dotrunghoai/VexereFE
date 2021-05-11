import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NewsComponent extends Component {
  render() {
    return (
      <div className="news">
        <div className="news_item news_item_1">
          <h5>Tin tức</h5>
          <NavLink to="/">
            Xe giường nằm Limousine – đỉnh cao mới của ngành xe khách
          </NavLink>
          <NavLink to="/">
            Xe limousine đi Vũng Tàu: Tổng hợp top 6 xe chất lượng cao
          </NavLink>
          <NavLink to="/">
            Review xe limousine đi Đà Lạt: những câu hỏi thường gặp
          </NavLink>
          <NavLink to="/">
            Xe limousine đi Sapa: Tổng hợp top các hãng xe chất lượng cao
          </NavLink>
        </div>
        <div className="news_item news_item_2">
          <h5>Tuyến đường</h5>
          <NavLink to="/">Xe đi Buôn Mê Thuột từ Sài Gòn</NavLink>
          <NavLink to="/">Xe đi Vũng Tàu từ Sài Gòn</NavLink>
          <NavLink to="/">Xe đi Nha Trang từ Sài Gòn</NavLink>
          <NavLink to="/">Xe đi Đà Lạt từ Sài Gòn</NavLink>
          <NavLink to="/">Xe đi Sapa từ Hà Nội</NavLink>
          <NavLink to="/">Xe đi Hải Phòng từ Hà Nội</NavLink>
          <NavLink to="/">Xe đi Vinh từ Hà Nội</NavLink>
        </div>
        <div className="news_item news_item_3">
          <h5>Xe Limousine</h5>
          <NavLink to="/">Xe Limousine đi Đà Lạt từ Sài Gòn</NavLink>
          <NavLink to="/">Xe Limousine đi Vũng Tàu từ Sài Gòn</NavLink>
          <NavLink to="/">Xe Limousine đi Nha Trang từ Sài Gòn</NavLink>
          <NavLink to="/">Xe Limousine đi Hải Phòng từ Hà Nội</NavLink>
          <NavLink to="/">Xe Limousine đi Hạ Long từ Hà Nội</NavLink>
          <NavLink to="/">Xe Limousine đi Sapa Từ Hà Nội</NavLink>
          <NavLink to="/">Xe Limousine đi Quảng Ninh từ Hà Nội</NavLink>
        </div>
        <div className="news_item news_item_border news_item_4">
          <h5>Bến xe</h5>
          <NavLink to="/">Bến xe Miền Đông</NavLink>
          <NavLink to="/">Bến xe Trung tâm Đà Nẵng</NavLink>
          <NavLink to="/">Bến xe Gia Lâm</NavLink>
          <NavLink to="/">Bến xe Mỹ Đình</NavLink>
          <NavLink to="/">Bến xe An Sương</NavLink>
          <NavLink to="/">Bến xe Nước Ngầm</NavLink>
          <NavLink to="/">Bến xe Miền Tây</NavLink>
        </div>
        <div className="news_item news_item_5 news_item_border">
          <h5>Nhà xe</h5>
          <div className="news_item_5_content">
            <div className="news_item_5_detail">
              <NavLink to="/">Xe Sao Việt</NavLink>
              <NavLink to="/">Xe Taxi Hoa Mai</NavLink>
              <NavLink to="/">Xe Hạ Long Travel</NavLink>
              <NavLink to="/">Xe Quốc Đạt</NavLink>
              <NavLink to="/">Xe Thanh Bình Xanh</NavLink>
              <NavLink to="/">Xe Thiện Thành limousine</NavLink>
              <NavLink to="/">Xe Hồng Sơn Phú Yên</NavLink>
              <NavLink to="/">Xe Tiến Oanh</NavLink>
            </div>
            <div className="news_item_5_detail">
              <NavLink to="/">Xe Hải Âu</NavLink>
              <NavLink to="/">Xe Queen Cafe</NavLink>
              <NavLink to="/">Xe Hưng Long</NavLink>
              <NavLink to="/">Xe Xuân Tráng Limousine</NavLink>
              <NavLink to="/">Xe Nam Á Châu</NavLink>
              <NavLink to="/">Xe Khanh Phong</NavLink>
              <NavLink to="/">Xe An Anh (Quê Hương)</NavLink>
              <NavLink to="/">Xe Minh Quốc</NavLink>
            </div>
            <div className="news_item_5_detail">
              <NavLink to="/">Xe Văn Minh</NavLink>
              <NavLink to="/">Xe Quang Nghị</NavLink>
              <NavLink to="/">Xe Xuân Trường</NavLink>
              <NavLink to="/">Xe Hạnh Cafe</NavLink>
              <NavLink to="/">Xe Trọng Minh</NavLink>
              <NavLink to="/">Xe Ngọc Ánh Sài Gòn</NavLink>
              <NavLink to="/">Xe Hoa Mai</NavLink>
              <NavLink to="/">Xe Thuận Tiến</NavLink>
            </div>
          </div>
        </div>
        <div className="news_item news_item_6">
          <h5>Về chúng tôi</h5>
          <NavLink to="/">Phần mềm nhà xe</NavLink>
          <NavLink to="/">Phần mềm đại lý</NavLink>
          <NavLink to="/">Giới Thiệu VeXeRe.com</NavLink>
          <NavLink to="/">Tuyển dụng</NavLink>
          <NavLink to="/">Tin tức</NavLink>
          <NavLink to="/">Liên hệ</NavLink>
        </div>
        <div className="news_item news_item_7">
          <h5>Hỗ trợ</h5>
          <NavLink to="/">Hướng dẫn thanh toán</NavLink>
          <NavLink to="/">Quy chế VeXeRe.com</NavLink>
          <NavLink to="/">Chính sách bảo mật thông tin</NavLink>
          <NavLink to="/">Chính sách bảo mật thanh toán</NavLink>
          <NavLink to="/">
            Chính sách và quy trình giải quyết tranh chấp, khiếu nại
          </NavLink>
          <NavLink to="/">Câu hỏi thường gặp</NavLink>
          <NavLink to="/">Phần mềm hãng xe</NavLink>
          <NavLink to="/">Tra cứu đơn hàng</NavLink>
        </div>
        <div className="news_item news_item_8">
          <h5>Chứng nhận</h5>
          <div className="mb-2">
            <img
              src="https://storage.googleapis.com/fe-production/images/Home/certificate0.png"
              alt=""
            />
          </div>
          <div className="mb-2">
            <img
              src="https://storage.googleapis.com/fe-production/images/Home/certificate1.png"
              alt=""
            />
          </div>
          <div className="mb-2">
            <img
              src="https://storage.googleapis.com/fe-production/images/dangkybocongthuong.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://storage.googleapis.com/fe-production/images/dangkybocongthuong.png"
              alt=""
            />
          </div>
        </div>
        <div className="news_item news_item_9">
          <h5>Tải ứng dụng VeXeRe</h5>
          <div className="mb-2">
            <img
              width="150px"
              src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/AP-icon.png?v=2"
              alt=""
            />
          </div>
          <div>
            <img
              width="150px"
              src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/GP-icon.png?v=2"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}
