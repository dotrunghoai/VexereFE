import React, { Component } from "react";
import MaterialTable from 'material-table'
import { orderService } from "../../Service";

export default class UserTicketComponent extends Component {
  state = {
    rows: [],
    isLoading: false,
    messContent: '',
    rowsPass: []
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    }, () => {
      orderService.fetchOrderFutureByUser()
        .then(res => {
          let orderArr = res.data
          for (let index = 0; index < orderArr.length; index++) {
            // const dateParse = this._getDate(orderArr[index].tripID.startedDate)
            const dateParse = new Date(orderArr[index].tripID.startedDate).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
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

      orderService.fetchOrderPassByUser()
        .then(res => {
          let orderArr = res.data
          for (let index = 0; index < orderArr.length; index++) {
            // const dateParse = this._getDate(orderArr[index].tripID.startedDate)
            const dateParse = new Date(orderArr[index].tripID.startedDate).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
            const timeParse = new Date(orderArr[index].tripID.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            orderArr[index].tripID.startedDate = dateParse
            orderArr[index].tripID.departureTime = timeParse
            orderArr[index].arrayOfSeat = orderArr[index].arrayOfSeat.join(", ")
          }
          this.setState({
            rowsPass: orderArr,
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
      <div className="userTicket">
        {
          this.state.messContent ?
            <div className={this.state.classN}>{this.state.messContent}</div> :
            ''
        }
        <ul className="nav nav-pills userTicket_header" id="pills-tab" role="tablist"> {/*mb-3*/}
          <li onClick={() => {
            this.setState({
              messContent: ''
            })
          }} className="nav-item">
            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Chuyến sắp đi</a>
          </li>
          <li onClick={() => {
            this.setState({
              messContent: ''
            })
          }} className="nav-item">
            <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Chuyến đã đi</a>
          </li>
          {/* <li onClick={() => {
            this.setState({
              messContent: ''
            })
          }} className="nav-item">
            <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Chuyến đã huỷ</a>
          </li> */}
        </ul>
        <div className="tab-content userTicket_content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
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
                  padding: 5,
                  fontSize: 12
                },
                maxBodyHeight: 600,
                cellStyle: {
                  minWidth: '125px',
                },
                loadingType: 'linear',
              }}
              localization={{
                body: {
                  deleteTooltip: 'Delete Ticket',
                  editRow: {
                    deleteText: 'Are you sure delete this order?'
                  }
                }
              }}
              columns={[
                { title: 'Departure Place', field: 'departurePlace', minWidth: 130 },
                { title: 'Arrival Place', field: 'arrivalPlace' },
                { title: 'Start Date', field: 'tripID.startedDate' },
                { title: 'Departure Time', field: 'tripID.departureTime' },
                { title: 'List Of Seat', field: 'arrayOfSeat' },
                { title: 'Brand Name', field: 'brandID.brandName' },
                { title: 'License Plate', field: 'carID.licensePlate' },
                { title: 'Total Price', field: 'totalPrice' },
              ]}
              data={this.state.rows}
              title=""
              editable={{
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    this.setState({
                      isLoading: true,
                      messContent: ''
                    }, () => {
                      orderService.deleteOrder(oldData._id)
                        .then(res => {
                          let data = [...this.state.rows]
                          data.splice(data.indexOf(oldData), 1)
                          this.setState({
                            rows: data,
                            isLoading: false,
                            messContent: 'Xoá vé thành công!!',
                            classN: 'text-center alert alert-success'
                          })
                        })
                        .catch(err => {
                          console.log(err)
                          this.setState({
                            messContent: err.response.data.message,
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
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
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
                  padding: 5,
                  fontSize: 12
                },
                maxBodyHeight: 600,
                cellStyle: {
                  minWidth: '125px',
                },
                loadingType: 'linear',
              }}
              columns={[
                { title: 'Departure Place', field: 'departurePlace', minWidth: 130 },
                { title: 'Arrival Place', field: 'arrivalPlace' },
                { title: 'Start Date', field: 'tripID.startedDate' },
                { title: 'Departure Time', field: 'tripID.departureTime' },
                { title: 'List Of Seat', field: 'arrayOfSeat' },
                { title: 'Brand Name', field: 'brandID.brandName' },
                { title: 'License Plate', field: 'carID.licensePlate' },
                { title: 'Total Price', field: 'totalPrice' },
              ]}
              data={this.state.rowsPass}
              title=""
            />
          </div>
          {/* <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            Không có chuyến nào bị huỷ.
          </div> */}
        </div>
      </div>
    );
  }
}
