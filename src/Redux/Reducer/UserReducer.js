import { ADD_TOKEN, ADD_USER, DELETE_USER } from "../Action/typeAction";

const stateUser = {
    userLogin: {},
    token: ''
}

export const UserReducer = (state = stateUser, action) => {
    switch (action.type) {
        case ADD_USER: {
            state.userLogin = action.payload
            break;
        }
        case DELETE_USER: {
            state.userLogin = {}
            state.token = ''
            break
        }
        case ADD_TOKEN: {
            state.userLogin = action.payload.user
            state.token = action.payload.token
            break
        }
        default:
            break;
    }
    return { ...state }
}