import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SplashPage from '../splash_page/SplashPage';
import Profile from '../profile/Profile';

class PrivateRoute extends Component {

  render(){
    let { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={
          (props) => {
            console.log(props.isAuthenticated)
            return props.isAuthenticated ?
              (<Profile/>) :
              (<Redirect to={{
                pathname: "/login",
                state: { from: props.location }
              }}/>)
          }
        }
      />
    );
  }
}

export default PrivateRoute;
