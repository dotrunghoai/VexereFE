import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSearch from "../Helper/LoadingSearch";
import { createAction } from '../../Redux/Action';
import { ADD_INFO_TRIP } from '../../Redux/Action/typeAction';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchTripAsync } from '../../Redux/Action/tripActionAsync';
import { Portal } from "react-overlays"

const CalendarContainer = ({ children }) => {
    const el = document.getElementById("calendar-portal");

    return <Portal container={el}>{children}</Portal>;
};

const ProviceList = [
    { Title: "Hà Nội" },
    { Title: "Hồ Chí Minh" },
    { Title: "Đà Nẵng" },
    { Title: "An Giang" },
    { Title: "Bạc Liêu" },
    { Title: "Bắc Kạn" },
    { Title: "Bắc Giang" },
    { Title: "Bắc Ninh" },
    { Title: "Bến Tre" },
    { Title: "Bình Dương" },
    { Title: "Bình Định" },
    { Title: "Bình Phước" },
    { Title: "Bình Thuận" },
    { Title: "Cà Mau" },
    { Title: "Cao Bằng" },
    { Title: "Cần Thơ" },
    { Title: "Đắk Lắk" },
    { Title: "Đắk Nông" },
    { Title: "Điện Biên" },
    { Title: "Đồng Nai" },
    { Title: "Đồng Tháp" },
    { Title: "Gia Lai" },
    { Title: "Hà Giang" },
    { Title: "Hà Nam" },
    { Title: "Hà Tây" },
    { Title: "Hà Tĩnh" },
    { Title: "Hải Dương" },
    { Title: "Hải Phòng" },
    { Title: "Hòa Bình" },
    { Title: "Hậu Giang" },
    { Title: "Huế" },
    { Title: "Hưng Yên" },
    { Title: "Khánh Hòa" },
    { Title: "Kiên Giang" },
    { Title: "Kon Tum" },
    { Title: "Lai Châu" },
    { Title: "Lào Cai" },
    { Title: "Lạng Sơn" },
    { Title: "Lâm Đồng" },
    { Title: "Long An" },
    { Title: "Nam Định" },
    { Title: "Nghệ An" },
    { Title: "Ninh Bình" },
    { Title: "Ninh Thuận" },
    { Title: "Phú Thọ" },
    { Title: "Phú Yên" },
    { Title: "Quảng Bình" },
    { Title: "Quảng Nam" },
    { Title: "Quảng Ngãi" },
    { Title: "Quảng Ninh" },
    { Title: "Quảng Trị" },
    { Title: "Sóc Trăng" },
    { Title: "Sơn La" },
    { Title: "Tây Ninh" },
    { Title: "Thái Bình" },
    { Title: "Thái Nguyên" },
    { Title: "Thanh Hóa" },
    { Title: "Tiền Giang" },
    { Title: "Trà Vinh" },
    { Title: "Tuyên Quang" },
    { Title: "Vĩnh Long" },
    { Title: "Vĩnh Phúc" },
    { Title: "Vũng Tàu" },
    { Title: "Yên Bái" },
]

class Search extends Component {
    state = {
        date: new Date(),
        loadingWait: false,
    };
    _handleSubmit = (obj) => {
        this.setState({
            loadingWait: true
        }, () => {
            this.props.dispatch(fetchTripAsync(obj, () => {
                this.setState({
                    loadingWait: false
                }, () => {
                    this.props.dispatch(createAction(ADD_INFO_TRIP, obj))
                    this.props.history.push(`/trip?departureProvice=${obj.departureProvice}&arrivalProvice=${obj.arrivalProvice}&startedDate=${obj.startedDate}`)
                })
            }))
        })
    }
    render() {
        return (
            <div className="carousel_input">
                <Formik
                    initialValues={{
                        departureProvice: this.props.departureProvice,
                        arrivalProvice: this.props.arrivalProvice,
                        startedDate: this.props.startedDate
                    }}
                    onSubmit={this._handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="carousel_from">
                                <Field className="carousel_fromInput" as="select" name="departureProvice">
                                    {
                                        ProviceList.map((item, index) => {
                                            return <option key={item.Title} value={item.Title}>{item.Title}</option>
                                        })
                                    }
                                </Field>
                                <i className="fa fa_icon fa-map-marker-alt"></i>
                            </div>
                            <div className="carousel_to">
                                <Field className="carousel_toInput" as="select" name="arrivalProvice">
                                    {
                                        ProviceList.map((item, index) => {
                                            return <option key={item.Title} value={item.Title}>{item.Title}</option>
                                        })
                                    }
                                </Field>
                                <i className="fa fa_icon fa-map-marker-alt"></i>
                            </div>
                            <div className="carousel_date">
                                <DatePicker
                                    className="carousel_dateInput"
                                    selected={values.startedDate}
                                    popperContainer={CalendarContainer}
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(d) => {
                                        setFieldValue("startedDate", d)
                                    }}
                                    minDate={new Date()}
                                />
                                <i className="fa fa_icon fa-calendar-alt"></i>
                            </div>
                            {
                                this.state.loadingWait ?
                                    <LoadingSearch /> :
                                    <button type='submit' className="carousel_search">TÌM KIẾM VÉ</button>
                            }
                            <div onClick={() => {
                                const depart = values.departureProvice
                                const arrival = values.arrivalProvice
                                values.departureProvice = arrival
                                values.arrivalProvice = depart
                                this.setState({
                                    values: {
                                        departureProvice: arrival,
                                        arrivalProvice: depart
                                    }
                                })
                            }} className="carousel_exchange">
                                <i className="fa fa_swap fa-exchange-alt"></i>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    departureProvice: state.TripInfo.departureProvice,
    arrivalProvice: state.TripInfo.arrivalProvice,
    startedDate: state.TripInfo.startedDate
})

export default withRouter(connect(mapStateToProps)(Search))