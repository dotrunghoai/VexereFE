import React, { Component } from "react";
import { connect } from "react-redux";
import DetailContentComponent from "./DetailContentComponent";
import NotFoundTrip from '../../images/NotFoundTrip.png'

class DetailComponent extends Component {
  componentDidMount() {
    // console.log(this.props.tripInfo)
  }
  state = {
    display: "none",
  };
  _changeDisplay() {
    let val = "none";
    if (this.state.display === "none") {
      val = "block";
    }
    this.setState({
      display: val,
    });
  }
  render() {
    return (
      <div className="detail">
        {
          this.props.tripArr.length === 0 ?
            <div className='detail_fail text-center'>
              <h4 className="mb-5 detail_title">Vé xe đi từ {this.props.departureProvice} đến {this.props.arrivalProvice}: 0 chuyến</h4>
              <img width='70%' src={NotFoundTrip} alt="" />
              <p style={{ marginTop: 10, fontSize: '25px', fontWeight: 500, marginBottom: 10 }}>Chuyến đang cập nhật</p>
              <p className='mb-0'>Hiện tại VeXeRe.com chưa có thông tin nhà xe đi từ {this.props.departureProvice} đến {this.props.arrivalProvice} vào ngày {new Date(this.props.startedDate).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}.</p>
              <span>Xin quý khách vui lòng chọn ngày đi khác hoặc tuyến đường khác.</span>
            </div> :
            <>
              <h4 className="mb-5 detail_title">
                Vé xe đi từ {this.props.departureProvice} đến {this.props.arrivalProvice}: {this.props.tripArr.length} chuyến
              </h4>
              <div className="d-flex detail_filter">
                <span className="font-weight-bold mr-5">Sắp xếp theo:</span>
                <span className="mr-5">Giờ sớm nhất</span>
                <span className="mr-5">Giờ muộn nhất</span>
                <span className="mr-5">Giá thấp nhất</span>
                <span>Giá cao nhất</span>
              </div>
              <div className="detail_content">
                {
                  this.props.tripArr.map((item, index) => {
                    return <DetailContentComponent trip={item} key={item._id} />
                  })
                }
              </div>
            </>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tripInfo: state.TripInfo.stateTrip,
  tripArr: state.TripInfo.tripArr,
  departureProvice: state.TripInfo.departureProvice,
  arrivalProvice: state.TripInfo.arrivalProvice,
  startedDate: state.TripInfo.startedDate
})

export default connect(mapStateToProps)(DetailComponent)