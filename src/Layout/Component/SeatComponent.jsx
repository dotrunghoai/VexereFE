import React, { Component } from "react";

export default class SeatComponent extends Component {
    render() {
        const { seat } = this.props;
        return (
            <>
                <button
                    disabled={seat.status === "booked" ? true : false}
                    style={{
                        color:
                            seat.status === "available"
                                ? "black"
                                : seat.status === "choosing"
                                    ? "blue"
                                    : "red",
                        cursor: seat.status === "booked" ? "not-allowed" : "pointer",
                        borderRadius: "10px",
                    }}
                    className="fa fa-table seatItem"
                ></button>
            </>
        );
    }
}
