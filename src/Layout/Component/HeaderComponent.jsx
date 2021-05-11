import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createAction } from "../../Redux/Action";
import { DELETE_USER } from "../../Redux/Action/typeAction";
import { signInAsync, signUpAsync } from "../../Redux/Action/userActionAsync";
// import { userService } from "../../Service";
import LoadingComponent from "../Helper/LoadingComponent";
import { Modal } from "react-bootstrap";
import { userService } from "../../Service";
// import jwt from 'jsonwebtoken'

class HeaderComponent extends Component {
  state = {
    statusSignin: true,
    values: {
      username: '',
      password: '',
      email: '',
      phoneNumber: ''
    },
    errors: {
      username: '',
      password: '',
      email: '',
      phoneNumber: ''
    },
    messContent: '',
    loading: false,
    visibleModal: false,
    statusDropdown: 'none',
    disableBtnSignIn: true,
    cursorBtnSignIn: 'not-allowed',
    disableBtnSignUp: true,
    cursorBtnSignUp: 'not-allowed'
  };
  _changeStatus = () => {
    this.setState({
      statusSignin: !this.state.statusSignin,
    });
  };
  _handleChange = (evt) => {
    this.setState({
      values: { ...this.state.values, [evt.target.name]: evt.target.value }
    }, () => {
      if (this.state.values.username && this.state.values.password.length > 4) {
        this.setState({
          disableBtnSignIn: false,
          cursorBtnSignIn: 'pointer'
        })
      } else {
        this.setState({
          disableBtnSignIn: true,
          cursorBtnSignIn: 'not-allowed'
        })
      }

      if (this.state.values.username && this.state.values.password.length > 4 && this.state.values.email && this.state.values.phoneNumber) {
        this.setState({
          disableBtnSignUp: false,
          cursorBtnSignUp: 'pointer'
        })
      } else {
        this.setState({
          disableBtnSignUp: true,
          cursorBtnSignUp: 'not-allowed'
        })
      }
    })
  }
  _handleBlur = (evt) => {
    const errorMess = this._checkValidate(evt.target.name, evt.target.value)
    this.setState({
      errors: { ...this.state.errors, [evt.target.name]: errorMess }
    })
  }
  _checkValidate = (name, value) => {
    let contentErr = ''
    if (name === 'username') {
      if (value === '') {
        contentErr = 'Username không được để trống!'
      }
    }
    if (name === 'password') {
      if (value === '') {
        contentErr = 'Password không được để trống!'
      } else if (value.length < 5) {
        contentErr = 'Password phải lớn hơn 5 kí tự!'
      }
    }
    if (name === 'email') {
      if (value === '') {
        contentErr = 'Email không được để trống!'
      } else if (
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
      ) {
        contentErr = "Email không hợp lệ !";
      }
    }
    if (name === 'phoneNumber') {
      if (value === '') {
        contentErr = 'Số điện thoại không được để trống!'
      } else if (!/^\d+$/.test(value)) {
        contentErr = "Số điện thoại không hợp lệ !";
      }
    }
    return contentErr
  }
  _renderError = (errorVal) => {
    if (errorVal !== '') {
      return <div className='errorInput'>{errorVal}</div>
    }
    return <div style={{ height: '26px' }}></div>
  }
  _signUp = () => {
    this.setState({
      loading: true
    }, () => {
      this.props.dispatch(signUpAsync(this.state.values, (mess) => {
        if (mess) {
          this.setState({
            messContent: mess,
            loading: false
          })
        } else {
          this.props.dispatch(signInAsync(this.state.values, () => {
            this.setState({
              messContent: '',
              visibleModal: false,
              loading: false
            })
          }))
        }
      }))
    })
  }
  _signIn = () => {
    this.setState({
      loading: true,
      modalHidden: 'true'
    }, () => {
      this.props.dispatch(signInAsync(this.state.values, (user, mess) => {
        if (mess) {
          this.setState({
            messContent: mess,
            loading: false
          })
        } else {
          this.setState({
            messContent: '',
            visibleModal: false,
            loading: false
          })
        }
      }))
    })
  }
  _pushRouter = () => {
    this._changeStatusDropdown();
    if (this.props.userInfo.role === 'admin') {
      this.props.history.push('/admin')
    } else {
      this.props.history.push('/user')
    }
  }
  _signOut = () => {
    this.props.dispatch(createAction(DELETE_USER));
    this._changeStatusDropdown();
    this.props.history.push('/')
    userService.signOut().then(res => {
      localStorage.removeItem('SignInVeXeRe')
    }).catch(console.log)
  }
  _changeStatusModal = () => {
    this.setState({
      visibleModal: !this.state.visibleModal
    })
  }
  _changeStatusDropdown = () => {
    let statusDrop = ''
    if (this.state.statusDropdown === 'none') {
      statusDrop = 'block'
    } else {
      statusDrop = 'none'
    }
    this.setState({
      statusDropdown: statusDrop
    })
  }
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light header">
        <Link className="navbar-brand" to="/">
          <img src="https://storage.googleapis.com/fe-production/icon_vxr_full.svg" alt="vexere" />
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li>
              <a href="https://tokhaiyte.vn/" target="blank">Tờ khai y tế</a>
            </li>
            <li>
              <Link to="/">Vé xe Tết</Link>
            </li>
            <li>
              <Link to="/">Quản lý vé</Link>
            </li>
            <li className="header_lang">
              <Link to="/">
                <span>EN</span>
                <img src="https://storage.googleapis.com/fe-production/images/english_icon.png" alt="english vexere" />
              </Link>
            </li>
            <li className="header_hotline">
              <Link to="/">
                <i className="fa fa-phone"></i>
                <span>Hotline</span>
              </Link>
            </li>
            <li className="header_btnLogin">
              {
                this.props.userInfo.username ?
                  <button className="btnDropdown" onClick={this._changeStatusDropdown} >
                    <i className="fa fa-user-circle"></i>
                    <span className='spanHello'>Hello</span>
                    <span className='spanUsername'>{this.props.userInfo.username}</span>
                  </button> :
                  <button className='btnDangNhap' onClick={this._changeStatusModal}>
                    <i className="fa fa-user-circle"></i>
                    <span>Đăng Nhập</span>
                  </button>
              }
              <div style={{ display: this.state.statusDropdown }} className="header_dropmenu dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div onClick={this._pushRouter} className="header_dropItem dropdown-item">
                  <i className="fa fa-user-circle"></i>
                  <a >Quản lý thẻ</a>
                </div>
                <div onClick={() => this._signOut()} className="header_dropItem dropdown-item" >
                  <i className="fa fa-sign-out-alt"></i>
                  <span>Logout</span>
                </div>
              </div>
            </li>
            <Modal className='modalLogin' show={this.state.visibleModal} onHide={this._changeStatusModal}>
              <div className="modalHeader">
                <button onClick={this._changeStatusModal} type="button" >×</button>
                <h5 className="modal-title">Login</h5>
              </div>
              <div className="modal-body">
                {
                  this.state.messContent ?
                    <p>{this.state.messContent}</p> : ''
                }

                <span>Username</span>
                <input name='username' value={this.state.values.username} onChange={this._handleChange} onBlur={this._handleBlur} placeholder="Enter your username..." type="text" className="form-control" />
                {this._renderError(this.state.errors.username)}
                <span className="mt-1 d-inline-block">Password</span>
                <input name='password' value={this.state.values.password} onChange={this._handleChange} onBlur={this._handleBlur} placeholder="Enter your password..." type="password" className="form-control" />
                {this._renderError(this.state.errors.password)}

                {this.state.statusSignin ? (
                  <></>
                ) : (
                  <div>
                    <span className="mt-1 d-inline-block">Email</span>
                    <input name='email' value={this.state.values.email} onChange={this._handleChange} onBlur={this._handleBlur} placeholder="Enter your email..." type="text" className="form-control" />
                    {this._renderError(this.state.errors.email)}
                    <span className="mt-1 d-inline-block">Phone Number</span>
                    <input name='phoneNumber' value={this.state.values.phoneNumber} onChange={this._handleChange} onBlur={this._handleBlur} placeholder="Enter your phone number..." type="text" className="form-control" />
                    {this._renderError(this.state.errors.phoneNumber)}
                  </div>
                )}
                {this.state.loading ?
                  <LoadingComponent /> :
                  this.state.statusSignin ?
                    <button disabled={this.state.disableBtnSignIn} style={{ cursor: this.state.cursorBtnSignIn }} onClick={() => this._signIn()} className="btn w-100 mt-3 btnSignin">Sign in</button> :
                    <button disabled={this.state.disableBtnSignUp} style={{ cursor: this.state.cursorBtnSignUp }} onClick={() => this._signUp()} className="btn w-100 mt-3 btnSignin">Sign up</button>
                }
                <div className="separate">
                  <hr />
                  <span className="mx-2">or</span>
                  <hr />
                </div>
                <button className="btn btn-primary w-100 mt-4">
                  Sign in with Facebook
                    </button>
                <div className="mt-4">
                  <span>
                    {this.state.statusSignin
                      ? "Do not have an account ?"
                      : "Do you have an account ?"}
                  </span>
                  <span className="mx-3 btnSignup" onClick={() => this._changeStatus()} >
                    {this.state.statusSignin ? "Sign up" : "Sign in"}
                  </span>
                </div>
              </div>
            </Modal>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.UserInfo.userLogin
})

export default withRouter(connect(mapStateToProps)(HeaderComponent))