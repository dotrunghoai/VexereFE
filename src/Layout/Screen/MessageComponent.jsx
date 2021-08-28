import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MessageComponent extends Component {
  render() {
    const trip = this.props.infoSuccMess
    const dateParse = new Date(trip.startedDate).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
    const timeParse = new Date(trip.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    var arr = ['a', 'b', 'c'].join(', ');
    console.log(arr)
    return (
      <div className="message">
        <div className="message_icon">
          <i className="fa fa-check"></i>
        </div>
        <div className="message_content">
          <span className='thanks'>THANK YOU!</span>
          <span>Your Order Has Been Processed</span>
        </div>
        <div className="message_info">
          <div className="message_id">
            <span>Your order no is: </span>
            <span>{trip.orderID}</span>
          </div>
          <div className="message_brand">
            <span>Brand name: </span>
            <span>{trip.brandName}</span>
          </div>
          <div className="message_departureDate">
            <span>Departure date: </span>
            <span>{dateParse}</span>
          </div>
          <div className="message_departureTime">
            <span>Departure time: </span>
            <span>{timeParse}</span>
          </div>
          <div className="message_seat">
            <span>List of seat: </span>
            <span>{trip.arrayOfSeat.join(", ")}</span>
          </div>
          <div className="message_price">
            <span>Total price: </span>
            <span>{trip.totalPrice}</span>
          </div>
        </div>
        <Link to="/" className="btn-warning btn mt-2">
          Continue Search Ticket
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  infoSuccMess: state.TripInfo.infoSuccMess
})

export default connect(mapStateToProps)(MessageComponent)