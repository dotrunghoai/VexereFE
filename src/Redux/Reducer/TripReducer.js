import { ADD_INFO_TRIP, ADD_SUCCESS_MESS, ADD_TRIP_ARRAY } from "../Action/typeAction";

const stateTrip = {
    departureProvice: 'Hồ Chí Minh',
    arrivalProvice: 'Hà Nội',
    startedDate: new Date(new Date().setHours(0, 0, 0, 0)),
    tripArr: [],
    infoSuccMess: {}
}

export const TripReducer = (state = stateTrip, action) => {
    switch (action.type) {
        case ADD_INFO_TRIP: {
            const { departureProvice, arrivalProvice, startedDate } = action.payload
            state.departureProvice = departureProvice
            state.arrivalProvice = arrivalProvice
            state.startedDate = startedDate
            break;
        }
        case ADD_TRIP_ARRAY: {
            state.tripArr = action.payload
            break;
        }
        case ADD_SUCCESS_MESS: {
            state.infoSuccMess = action.payload
            break;
        }
        default:
            break;
    }
    return { ...state }
}