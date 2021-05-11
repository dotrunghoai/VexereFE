import React, { Component } from "react";

export default class QuestionComponent extends Component {
  render() {
    return (
      <div className="question">
        <div className="question_sidebar">
          Những câu hỏi thường gặp về tuyến từ Hà Nội đi Sài Gòn
        </div>
        <div className="question_content">
          <div className="question_item">
            <span>Xe nào đi Sài Gòn từ Hà Nội được đánh giá tốt nhất?</span>
            <i className="fa fa-chevron-right"></i>
          </div>
          <div className="question_item">
            <span>Xe nào đi Sài Gòn từ Hà Nội giá rẻ nhất?</span>
            <i className="fa fa-chevron-right"></i>
          </div>
          <div className="question_item">
            <span>Có bao nhiêu nhà xe đi Sài Gòn từ Hà Nội hiện nay?</span>
            <i className="fa fa-chevron-right"></i>
          </div>
          <div className="question_item">
            <span>Xe đi Sài Gòn từ Hà Nội mất bao nhiêu tiếng?</span>
            <i className="fa fa-chevron-right"></i>
          </div>
          <div className="question_item">
            <span>Từ Hà Nội đi Sài Gòn dài bao nhiêu km?</span>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        <div className="clear-float"></div>
      </div>
    );
  }
}
