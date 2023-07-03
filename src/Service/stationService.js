import Axios from 'axios'
import * as yup from 'yup'
import { urlGlobal } from './url';

export const valiStationSchema = yup.object().shape({
    stationCode: yup.string().required('Station Code không được để trống!'),
    stationName: yup.string().required('Station Name không được để trống!'),
    stationAddress: yup.string().required('Station Address không được để trống!'),
    provice: yup.string().required('Provice không được để trống!')
})

class StationService {
    fetchStation = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/station`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    postStation = (data) => {
        return Axios({
            method: 'POST',
            url: `${urlGlobal}/station`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    updateStation = (data) => {
        return Axios({
            method: 'PATCH',
            url: `${urlGlobal}/station`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    deleteStation = (stationCode) => {
        return Axios({
            method: 'DELETE',
            url: `${urlGlobal}/station?stationCode=${stationCode}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
}

export default StationService