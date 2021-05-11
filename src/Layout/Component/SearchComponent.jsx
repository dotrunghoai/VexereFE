import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { connect } from "react-redux";

class SearchComponent extends Component {
  state = {
    date: new Date(),
  };
  render() {
    return (
      <div className="search">
        <div className="search_content">
          <Link className="vexekhach" to="/">
            Vé xe khách
          </Link>
          <span className="xeditu">{" >"} xe đi từ {this.props.departureProvice} đến {this.props.arrivalProvice}</span>
          <Search />
          <div className="datvede mt-3">
            <span>Bạn đặt vé xe để</span>
            <button>Du lịch</button>
            <button>Về quê</button>
            <button>Công tác</button>
            <button className="datvede_send">Gửi</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  departureProvice: state.TripInfo.departureProvice,
  arrivalProvice: state.TripInfo.arrivalProvice,
})

export default connect(mapStateToProps)(SearchComponent)