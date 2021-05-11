import { Route, Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'

const AuthAdmin = ({ path, Component }) => {
    return (
        <Route path={path} render={(routerProps) => {
            if (getToken() === 'admin') {
                return <Component {...routerProps} />
            }
            alert('Vui lòng đăng nhập tài khoản ADMIN!')
            return <Redirect to='/' />
        }} />
    )
}

const getToken = () => {
    const token = localStorage.getItem('SignInVeXeRe')
    try {
        const decoded = jwt.verify(token, "vexereJWT");
        return decoded.user.role
    } catch (error) {
        localStorage.removeItem('SignInVeXeRe')
        return ''
    }
}

export default AuthAdmin