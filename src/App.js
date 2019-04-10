import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Redirect } from "react-router-dom";
import "./App.css"
import loginPage from '../src/screens/loginScreen';
import RegisterPage from "../src/screens/registrationScreen"
import forgetPage from '../src/screens/forgetPasswordScreen'
import resetPasswordPage from '../src/screens/resetPasswordScreen'
import dashBoardPage from '../src/screens/dashBoardScreen'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
   localStorage.getItem('token') ? (
  <Component {...props}/>
  ) : (
  <Redirect to={{
  pathname: '/login',
  state: { from: props.location }
  }}/>
  )
  )}/>
)
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="app">
             <Route path="/login" component={loginPage}></Route>
             <Route path="/" exact  component={loginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/forgetpassword" component={ forgetPage}></Route>
            <Route path="/resetPassword" component={ resetPasswordPage}></Route>
            <PrivateRoute path="/dashBoard" component={  dashBoardPage}></PrivateRoute>
          </div>
        </Router>
      </div>

    );
  }
}

export default App;
 