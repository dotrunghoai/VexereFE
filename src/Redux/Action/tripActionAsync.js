import { createAction } from "."
import { tripService } from "../../Service"
import { ADD_TRIP_ARRAY } from "./typeAction"

export const fetchTripAsync = (data, callback) => {
    return (dispatch) => {
        tripService.fetchTripByProvice(data)
            .then(res => {
                dispatch(createAction(ADD_TRIP_ARRAY, res.data))
                callback()
            })
            .catch(err => {
                if (err.response) {
                    callback(err.response.data.message)
                }
            })
    }
}