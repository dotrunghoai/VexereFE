import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { createAction } from "../../Redux/Action";
import { ADD_TOKEN } from "../../Redux/Action/typeAction";
import { userService } from "../../Service";
import { valiUserSchema } from "../../Service/userService";
import LoadingButton from "../Helper/LoadingButton";

class UserInfoComponent extends Component {
  state = {
    loadingWait: false,
    messContent: '',
    classN: ''
  }
  _handleSubmit = (obj) => {
    this.setState({
      loadingWait: true
    }, () => {
      userService.updateUser(obj)
        .then(res => {
          localStorage.setItem('SignInVeXeRe', res.data.token)
          this.props.dispatch(createAction(ADD_TOKEN, { user: res.data.newUser, token: res.data.token }))
          this.setState({
            loadingWait: false,
            messContent: 'Cập nhật thông tin thành công!',
            classN: 'text-center alert alert-success'
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            loadingWait: false,
            messContent: err.response.data.message,
            classN: 'text-center alert alert-danger'
          })
        })
    })
  }
  render() {
    return (
      <div className="userInfo">
        {
          this.state.messContent ?
            <div className={this.state.classN}>{this.state.messContent}</div> :
            ''
        }
        <Formik
          initialValues={{
            username: this.props.UserInfo.username,
            email: this.props.UserInfo.email,
            phoneNumber: this.props.UserInfo.phoneNumber
          }}
          onSubmit={this._handleSubmit}
          validationSchema={valiUserSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <span>Tên tài khoản:</span>
              <Field disabled={true} type="text" className="form-control" name='username' />
              <div style={{ height: '26px' }}></div>
              <span>Email:</span>
              <Field type="email" className="form-control" name='email' />
              {
                errors.email && touched.email ? <div className='errorInput'>{errors.email}</div> : <div style={{ height: '26px' }}></div>
              }
              <span>Số điện thoại:</span>
              <Field type="text" className="form-control" name='phoneNumber' />
              {
                errors.phoneNumber && touched.phoneNumber ? <div className='errorInput'>{errors.phoneNumber}</div> : <div style={{ height: '26px' }}></div>
              }
              <div className="text-center">
                {this.state.loadingWait ?
                  <LoadingButton /> :
                  <button type='submit' className="btn-primary btn mt-2">Lưu</button>
                }
              </div>
            </Form>
          )}
        </Formik>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state.UserInfo.userLogin
})

export default connect(mapStateToProps)(UserInfoComponent)