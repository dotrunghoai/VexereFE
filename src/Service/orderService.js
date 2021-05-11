import Axios from 'axios'

class OrderService {
    fetchOrder = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/order'
        })
    }
    fetchOrderByUser = () => {
        return Axios({
            method: 'GET',
            url: 'http://vexere-hoai.herokuapp.com/orderByUser',
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
}

export default OrderService