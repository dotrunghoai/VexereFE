import Axios from 'axios'
import * as yup from 'yup'
import { urlGlobal } from './url';

export const valiCarSchema = yup.object().shape({
    brandID: yup.string().required("Brand Name không được để trống!"),
    licensePlate: yup.string().required("License Plate không được để trống!"),
    numberOfSeat: yup.string().required('Number of seat không được để trống!')
        .matches(/^\d+$/, 'Number of seat không đúng định dạng!'),
})

class CarService {
    fetchCar = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/car`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    postCar = (data) => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/car`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    updateCar = (data) => {
        return Axios({
            method: 'PATCH',
            url: `${urlGlobal}/car`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    deleteCar = (licensePlate) => {
        return Axios({
            method: 'DELETE',
            url: `${urlGlobal}/car?licensePlate=${licensePlate}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
}

export default CarService