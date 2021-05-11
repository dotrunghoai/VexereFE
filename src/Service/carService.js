import Axios from 'axios'
import * as yup from 'yup'

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
            url: 'http://vexere-hoai.herokuapp.com/car',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    postCar = (data) => {
        return Axios({
            method: 'POST',
            url: 'http://vexere-hoai.herokuapp.com/car',
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    updateCar = (data) => {
        return Axios({
            method: 'PATCH',
            url: 'http://vexere-hoai.herokuapp.com/car',
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    deleteCar = (licensePlate) => {
        return Axios({
            method: 'DELETE',
            url: `http://vexere-hoai.herokuapp.com/car?licensePlate=${licensePlate}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
}

export default CarService