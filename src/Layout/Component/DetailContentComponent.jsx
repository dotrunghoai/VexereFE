import React, { Component } from 'react'
import detail_1 from "../../images/detail_1.jpeg";
import detail_2 from "../../images/detail_2.jpeg";
import detail_3 from "../../images/detail_3.jpeg";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { tripService } from '../../Service';
import SeatComponent from './SeatComponent';
import LoadingButton from "../Helper/LoadingButton";
import { createAction } from "../../Redux/Action";
import { ADD_SUCCESS_MESS } from '../../Redux/Action/typeAction';

class DetailContentComponent extends Component {
    state = {
        display: 'none',
        selectedArr: [],
        totalPrice: 0,
        loadingWait: false,
        messContent: ''
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
    thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }
    _bookTicket = (trip) => {
        if (!this.props.userInfo.username) {
            return this.setState({
                messContent: "Bạn phải đăng nhập để đặt vé!"
            })
        }
        if (this.state.selectedArr.length === 0) {
            return this.setState({
                messContent: "Chưa có ghế nào được chọn!"
            })
        }
        this.setState({
            loadingWait: true,
        }, () => {
            tripService.bookTrip({ tripID: trip._id, arrayOfSeat: this.state.selectedArr, totalPrice: this.state.totalPrice })
                .then((res) => {
                    this.props.dispatch(createAction(ADD_SUCCESS_MESS, {
                        orderID: res.data[0]._id,
                        brandName: trip.brandName,
                        startedDate: trip.startedDate,
                        departureTime: trip.departureTime,
                        arrayOfSeat: res.data[0].arrayOfSeat,
                        totalPrice: this.state.totalPrice
                    }))
                    this.props.history.push("/message");
                    this.setState({
                        loadingWait: false,
                        messContent: ''
                    })
                })
                .catch((err) => {
                    this.setState({
                        loadingWait: false,
                        messContent: err.response.data.message
                    })
                });
        }
        );
    };
    render() {
        const { trip } = this.props
        const { departureTime, startedDate, departureProvice, arrivalProvice } = trip
        const newD = new Date(departureTime)
        const hhFrom = newD.getHours()
        const mmFrom = newD.getMinutes()
        const dateParse = new Date(startedDate).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
        const tripFilter = trip.arrayOfSeat.filter(item => item.status === 'available').length

        // //Ramdom
        const { hhTo, mmTo, star, countTrip, countHH, countMM, brandName } = trip
        // const hhTo = Math.floor(Math.random() * 13 + 10)
        // const mmTo = Math.floor(Math.random() * 49 + 10)
        // const star = (Math.random() * 4 + 1).toFixed(2)
        // const countTrip = Math.floor(Math.random() * 499 + 1)
        // const countHH = Math.floor(Math.random() * 47 + 1)
        // const countMM = Math.floor(Math.random() * 58 + 1)
        return (
            <div className="detail_item">
                <div className="detail_item_info">
                    <img src={detail_1} alt="trip" />
                    <div className="detail_item_car">
                        <span className="detail_tenhangxe">{brandName}</span>
                        <span className="detail_rate">
                            <i className="fa fa-star"></i>
                            <span>{star} ({countTrip})</span>
                        </span>
                        <p className="detail_ghengoi">Ghế ngồi {trip.arrayOfSeat.length} chỗ</p>
                        <div className="detail_range">
                            <div className="detail_range_icon">
                                <i className="fa fa-genderless detail_circle"></i>
                                <i className="fa fa-circle detail_dot"></i>
                                <i className="fa fa-circle detail_dot"></i>
                                <i className="fa fa-circle detail_dot"></i>
                                <i className="fa fa-circle detail_dot"></i>
                                <i className="fa fa-circle detail_dot"></i>
                                <i className="fa fa-map-marker-alt detail_location"></i>
                            </div>
                            <div className="detail_distance">
                                <span className="detail_timeFrom">
                                    <span>{hhFrom + ':' + mmFrom} • </span> {trip.departurePlace.stationName}
                                </span>
                                <span>{countHH + 'h' + countMM}</span>
                                <span className="detail_timeTo">
                                    <span>{hhTo + ':' + mmTo} • </span> {trip.arrivalPlace.stationName}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="detail_item_price">
                        <div className="detail_price">{trip.price + 'đ'}</div>
                        <div>Giá vé tết hiện tại chưa bao gồm phụ thu Lễ</div>
                        <div className="detail_choTrong">{tripFilter} chỗ trống</div>
                        <div>
                            <span className="detail_thongTin">Thông tin chi tiết</span>
                            <button
                                onClick={() => this._changeDisplay()}
                                className="detail_btnDatVe"
                            >
                                Đặt vé
                            </button>
                        </div>
                    </div>
                    <div className="clear-float"></div>
                </div>
                <span className="detail_warning">
                    <span className="detail_warning_icon">* </span>
                    <span className="detail_warning_text">
                        Vé chặng thuộc chuyến {hhFrom + ':' + mmFrom + ' ' + dateParse + ' ' + departureProvice + ' - ' + arrivalProvice}
                    </span>
                </span>
                <div style={{ display: this.state.display }}>
                    <div className="booking">
                        <div className="booking_step">
                            <div className="booking_step_item">
                                <span>1</span>
                                <span>Chọn chỗ</span>
                            </div>
                            <hr />
                            <div className="booking_step_item">
                                <span>2</span>
                                <span>Điểm đón trả</span>
                            </div>
                            <hr />
                            <div className="booking_step_item">
                                <span>3</span>
                                <span>Nhập thông tin</span>
                            </div>
                        </div>
                        <div className="booking_content">
                            <div className="booking_note">
                                <h6 style={{ fontWeight: '700', textDecoration: 'underline' }}>Chú thích:</h6>
                                <div className="booking_icon_availble booking_icon_item">
                                    <i className={this._icon_bed}></i>
                                    <span style={{ fontWeight: 'bold' }}>Còn trống</span>
                                </div>
                                <div className="booking_icon_booked booking_icon_item">
                                    <i className={this._icon_bed}></i>
                                    <span style={{ fontWeight: 'bold' }}>Đã đặt</span>
                                </div>
                                <div className="booking_icon_choosing booking_icon_item">
                                    <i className={this._icon_bed}></i>
                                    <span style={{ fontWeight: 'bold' }}>Đang chọn</span>
                                </div>
                            </div>
                            <div className="booking_detail">
                                <p style={{ marginLeft: '10px', fontWeight: '700' }}>TÀI XẾ</p>
                                {
                                    trip.arrayOfSeat.map((item, index) => {
                                        return (
                                            <span key={item._id} onClick={() => {
                                                if (item.status === "available") {
                                                    item.status = "choosing";
                                                    let addPrice = this.state.totalPrice;
                                                    addPrice += trip.price;
                                                    let addArr = [...this.state.selectedArr, item];
                                                    this.setState(
                                                        {
                                                            totalPrice: addPrice,
                                                            selectedArr: addArr,
                                                        });
                                                } else if (item.status === "choosing") {
                                                    item.status = "available";
                                                    let addPrice = this.state.totalPrice;
                                                    addPrice -= trip.price;
                                                    let selectedArr = [...this.state.selectedArr];
                                                    let findIndex = selectedArr.findIndex(
                                                        (seat) => seat._id === item._id
                                                    );
                                                    selectedArr.splice(findIndex, 1);
                                                    this.setState(
                                                        {
                                                            totalPrice: addPrice,
                                                            selectedArr: selectedArr,
                                                        });
                                                }
                                            }}>
                                                <SeatComponent seat={item} />
                                                {(index + 1) % 3 === 0 ? <br /> : ""}
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                {this.state.messContent ?
                                    <div className='alert alert-danger text-center my-2'>{this.state.messContent}</div> : ''}
                            </div>
                            <div className="booking_total">
                                <span>Tổng cộng:&nbsp;</span>
                                <span>{this.thousands_separators(this.state.totalPrice)}</span>
                                <span>đ</span>
                                {this.state.loadingWait ?
                                    <LoadingButton /> :
                                    <a onClick={() => this._bookTicket(trip)} className="btn btn-primary">Đặt chỗ</a>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.UserInfo.userLogin
})

export default withRouter(connect(mapStateToProps)(DetailContentComponent))