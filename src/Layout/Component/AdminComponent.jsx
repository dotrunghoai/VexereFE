import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import BrandComponent from "./BrandComponent";
import CarComponent from "./CarComponent";
import DashboardComponent from "./DashboardComponent";
import OrderComponent from "./OrderComponent";
import OverView from "./OverView";
import SidebarAdmin from "./SidebarAdmin";
import StationComponent from "./StationComponent";
import TripAdminComponent from "./TripAdminComponent";
import UserAdminComponent from "./UserAdminComponent";

import DataTable from 'material-table'

export default class AdminComponent extends Component {
  state = {
    tranX: '0%',
    maxWidthContent: 3000,
    maxHeightSidebar: 1000
  }
  _changeTranXTo0 = () => {
    if (window.innerWidth < 768) {
      this.setState({
        tranX: '-100%'
      })
    } else {
      this.setState({
        tranX: '0%'
      })
    }
  }
  _changeStatus = () => {
    if (window.innerWidth < 768) {
      let valTranX = '0%'
      if (this.state.tranX === '0%') {
        valTranX = '-100%'
      } else {
        valTranX = '0%'
      }
      this.setState({
        tranX: valTranX
      })
    }
  }
  componentDidMount() {
    if (window.innerWidth < 768) {
      this.setState({
        tranX: '-100%'
      })
    }
    //----------------
    let maxWidthStart = 0
    if (window.innerWidth > 768) {
      maxWidthStart = window.innerWidth - 240
    } else {
      maxWidthStart = window.innerWidth - 20
    }
    this.setState({
      maxWidthContent: maxWidthStart
    })
    window.addEventListener('resize', () => {
      let valTranX = '0%'
      if (window.innerWidth < 768) {
        valTranX = '-100%'
      } else {
        valTranX = '0%'
      }
      this.setState({
        tranX: valTranX
      })
      //--------------
      this._changeTranXTo0()
      let maxWidthResize = 0
      if (window.innerWidth > 768) {
        maxWidthResize = window.innerWidth - 240
      } else {
        maxWidthResize = window.innerWidth - 20
      }
      this.setState({
        maxWidthContent: maxWidthResize
      })
    })
    this._changeTranXTo0()
    this.setState({
      maxHeightSidebar: window.innerHeight - 65.48
    })
  }
  render() {
    const dataSourceAdmin = [
      {
        title: 'Overview',
        path: '/admin',
        icon: <i className="fa fa-chart-bar fa_IconHead"></i>
      },
      {
        title: 'Gridview',
        path: '',
        icon: <i className="fa fa-table fa_IconHead"></i>,
        subMenu: [
          {
            title: 'Brand',
            path: '/admin/brand',
            icon: <i className="fa fa-code-branch"></i>
          },
          {
            title: 'Car',
            path: '/admin/car',
            icon: <i className="fa fa-car"></i>
          },
          {
            title: 'Station',
            path: '/admin/station',
            icon: <i className="fa fa-map-marker-alt"></i>
          },
          {
            title: 'Trip',
            path: '/admin/trip',
            icon: <i className="fa fa-grip-horizontal"></i>
          },
          {
            title: 'Order',
            path: '/admin/order',
            icon: <i className="fa fa-ticket-alt"></i>
          },
          {
            title: 'User',
            path: '/admin/user',
            icon: <i className="fa fa-user-edit"></i>
          }
        ]
      }
    ]
    return (
      <BrowserRouter>
        <div className="admin">
          <div className='admin_sidebar' style={{ transform: `translateX(${this.state.tranX})`, minHeight: this.state.maxHeightSidebar }}>
            {
              dataSourceAdmin.map((item, index) => {
                return <SidebarAdmin changeTranXTo0={this._changeTranXTo0} item={item} key={index} />
              })
            }
            <div onClick={() => this._changeStatus()} className='btn-Close'>
              <span >X</span>
            </div>
          </div>
          <div className="admin_content" style={{ maxWidth: this.state.maxWidthContent }}>
            <Switch>
              {/* <Route path='/admin/overview' component={OverView} /> */}
              <Route path='/admin/brand' component={BrandComponent} />
              <Route path='/admin/car' component={CarComponent} />
              <Route path='/admin/station' component={StationComponent} />
              <Route path='/admin/trip' component={TripAdminComponent} />
              <Route path='/admin/order' component={OrderComponent} />
              <Route path='/admin/user' component={UserAdminComponent} />
              <Route path='/admin' component={OverView} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
