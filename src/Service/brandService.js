import Axios from 'axios'
import * as yup from 'yup'

export const valiBrandSchema = yup.object().shape({
    brandCode: yup.string().required('Brand Code không được để trống!'),
    brandName: yup.string().required('Brand Name không được để trống!'),
    brandAddress: yup.string().required('Brand Address không được để trống!'),
    hotline: yup.string().required('Hotline không được để trống!')
        .matches(/^\d+$/, 'SĐT không đúng định dạng!')
        .min(10, 'SĐT phải lớn hơn 10 chữ số!')
        .max(11, 'SĐT phải nhỏ hơn 10 chữ số!'),
})

class BrandService {
    fetchBrand = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/brand',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    postBrand = (data) => {
        return Axios({
            method: 'POST',
            url: 'http://vexere-hoai.herokuapp.com/brand',
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    updateBrand = (data) => {
        return Axios({
            method: 'PATCH',
            url: 'http://vexere-hoai.herokuapp.com/brand',
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    deleteBrand = (brandCode) => {
        return Axios({
            method: 'DELETE',
            url: `http://vexere-hoai.herokuapp.com/brand?brandCode=${brandCode}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
}

export default BrandService