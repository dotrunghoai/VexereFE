import React, { Component } from "react";
import CountUp from "react-countup";
import Brand1 from "../../images/Brand1.jpg";
import Brand2 from "../../images/Brand2.jpg";
import Brand3 from "../../images/Brand3.jpg";
import Brand4 from "../../images/Brand4.jpg";

export default class StatisticComponent extends Component {
  render() {
    return (
      <div className="statistic">
        <h4>Hệ thống vé xe khách và vé xe limousine lớn nhất Việt Nam</h4>
        <div className="statistic_content">
          <div className="statistic_item">
            <img
              src="https://storage.googleapis.com/fe-production/svgIcon/static-icon-1.svg"
              alt="tuyen duong"
            />
            <div className="statistic_detail">
              <h3>
                <CountUp end={5000} />+
              </h3>
              <span>Tuyến đường</span>
            </div>
          </div>
          <div className="statistic_item">
            <img
              src="https://storage.googleapis.com/fe-production/svgIcon/static-icon-2.svg"
              alt="nha xe"
            />
            <div className="statistic_detail">
              <h3>
                <CountUp end={2000} />+
              </h3>
              <span>Nhà xe</span>
            </div>
          </div>
          <div className="statistic_item">
            <img
              src="https://storage.googleapis.com/fe-production/svgIcon/static-icon-3.svg"
              alt="dai ly ban ve"
            />
            <div className="statistic_detail">
              <h3>
                <CountUp end={5000} />+
              </h3>
              <span>Đại lý bán vé</span>
            </div>
          </div>
          <div className="statistic_item">
            <img
              src="https://storage.googleapis.com/fe-production/svgIcon/static-icon-4.svg"
              alt="ben xe"
            />
            <div className="statistic_detail">
              <h3>
                <CountUp end={400} />+
              </h3>
              <span>Bến xe</span>
            </div>
          </div>
          <div className="clear-float"></div>
        </div>
        <h4 className="brandInfo">Bến xe khách</h4>
        <div className="brand_content">
          <div className="brand_item">
            <img src={Brand1} alt="BXMĐ" />
            <h6>Bến xe Miền Đông</h6>
          </div>
          <div className="brand_item">
            <img src={Brand2} alt="BXGL" />
            <h6>Bến xe Gia Lâm</h6>
          </div>
          <div className="brand_item">
            <img src={Brand3} alt="BXNN" />
            <h6>Bến xe Nước Ngầm</h6>
          </div>
          <div className="brand_item">
            <img src={Brand4} alt="BXMĐ" />
            <h6>Bến xe Mỹ Đình</h6>
          </div>
        </div>
      </div>
    );
  }
}
