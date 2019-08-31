import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import SplashPage from './components/splash_page/SplashPage';
import Profile from './components/profile/Profile';
import { connect } from "react-redux";
import { setUser } from "./redux/actions"

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.getCurrentUser()
  }

  getCurrentUser = () => {
    let bouncerUrl = process.env.REACT_APP_BOUNCER_URL;
    fetch(`${bouncerUrl}/user`, {
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.user){
        this.props.setUser({
          isAuthenticated: true,
          currentUser: res.user
        })
      }
    })
  }

  render(){
    let rootRoute;
    if(this.props.isAuthenticated){
      rootRoute = (
        <Route
          exact path="/"
          render={(props) => <Profile {...props} />}
        />
      )
    }
    else{
      rootRoute = (
        <Route
          exact path="/"
          render={(props) => <SplashPage {...props} updateAuth={this.getCurrentUser}/>}
        />
      )
    }
    return (
      <div className="App">
        <BrowserRouter>
          {rootRoute}
          <Route
            path="/login"
            render={(props) => <SplashPage {...props} checkAuth={this.props.isAuthenticated} updateAuth={this.getCurrentUser}/>}
          />
          <Route
            path="/profile"
            render={(props) => <Profile checkAuth={this.props.isAuthenticated} {...props} />}
          />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
};

const AuthedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default AuthedApp;
