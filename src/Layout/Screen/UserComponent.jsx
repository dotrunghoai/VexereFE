import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Link, NavLink, Route, Switch, withRouter } from "react-router-dom";
import { createAction } from "../../Redux/Action";
import { DELETE_USER } from "../../Redux/Action/typeAction";
import { userService } from "../../Service";
import UserInfoComponent from "../Component/UserInfoComponent";
import UserPassword from "../Component/UserPassword";
import UserTicketComponent from "../Component/UserTicketComponent";

class UserComponent extends Component {
  _signOut = () => {
    this.props.dispatch(createAction(DELETE_USER));
    this.props.history.push('/')
    userService.signOut().then(res => {
      localStorage.removeItem('SignInVeXeRe')
    }).catch(console.log)
  }
  render() {
    return (
      <div className="user">
        <div className="user_title">
          <Link to="/">Trang chủ {">"} </Link>
          <span>Quản lý thẻ</span>
        </div>
        <div className="user_content">
          <BrowserRouter>
            <div className="user_sidebar">
              <NavLink exact activeStyle={{ color: 'rgb(24, 97, 197)' }} to='/user'>
                <i className="fa fa-address-card"></i>
                <span>Thông tin tài khoản</span>
              </NavLink>
              <NavLink exact activeStyle={{ color: 'rgb(24, 97, 197)' }} to='/user/upassword'>
                <i className="fa fa-key"></i>
                <span>Cập nhật mật khẩu</span>
              </NavLink>
              <NavLink exact activeStyle={{ color: 'rgb(24, 97, 197)' }} to='/user/ticket'>
                <i className="fa fa-warehouse"></i>
                <span>Vé của tôi</span>
              </NavLink>
              <a onClick={this._signOut}>
                <i className="fa fa-sign-out-alt"></i>
                <span>Đăng xuất</span>
              </a>
            </div>
            <div className="user_body">
              <Switch>
                <Route path='/user/ticket' component={UserTicketComponent} />
                <Route path='/user/upassword' component={UserPassword} />
                <Route path='/user' component={UserInfoComponent} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(UserComponent))