import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { carService, stationService } from '../../Service'
import { Modal } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { valiStationSchema } from '../../Service/stationService';
import LoadingComponent from '../Helper/LoadingComponent'

const ProviceList = [
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
    { Title: "Đà Nẵng" },
    { Title: "Đắk Lắk" },
    { Title: "Đắk Nông" },
    { Title: "Điện Biên" },
    { Title: "Đồng Nai" },
    { Title: "Đồng Tháp" },
    { Title: "Gia Lai" },
    { Title: "Hà Giang" },
    { Title: "Hà Nam" },
    { Title: "Hà Nội" },
    { Title: "Hà Tây" },
    { Title: "Hà Tĩnh" },
    { Title: "Hải Dương" },
    { Title: "Hải Phòng" },
    { Title: "Hòa Bình" },
    { Title: "Hồ Chí Minh" },
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

export default class StationComponent extends Component {
    state = {
        rows: [],
        isLoading: true,
        visibleModal: false,
        messContent: '',
        loadingWait: false,
        statusAdd: true,
        messContentComponent: '',
        values: {
            stationCode: '',
            stationName: '',
            stationAddress: '',
            provice: ''
        },
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            stationService.fetchStation()
                .then(res => {
                    this.setState({
                        rows: res.data,
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        isLoading: false
                    })
                })
        })
    }
    _changeStatusModal = () => {
        this.setState({
            visibleModal: !this.state.visibleModal
        })
    }
    _handleSubmit = (obj) => {
        this.setState({
            loadingWait: true
        }, () => {
            this.state.statusAdd ?
                stationService.postStation(obj)
                    .then(res => {
                        this.setState({
                            rows: [...this.state.rows, res.data],
                            visibleModal: false,
                            messContent: '',
                            loadingWait: false
                        })
                    })
                    .catch(err => {
                        this.setState({
                            messContent: err.response.data.message,
                            loadingWait: false
                        })
                    }) :
                stationService.updateStation(obj)
                    .then(res => {
                        let stationArr = [...this.state.rows]
                        const index = stationArr.findIndex(item => item.stationCode === obj.stationCode)
                        stationArr[index].stationName = obj.stationName
                        stationArr[index].stationAddress = obj.stationAddress
                        stationArr[index].provice = obj.provice
                        this.setState({
                            rows: stationArr,
                            visibleModal: false,
                            messContent: '',
                            loadingWait: false
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
    _showNewModal = () => {
        this.setState({
            visibleModal: !this.state.visibleModal,
            statusAdd: true,
            messContent: '',
            messContentComponent: '',
            values: {
                stationCode: '',
                stationName: '',
                stationAddress: '',
                provice: ''
            },
        })
    }
    render() {
        return (
            <div className='station'>
                {
                    this.state.messContentComponent ?
                        <div className="text-center alert alert-danger">{this.state.messContentComponent}</div> : ''
                }
                <button onClick={this._showNewModal} className="btn-primary btn btnAddNew m-2">
                    <i className="fa fa-plus mr-2"></i>
                    <span>New Station</span>
                </button>

                <Modal className='modalLogin' show={this.state.visibleModal} onHide={this._changeStatusModal}>
                    <div className="modalHeader">
                        <button onClick={this._changeStatusModal} type="button" >×</button>
                        <h5 className="modal-title">
                            {
                                this.state.statusAdd ? 'Add Station' : 'Update Station'
                            }
                        </h5>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={this.state.values}
                            validationSchema={valiStationSchema}
                            onSubmit={this._handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    {
                                        this.state.messContent ?
                                            <p>{this.state.messContent}</p> : ''
                                    }
                                    <span>Station Code</span>
                                    <Field disabled={this.state.statusAdd ? false : true} type="text" name="stationCode" className="form-control" placeholder='Station Code' />
                                    {
                                        errors.stationCode && touched.stationCode ? <div className='errorInput'>{errors.stationCode}</div> : <div style={{ height: '26px' }}></div>
                                    }
                                    <span>Station Name</span>
                                    <Field type="text" name="stationName" className='form-control' placeholder='Station Name' />
                                    {
                                        errors.stationName && touched.stationName ? <div className='errorInput'>{errors.stationName}</div> : <div style={{ height: '26px' }}></div>
                                    }
                                    <span>Station Address</span>
                                    <Field type="text" name="stationAddress" className='form-control' placeholder='Station Address' />
                                    {
                                        errors.stationAddress && touched.stationAddress ? <div className='errorInput'>{errors.stationAddress}</div> : <div style={{ height: '26px' }}></div>
                                    }
                                    <span>Provice</span>
                                    {/* <Field type="text" name="provice" className='form-control' placeholder='Provice' /> */}
                                    <Field className="custom-select" as="select" name="provice" >
                                        <option value=""></option>
                                        {ProviceList.map((item, index) => {
                                            return (
                                                <option key={item.Title} value={item.Title}>{item.Title}</option>
                                            )
                                        })}
                                    </Field>
                                    {
                                        errors.provice && touched.provice ? <div className='errorInput'>{errors.provice}</div> : <div style={{ height: '26px' }}></div>
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
                                deleteTooltip: 'Delete Station',
                                editRow: {
                                    deleteText: 'Are you sure delete this station?'
                                }
                            }
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Station',
                                onClick: (event, rowData) => {
                                    this.setState({
                                        statusAdd: false,
                                        messContent: '',
                                        messContentComponent: '',
                                        visibleModal: true,
                                        values: {
                                            stationCode: rowData.stationCode,
                                            stationName: rowData.stationName,
                                            stationAddress: rowData.stationAddress,
                                            provice: rowData.provice
                                        }
                                    })
                                }
                            }
                        ]}
                        columns={[
                            { title: 'Station Code', field: 'stationCode' },
                            { title: 'Station Name', field: 'stationName' },
                            { title: 'Station Address', field: 'stationAddress' },
                            { title: 'Provice', field: 'provice' },
                            // { title: 'Status Active', field: 'statusActive' }
                        ]}
                        data={this.state.rows}
                        title="Station Management"
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    this.setState({
                                        isLoading: true,
                                        messContentComponent: ''
                                    }, () => {
                                        stationService.deleteStation(oldData.stationCode)
                                            .then(res => {
                                                let data = [...this.state.rows]
                                                data.splice(data.indexOf(oldData), 1)
                                                this.setState({
                                                    rows: data,
                                                    isLoading: false
                                                })
                                            })
                                            .catch(err => {
                                                console.log(err)
                                                this.setState({
                                                    messContentComponent: err.response.data.message,
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
