import "./App.scss";
import { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomeComponent from "./Layout/Screen/HomeComponent";
import TripComponent from "./Layout/Screen/TripComponent";
import MessageComponent from "./Layout/Screen/MessageComponent";
import HeaderComponent from "./Layout/Component/HeaderComponent";
import UserComponent from "./Layout/Screen/UserComponent";
import AdminComponent from "./Layout/Component/AdminComponent";
import AuthAdmin from "./Layout/Auth/AuthAdmin";
import AuthUser from "./Layout/Auth/AuthUser";
import { connect } from "react-redux";
import PageNotFound from "./Layout/Component/PageNotFound";
import jwt from 'jsonwebtoken'
import { createAction } from "./Redux/Action";
import { ADD_TOKEN } from "./Redux/Action/typeAction";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('SignInVeXeRe')
    try {
      const decoded = jwt.verify(token, "vexereJWT");
      this.props.dispatch(createAction(ADD_TOKEN, { token, user: decoded.user }))
    } catch (error) {
      localStorage.removeItem('SignInVeXeRe')
    }
  }
  render() {
    return (
      <BrowserRouter>
        <HeaderComponent />
        <Switch>
          <Route path="/message" component={MessageComponent} />
          <Route path="/trip" component={TripComponent} />
          <AuthAdmin path='/admin' Component={AdminComponent} />
          <AuthUser path='/user' Component={UserComponent} />
          <Route path="/" component={HomeComponent} />
          {/* <Route path='*' exact component={PageNotFound} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.UserInfo.userLogin
})

export default connect(mapStateToProps)(App);
