import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { carService, stationService, tripService } from '../../Service'
import { Modal } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { valiTripSchema } from '../../Service/tripService';
import LoadingComponent from '../Helper/LoadingComponent'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default class TripAdminComponent extends Component {
    state = {
        rows: [],
        isLoading: true,
        visibleModal: false,
        messContent: '',
        loadingWait: false,
        messContentComponent: '',
        classN: '',
        statusAdd: true,
        stationList: [],
        carList: [],
        values: {
            departurePlace: '',
            arrivalPlace: '',
            startedDate: new Date(new Date().setHours(0, 0, 0, 0)),
            departureTime: '',
            carID: '',
            price: '',
            tripID: ''
        }
    }
    _getDate = (date) => {
        const dateParse = new Date(date)
        let monthNames = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];
        let day = ("0" + dateParse.getDate()).slice(-2);
        let monthIndex = dateParse.getMonth();
        let monthName = monthNames[monthIndex];
        let year = dateParse.getFullYear();
        return `${day}-${monthName}-${year}`

        // const dateParse = new Date(date).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
        // return dateParse
    }
    _getTime = (time) => {
        const timeParse = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        return timeParse
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            tripService.fetchTrip()
                .then(res => {
                    let tripArr = [...res.data]
                    for (let index = 0; index < tripArr.length; index++) {
                        tripArr[index].startedDate = this._getDate(tripArr[index].startedDate)
                        tripArr[index].departureTime = this._getTime(tripArr[index].departureTime)
                    }
                    this.setState({
                        rows: tripArr,
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        isLoading: false
                    })
                })
            stationService.fetchStation()
                .then(res => {
                    this.setState({
                        stationList: res.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            carService.fetchCar()
                .then(res => {
                    this.setState({
                        carList: res.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }
    _changeStatusModal = () => {
        this.setState({
            visibleModal: !this.state.visibleModal
        })
    }
    _showNewModal = () => {
        this.setState({
            visibleModal: !this.state.visibleModal,
            statusAdd: true,
            messContent: '',
            messContentComponent: '',
            classN: '',
            values: {
                departurePlace: '',
                arrivalPlace: '',
                startedDate: new Date(new Date().setHours(0, 0, 0, 0)),
                departureTime: new Date(),
                carID: '',
                price: '',
                tripID: ''
            },
        })
    }
    _handleSubmit = (obj) => {
        const dTime = new Date(obj.departureTime)
        const sDate = new Date(obj.startedDate);
        const yy = sDate.getFullYear();
        const mm = sDate.getMonth();
        const dd = sDate.getDate();
        const hh = dTime.getHours()
        const minute = dTime.getMinutes()
        const newDeparTime = new Date(yy, mm, dd, hh, minute, 0, 0)

        const newObj = {
            arrivalPlace: obj.arrivalPlace,
            carID: obj.carID,
            departurePlace: obj.departurePlace,
            departureTime: newDeparTime,
            price: obj.price,
            startedDate: obj.startedDate,
            tripID: obj.tripID
        }
        // console.log(newObj)
        // return
        this.setState({
            loadingWait: true
        }, () => {
            this.state.statusAdd ?
                tripService.postTrip(newObj)
                    .then(res => {
                        let resultVal = res.data
                        resultVal.startedDate = this._getDate(resultVal.startedDate)
                        resultVal.departureTime = this._getTime(resultVal.departureTime)
                        this.setState({
                            rows: [...this.state.rows, resultVal],
                            visibleModal: false,
                            messContent: '',
                            loadingWait: false,
                            messContentComponent: 'Created Trip Successfully!',
                            classN: 'text-center alert alert-success'
                        })
                    })
                    .catch(err => {
                        this.setState({
                            messContent: err.response.data.message,
                            loadingWait: false
                        })
                    }) :
                tripService.updateTrip(newObj)
                    .then(res => {
                        let tripArr = [...this.state.rows]
                        const index = tripArr.findIndex(item => item._id === newObj.tripID)
                        tripArr[index].startedDate = this._getDate(newObj.startedDate)
                        tripArr[index].departureTime = this._getTime(newObj.departureTime)
                        tripArr[index].price = newObj.price
                        this.setState({
                            rows: tripArr,
                            visibleModal: false,
                            messContent: '',
                            loadingWait: false,
                            messContentComponent: 'Updated Trip Successfully!',
                            classN: 'text-center alert alert-success'
                        })
                    })
                    .catch(err => {
                        this.setState({
                            messContent: err.response.data.message,
                            loadingWait: false
                        })
                    })
        })
    }
    render() {
        return (
            <div className='tripAdmin'>
                {
                    this.state.messContentComponent ?
                        <div className={this.state.classN}>{this.state.messContentComponent}</div> : ''
                }
                <button onClick={this._showNewModal} className="btn-primary btn btnAddNew m-2">
                    <i className="fa fa-plus mr-2"></i>
                    <span>New Trip</span>
                </button>
                <Modal className='modalLogin' show={this.state.visibleModal} onHide={this._changeStatusModal}>
                    <div className="modalHeader">
                        <button onClick={this._changeStatusModal} type="button" >×</button>
                        <h5 className="modal-title">
                            {
                                this.state.statusAdd ? 'Add Trip' : 'Update Trip'
                            }
                        </h5>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={this.state.values}
                            // validationSchema={valiTripSchema}
                            onSubmit={this._handleSubmit}
                        >
                            {({ values, errors, touched, setFieldValue }) => (
                                <Form>
                                    {
                                        this.state.messContent ?
                                            <p>{this.state.messContent}</p> : ''
                                    }
                                    <span>Departure Place</span>
                                    <Field disabled={this.state.statusAdd ? false : true} className="custom-select" as="select" name="departurePlace">
                                        <option value=""></option>
                                        {this.state.stationList.map((item, index) => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.stationName}</option>
                                            )
                                        })}
                                    </Field>
                                    {
                                        errors.departurePlace && touched.departurePlace ?
                                            <div className='errorInput'>{errors.departurePlace}</div> :
                                            <div style={{ height: '26px' }}></div>
                                    }
                                    <span>Arrival Place</span>
                                    <Field disabled={this.state.statusAdd ? false : true} className="custom-select" as="select" name="arrivalPlace">
                                        <option value=""></option>
                                        {this.state.stationList.map((item, index) => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.stationName}</option>
                                            )
                                        })}
                                    </Field>
                                    {
                                        errors.arrivalPlace && touched.arrivalPlace ?
                                            <div className='errorInput'>{errors.arrivalPlace}</div> :
                                            <div style={{ height: '26px' }}></div>
                                    }

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <div className="row">
                                            <div className="col-7">
                                                <span>Start Date</span>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    format="dd-MMM-yyyy"
                                                    value={values.startedDate}
                                                    onChange={(d) => {
                                                        setFieldValue("startedDate", new Date(d.setHours(0, 0, 0, 0)))
                                                    }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    minDate={new Date()}
                                                />
                                                {
                                                    errors.startedDate && touched.startedDate ?
                                                        <div className='errorInput'>{errors.startedDate}</div> :
                                                        <div style={{ height: '26px' }}></div>
                                                }
                                            </div>
                                            <div className="col-5">
                                                <span>Departure Time</span>
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    format="HH:mm"
                                                    value={values.departureTime}
                                                    onChange={(d) => {
                                                        setFieldValue("departureTime", d)
                                                    }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                                {
                                                    errors.departureTime && touched.departureTime ?
                                                        <div className='errorInput'>{errors.departureTime}</div> :
                                                        <div style={{ height: '26px' }}></div>
                                                }
                                            </div>
                                        </div>
                                    </MuiPickersUtilsProvider>
                                    <span>Car</span>
                                    <Field disabled={this.state.statusAdd ? false : true} className="custom-select" as="select" name="carID">
                                        <option value=""></option>
                                        {this.state.carList.map((item, index) => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.licensePlate}</option>
                                            )
                                        })}
                                    </Field>
                                    {
                                        errors.carID && touched.carID ?
                                            <div className='errorInput'>{errors.carID}</div> :
                                            <div style={{ height: '26px' }}></div>
                                    }
                                    <span>Price</span>
                                    <Field type="text" name="price" className='form-control' placeholder='Price' />
                                    {
                                        errors.price && touched.price ?
                                            <div className='errorInput'>{errors.price}</div> :
                                            <div style={{ height: '26px' }}></div>
                                    }
                                    <div className="text-center mt-3">
                                        {
                                            this.state.loadingWait ?
                                                <LoadingComponent /> :
                                                <button type="submit" className=" btn btn-primary">Save</button>
                                        }
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal>

                <div className="admin_table">
                    <MaterialTable
                        isLoading={this.state.isLoading}
                        options={{
                            sorting: true,
                            search: true,
                            exportButton: true,
                            paging: false,
                            emptyRowsWhenPaging: true,
                            headerStyle: {
                                position: 'sticky',
                                top: 0,
                                backgroundColor: 'teal',
                                color: 'white',
                                border: "1px solid white",
                                padding: 5
                            },
                            maxBodyHeight: 600,
                            cellStyle: {
                                minWidth: '125px',
                            },
                            loadingType: 'linear'
                        }}
                        localization={{
                            body: {
                                deleteTooltip: 'Delete Trip',
                                editRow: {
                                    deleteText: 'Are you sure delete this trip?'
                                }
                            }
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Trip',
                                onClick: (event, rowData) => {
                                    const getTime = rowData.departureTime.toString()
                                    const hh = getTime.substring(0, 2)
                                    const mm = getTime.substring(3, 5)
                                    this.setState({
                                        statusAdd: false,
                                        messContent: '',
                                        messContentComponent: '',
                                        classN: '',
                                        visibleModal: true,
                                        values: {
                                            departurePlace: rowData.departurePlace._id,
                                            arrivalPlace: rowData.arrivalPlace._id,
                                            startedDate: new Date(rowData.startedDate),
                                            departureTime: new Date(2020, 1, 1, hh, mm),
                                            carID: rowData.carID._id,
                                            price: rowData.price,
                                            tripID: rowData._id
                                        }
                                    })
                                }
                            }
                        ]}
                        columns={[
                            { title: 'Departure Place', field: 'departurePlace.stationName' },
                            { title: 'Arrival Place', field: 'arrivalPlace.stationName' },
                            { title: 'Start Date', field: 'startedDate' },
                            { title: 'Departure Time', field: 'departureTime' },
                            // { title: 'Array Of Seat', field: 'arrayOfSeat' },
                            { title: 'Car', field: 'carID.licensePlate' },
                            { title: 'Price', field: 'price' },
                            // { title: 'Status Active', field: 'statusActive' },
                        ]}
                        data={this.state.rows}
                        title="Trip Management"
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    this.setState({
                                        isLoading: true,
                                        messContentComponent: ''
                                    }, () => {
                                        tripService.deleteTrip(oldData._id)
                                            .then(res => {
                                                let data = [...this.state.rows]
                                                data.splice(data.indexOf(oldData), 1)
                                                this.setState({
                                                    rows: data,
                                                    isLoading: false,
                                                    messContentComponent: "Deleted Trip Successfully!",
                                                    classN: 'text-center alert alert-success',
                                                })
                                            })
                                            .catch(err => {
                                                console.log(err)
                                                this.setState({
                                                    messContentComponent: err.response.data.message,
                                                    classN: 'text-center alert alert-danger',
                                                    isLoading: false
                                                })
                                            })
                                        resolve();
                                    })
                                }),
                        }}
                    />
                </div>
            </div>
        )
    }
}
