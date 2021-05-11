import { Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { userService } from '../../Service'
import LoadingButton from '../Helper/LoadingButton'
import { valiPasswordSchema } from "../../Service/userService";

export default class UserPassword extends Component {
    state = {
        loadingWait: false,
        messContent: '',
        classN: ''
    }
    _handleSubmit = (obj) => {
        if (obj.newPassword !== obj.newPasswordConfirm) {
            return this.setState({
                messContent: "Xác nhận mật khẩu không trùng khớp!",
                classN: 'text-center alert alert-danger'
            })
        }
        this.setState({
            loadingWait: true
        }, () => {
            userService.updatePassword({ password: obj.newPassword })
                .then(res => {
                    this.setState({
                        loadingWait: false,
                        messContent: 'Cập nhật mật khẩu thành công!',
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
            <div className='user_password'>
                {
                    this.state.messContent ?
                        <div className={this.state.classN}>{this.state.messContent}</div> :
                        ''
                }
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        newPasswordConfirm: ''
                    }}
                    onSubmit={this._handleSubmit}
                    validationSchema={valiPasswordSchema}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {/* <span>Mật khẩu cũ</span>
                            <Field type='password' name='oldPassword' className='form-control' />
                            {
                                errors.oldPassword && touched.oldPassword ? <div className='errorInput'>{errors.oldPassword}</div> : <div style={{ height: '26px' }}></div>
                            } */}
                            <span>Mật khẩu mới</span>
                            <Field type='password' name='newPassword' className='form-control' />
                            {
                                errors.newPassword && touched.newPassword ? <div className='errorInput'>{errors.newPassword}</div> : <div style={{ height: '26px' }}></div>
                            }
                            <span>Xác nhận mật khẩu</span>
                            <Field type='password' name='newPasswordConfirm' className='form-control' />
                            {
                                errors.newPasswordConfirm && touched.newPasswordConfirm ? <div className='errorInput'>{errors.newPasswordConfirm}</div> : <div style={{ height: '26px' }}></div>
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
            </div>
        )
    }
}
