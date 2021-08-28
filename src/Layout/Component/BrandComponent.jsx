import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { brandService } from '../../Service'
import { Modal } from "react-bootstrap";
import { Field, Form, Formik } from 'formik';
import { valiBrandSchema } from '../../Service/brandService';
import LoadingComponent from '../Helper/LoadingComponent';

export default class BrandComponent extends Component {
    state = {
        rows: [],
        isLoading: false,
        visibleModal: false,
        messContent: '',
        loadingWait: false,
        values: {
            brandCode: '',
            brandName: '',
            brandAddress: '',
            hotline: ''
        },
        statusAdd: true,
        messContentComponent: '',
        classN: ''
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            brandService.fetchBrand()
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
                brandService.postBrand(obj)
                    .then(res => {
                        this.setState({
                            rows: [...this.state.rows, res.data],
                            visibleModal: false,
                            messContent: '',
                            loadingWait: false,
                            messContentComponent: 'Created Brand Successfully!',
                            classN: 'text-center alert alert-success'
                        })
                    })
                    .catch(err => {
                        this.setState({
                            messContent: err.response.data.message,
                            loadingWait: false
                        })
                    }) :
                brandService.updateBrand(obj)
                    .then(res => {
                        let brandArr = [...this.state.rows]
                        const index = brandArr.findIndex(item => item.brandCode === obj.brandCode)
                        brandArr[index].brandName = obj.brandName
                        brandArr[index].brandAddress = obj.brandAddress
                        brandArr[index].hotline = obj.hotline
                        this.setState({
                            rows: brandArr,
                            visibleModal: false,
                            messContent: '',
                            loadingWait: false,
                            messContentComponent: 'Updated Brand Successfully!',
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
    _showNewModal = () => {
        this.setState({
            visibleModal: !this.state.visibleModal,
            statusAdd: true,
            messContent: '',
            messContentComponent: '',
            classN: '',
            values: {
                brandCode: '',
                brandName: '',
                brandAddress: '',
                hotline: ''
            },
        })
    }
    render() {
        return (
            <div className='brand'>
                {
                    this.state.messContentComponent ?
                        <div className={this.state.classN}>{this.state.messContentComponent}</div> : ''
                }
                <button onClick={this._showNewModal} className="btn-primary btn btnAddNew m-2">
                    <i className="fa fa-plus mr-2"></i>
                    <span>New Brand</span>
                </button>
                <Modal className='modalLogin' show={this.state.visibleModal} onHide={this._changeStatusModal} >
                    <div className="modalHeader">
                        <button onClick={this._changeStatusModal} type="button" >×</button>
                        <h5 className="modal-title">
                            {
                                this.state.statusAdd ? 'Add Brand' : 'Update Brand'
                            }
                        </h5>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={this.state.values}
                            validationSchema={valiBrandSchema}
                            onSubmit={this._handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    {
                                        this.state.messContent ?
                                            <p>{this.state.messContent}</p> : ''
                                    }
                                    <span>Brand Code</span>
                                    <Field disabled={this.state.statusAdd ? false : true} type="text" name="brandCode" className="form-control" id="brandCode" placeholder='Brand Code' />
                                    {
                                        errors.brandCode && touched.brandCode ? <div className='errorInput'>{errors.brandCode}</div> : <div style={{ height: '26px' }}></div>
                                    }
                                    <span>Brand Name</span>
                                    <Field type="text" name="brandName" className='form-control' id="brandName" placeholder='Brand Name' />
                                    {
                                        errors.brandName && touched.brandName ? <div className='errorInput'>{errors.brandName}</div> : <div style={{ height: '26px' }}></div>
                                    }
                                    <span>Brand Address</span>
                                    <Field type="text" name="brandAddress" className='form-control' id="brandAddress" placeholder='Brand Address' />
                                    {
                                        errors.brandAddress && touched.brandAddress ? <div className='errorInput'>{errors.brandAddress}</div> : <div style={{ height: '26px' }}></div>
                                    }
                                    <span>Hotline</span>
                                    <Field type="text" name="hotline" className='form-control' id="hotline" placeholder='Hotline' />
                                    {
                                        errors.hotline && touched.hotline ? <div className='errorInput'>{errors.hotline}</div> : <div style={{ height: '26px' }}></div>
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
                            loadingType: 'linear',
                        }}
                        localization={{
                            body: {
                                deleteTooltip: 'Delete Brand',
                                editRow: {
                                    deleteText: 'Are you sure delete this brand?'
                                }
                            }
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Brand',
                                onClick: (event, rowData) => {
                                    this.setState({
                                        statusAdd: false,
                                        messContent: '',
                                        messContentComponent: '',
                                        classN: '',
                                        visibleModal: true,
                                        values: {
                                            brandCode: rowData.brandCode,
                                            brandName: rowData.brandName,
                                            brandAddress: rowData.brandAddress,
                                            hotline: rowData.hotline
                                        }
                                    })
                                }
                            }
                        ]}
                        columns={[
                            { title: 'Brand Code', field: 'brandCode', maxWidth: '50px', editable: 'never' },
                            { title: 'Brand Name', field: 'brandName' },
                            { title: 'Brand Address', field: 'brandAddress' },
                            { title: 'Hotline', field: 'hotline' },
                            // { title: 'Status Active', field: 'statusActive', editable: 'never' },
                        ]}
                        data={this.state.rows}
                        title="Brand Management"
                        editable={{
                            // onRowAdd: newData =>
                            //     new Promise((resolve, reject) => {
                            //         setTimeout(() => {
                            //             this.setState({
                            //                 rows: [...this.state.rows, newData]
                            //             })
                            //             resolve();
                            //         }, 1000)
                            //     }),
                            // onRowUpdate: (newData, oldData) =>
                            //     new Promise((resolve, reject) => {
                            //         setTimeout(() => {
                            //             let dataUpdate = [...this.state.rows];
                            //             const index = oldData.tableData.id;
                            //             dataUpdate[index] = newData;
                            //             console.log(newData)
                            //             this.setState({
                            //                 rows: dataUpdate
                            //             })
                            //             resolve();
                            //         }, 1000)
                            //     }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    this.setState({
                                        isLoading: true,
                                        messContentComponent: ''
                                    }, () => {
                                        brandService.deleteBrand(oldData.brandCode)
                                            .then(res => {
                                                let data = [...this.state.rows]
                                                data.splice(data.indexOf(oldData), 1)
                                                this.setState({
                                                    rows: data,
                                                    isLoading: false,
                                                    messContentComponent: "Deleted Brand Successfully!",
                                                    classN: 'text-center alert alert-success',
                                                })
                                            })
                                            .catch(err => {
                                                console.log(err)
                                                this.setState({
                                                    messContentComponent: err.response.data.message,
                                                    classN: 'text-center alert alert-danger',
                                                    isLoading: false,
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