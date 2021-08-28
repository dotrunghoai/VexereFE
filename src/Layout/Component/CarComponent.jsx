import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { brandService, carService } from '../../Service'
import { Modal } from "react-bootstrap";
import { Field, Form, Formik } from 'formik';
import { valiCarSchema } from '../../Service/carService';
import LoadingComponent from '../Helper/LoadingComponent';

export default class CarComponent extends Component {
    state = {
        rows: [],
        isLoading: true,
        visibleModal: false,
        messContent: '',
        loadingWait: false,
        messContentComponent: '',
        classN: '',
        statusAdd: true,
        brandList: [],
        values: {
            brandID: '',
            licensePlate: '',
            numberOfSeat: ''
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            carService.fetchCar()
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
            brandService.fetchBrand()
                .then(res => {
                    this.setState({
                        brandList: res.data
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
                brandID: '',
                licensePlate: '',
                numberOfSeat: ''
            },
        })
    }
    _handleSubmit = (obj) => {
        this.setState({
            loadingWait: true
        }, () => {
            this.state.statusAdd ?
                carService.postCar(obj)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            rows: [...this.state.rows, res.data],
                            visibleModal: false,
                            messContent: '',
                            loadingWait: false,
                            messContentComponent: 'Created Car Successfully!',
                            classN: 'text-center alert alert-success'
                        })
                    })
                    .catch(err => {
                        this.setState({
                            messContent: err.response.data.message,
                            loadingWait: false
                        })
                    }) :
                carService.updateCar(obj)
                    .then(res => {
                        let carArr = [...this.state.rows]
                        const index = carArr.findIndex(item => item.licensePlate === obj.licensePlate)
                        carArr[index].numberOfSeat = obj.numberOfSeat
                        this.setState({
                            rows: carArr,
                            visibleModal: false,
                            messContent: '',
                            loadingWait: false,
                            messContentComponent: 'Updated Car Successfully!',
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
            <div className='car'>
                {
                    this.state.messContentComponent ?
                        <div className={this.state.classN}>{this.state.messContentComponent}</div> : ''
                }
                <button onClick={this._showNewModal} className="btn-primary btn btnAddNew m-2">
                    <i className="fa fa-plus mr-2"></i>
                    <span>New Car</span>
                </button>
                <Modal className='modalLogin' show={this.state.visibleModal} onHide={this._changeStatusModal}>
                    <div className="modalHeader">
                        <button onClick={this._changeStatusModal} type="button" >×</button>
                        <h5 className="modal-title">
                            {
                                this.state.statusAdd ? 'Add Car' : 'Update Car'
                            }
                        </h5>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={this.state.values}
                            validationSchema={valiCarSchema}
                            onSubmit={this._handleSubmit}
                        >
                            {
                                ({ errors, touched }) => (
                                    <Form>
                                        {
                                            this.state.messContent ?
                                                <p>{this.state.messContent}</p> : ''
                                        }
                                        <span>Brand Name</span>
                                        <Field disabled={this.state.statusAdd ? false : true} className="custom-select" as="select" name="brandID">
                                            <option value=""></option>
                                            {this.state.brandList.map((item, index) => {
                                                return (
                                                    <option key={item._id} value={item._id}>{item.brandName}</option>
                                                )
                                            })}
                                        </Field>
                                        {
                                            errors.brandID && touched.brandID ?
                                                <div className='errorInput'>{errors.brandID}</div> :
                                                <div style={{ height: '26px' }}></div>
                                        }
                                        <span>License Plate</span>
                                        <Field disabled={this.state.statusAdd ? false : true} type="text" name="licensePlate" className='form-control' placeholder='License Plate' />
                                        {
                                            errors.licensePlate && touched.licensePlate ?
                                                <div className='errorInput'>{errors.licensePlate}</div> :
                                                <div style={{ height: '26px' }}></div>
                                        }
                                        <span>Number of Seat</span>
                                        <Field type="text" name="numberOfSeat" className='form-control' placeholder='Number of Seat' />
                                        {
                                            errors.numberOfSeat && touched.numberOfSeat ?
                                                <div className='errorInput'>{errors.numberOfSeat}</div> :
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
                                )
                            }
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
                                deleteTooltip: 'Delete Car',
                                editRow: {
                                    deleteText: 'Are you sure delete this car?'
                                }
                            }
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Car',
                                onClick: (event, rowData) => {
                                    this.setState({
                                        statusAdd: false,
                                        messContent: '',
                                        messContentComponent: '',
                                        classN: '',
                                        visibleModal: true,
                                        values: {
                                            brandID: rowData.brandID._id,
                                            licensePlate: rowData.licensePlate,
                                            numberOfSeat: rowData.numberOfSeat
                                        }
                                    })
                                }
                            }
                        ]}
                        columns={[
                            { title: 'Brand Name', field: 'brandID.brandName' },
                            { title: 'License Plate', field: 'licensePlate' },
                            { title: 'Number of seat', field: 'numberOfSeat' },
                            // { title: 'Status Active', field: 'statusActive' }
                        ]}
                        data={this.state.rows}
                        title="Car Management"
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    this.setState({
                                        isLoading: true,
                                        messContentComponent: ''
                                    }, () => {
                                        carService.deleteCar(oldData.licensePlate)
                                            .then(res => {
                                                let data = [...this.state.rows]
                                                data.splice(data.indexOf(oldData), 1)
                                                this.setState({
                                                    rows: data,
                                                    isLoading: false,
                                                    messContentComponent: "Deleted Car Successfully!",
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
