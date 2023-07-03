import Axios from 'axios'
import * as yup from 'yup'
import { urlGlobal } from './url';

export const valiUserSchema = yup.object().shape({
    email: yup.string().required("Email không được để trống!").email("Email không đúng định dạng!"),
    phoneNumber: yup.string().required("SĐT không được để trống!")
        .matches(/^\d+$/, 'SĐT không đúng định dạng!')
        .min(10, 'SĐT phải lớn hơn 10 chữ số!')
        .max(11, 'SĐT phải nhỏ hơn 10 chữ số!')
})

export const valiPasswordSchema = yup.object().shape({
    // oldPassword: yup.string().required("Mật khẩu cũ không được để trống!"),
    newPassword: yup.string().required("Mật khẩu không được để trống!")
        .min(6, "Mật khẩu quá ngắn!"),
    newPasswordConfirm: yup.string().required("Mật khẩu không được để trống!")
        .min(6, "Mật khẩu quá ngắn!")
})

class UserService {
    signUp = (data) => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/signup`,
            data
        })
    }
    signIn = (data) => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/signin`,
            data
        })
    }
    signOut = () => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/signout`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    fetchUser = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/user`
        })
    }
    updateUser = (data) => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/updateUser`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    updatePassword = (data) => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/updatePassword`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
}

export default UserService