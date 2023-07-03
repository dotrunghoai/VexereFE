import Axios from 'axios'
import { urlGlobal } from './url';

class OrderService {
    fetchOrder = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/order`
        })
    }
    fetchOrderFutureByUser = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/orderFutureByUser`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    fetchOrderPassByUser = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/orderPassByUser`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    deleteOrder = (orderID) => {
        return Axios({
            method: "DELETE",
            url: `${urlGlobal}/order?orderID=${orderID}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    getTop5Station = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/top5Station`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    getTop5Brand = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/top5Brand`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    getCountOrder = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/countOrder`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    getProfit6Month = () => {
        return Axios({
            method: 'GET',
            url: `${urlGlobal}/profit6Month`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
}

export default OrderService