import Axios from 'axios';
import * as yup from 'yup';
import { urlGlobal } from './url';

export const valiTripSchema = yup.object().shape({
    departurePlace: yup.string().required("Departure Place không được để trống!"),
    arrivalPlace: yup.string().required("Arrival Place không được để trống!"),
    startedDate: yup.date().required('Start Date chưa được chọn!'),
    departureTime: yup.date().required('Departure Time chưa được chọn!'),
    carID: yup.string().required('Car chưa được chọn!'),
    price: yup.string().required('Price không được để trống!')
        .matches(/^\d+$/, 'Price không đúng định dạng!'),
})

class TripService {
    fetchTrip = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/alltrip`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    postTrip = (data) => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/trip`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    updateTrip = (data) => {
        return Axios({
            method: 'PATCH',
            url: `${urlGlobal}/trip`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    deleteTrip = (tripID) => {
        return Axios({
            method: 'DELETE',
            url: `${urlGlobal}/trip?tripID=${tripID}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    bookTrip = (data) => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/bookTrip`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    fetchTripByProvice = (data) => {
        const encodeDepar = encodeURIComponent(data.departureProvice)
        const encodeArr = encodeURIComponent(data.arrivalProvice)
        const encodeStart = encodeURIComponent(data.startedDate)
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/tripByProvice?departureProvice=${encodeDepar}&arrivalProvice=${encodeArr}&startedDate=${encodeStart}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
}

export default TripService