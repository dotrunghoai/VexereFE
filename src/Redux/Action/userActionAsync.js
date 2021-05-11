import { createAction } from "."
import { userService } from "../../Service"
import { ADD_TOKEN, ADD_USER } from "./typeAction"
import jwt from 'jsonwebtoken'

export const signUpAsync = (data, callback) => {
    return (dispatch) => {
        userService.signUp(data)
            .then(res => {
                // dispatch(createAction(ADD_USER, res.data))
                callback()
            })
            .catch(err => {
                if (err.response) {
                    // console.log('data', err.response.data);
                    // console.log('status', err.response.status);
                    // console.log('headers', err.response.headers);
                    callback(err.response.data.message)
                }
            })
    }
}

export const signInAsync = (data, callback) => {
    return (dispatch) => {
        userService.signIn(data)
            .then(res => {
                const decoded = jwt.verify(res.data, "vexereJWT");
                dispatch(createAction(ADD_TOKEN, { token: res.data, user: decoded.user }))
                localStorage.setItem('SignInVeXeRe', res.data)
                callback(decoded.user)
            })
            .catch(err => {
                if (err.response) {
                    callback(undefined, err.response.data.message)
                }
            })
    }
}