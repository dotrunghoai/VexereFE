import Axios from 'axios'

class OrderService {
    fetchOrder = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/order'
        })
    }
    fetchOrderFutureByUser = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/orderFutureByUser',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    fetchOrderPassByUser = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/orderPassByUser',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    deleteOrder = (orderID) => {
        return Axios({
            method: "DELETE",
            url: `http://vexere-hoai.herokuapp.com/order?orderID=${orderID}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    getTop5Station = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/top5Station',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    getTop5Brand = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/top5Brand',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    getCountOrder = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/countOrder',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
    getProfit6Month = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/profit6Month',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SignInVeXeRe')
            }
        })
    }
}

export default OrderService