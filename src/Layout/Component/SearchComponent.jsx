import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { connect } from "react-redux";

class SearchComponent extends Component {
  state = {
    date: new Date(),
    isDuLich: false,
    isVeQue: false,
    isCongTac: false
  };
  _changeStatus = (para) => {
    if (para === 'isDuLich') {
      this.setState({
        isDuLich: !this.state.isDuLich
      })
    } else if (para === 'isVeQue') {
      this.setState({
        isVeQue: !this.state.isVeQue
      })
    } else if (para === 'isCongTac') {
      this.setState({
        isCongTac: !this.state.isCongTac
      })
    }
  }
  render() {
    //{  }
    return (
      <div className="search">
        <div className="search_content">
          <div className='search_content_head'>
            <Link className="vexekhach" to="/">Vé xe khách</Link>
            <span className="xeditu">{" >"} xe đi từ {this.props.departureProvice} đến {this.props.arrivalProvice}</span>
          </div>
          <Search />
          <div className="datvede mt-3">
            <span>Bạn đặt vé xe để</span>
            <button onClick={() => this._changeStatus('isDuLich')} style={this.state.isDuLich ? { backgroundColor: '#0060C4', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>Du lịch</button>
            <button onClick={() => this._changeStatus('isVeQue')} style={this.state.isVeQue ? { backgroundColor: '#0060C4', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>Về quê</button>
            <button onClick={() => this._changeStatus('isCongTac')} style={this.state.isCongTac ? { backgroundColor: '#0060C4', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>Công tác</button>
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