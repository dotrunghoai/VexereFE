import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { orderService } from '../../Service'

export default class OrderComponent extends Component {
    state = {
        rows: [],
        isLoading: true
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
    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            orderService.fetchOrder()
                .then(res => {
                    let orderArr = res.data
                    for (let index = 0; index < orderArr.length; index++) {
                        const dateParse = this._getDate(orderArr[index].tripID.startedDate)
                        const timeParse = new Date(orderArr[index].tripID.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        orderArr[index].tripID.startedDate = dateParse
                        orderArr[index].tripID.departureTime = timeParse
                        orderArr[index].arrayOfSeat = orderArr[index].arrayOfSeat.join(", ")
                    }
                    this.setState({
                        rows: orderArr,
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
    render() {
        return (
            <div className='order'>
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
                        columns={[
                            { title: 'Username', field: 'userID.username' },
                            { title: 'Email', field: 'userID.email' },
                            { title: 'Phone Number', field: 'userID.phoneNumber' },
                            { title: 'Departure Place', field: 'departurePlace' },
                            { title: 'Arrival Place', field: 'arrivalPlace' },
                            { title: 'Start Date', field: 'tripID.startedDate' },
                            { title: 'Departure Time', field: 'tripID.departureTime' },
                            { title: 'List Of Seat', field: 'arrayOfSeat' },
                            { title: 'Brand Name', field: 'brandID.brandName' },
                            { title: 'License Plate', field: 'carID.licensePlate' }
                        ]}
                        data={this.state.rows}
                        title="Order Management"
                    />
                </div>
            </div>
        )
    }
}
