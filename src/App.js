import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import SplashPage from './components/splash-page/splash-page';
import Profile from './components/profile/Profile';
import { connect } from "react-redux";
import { setUser } from "./redux/actions"

import './main.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.getCurrentUser()
  }

  getCurrentUser = () => {
    let bouncerUrl = process.env.REACT_APP_BOUNCER_URL;
    return fetch(`${bouncerUrl}/user`, {
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

  updateUser = (event) => {
    event.preventDefault();
    let bouncerUrl = process.env.REACT_APP_BOUNCER_URL;
    fetch(`${bouncerUrl}/user`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name_first: event.target.children.firstName.value,
          name_last: event.target.children.lastName.value,
        }
      })
    }).then((res) => {
      return res.json();
    }).then((res) => {
      this.props.setUser({
        isAuthenticated: true,
        currentUser: res.user
      })
    })
  }

  render(){
    let rootRoute;
    if(this.props.isAuthenticated){
      rootRoute = (
        <Route
          exact path="/"
          render={(props) => <Profile {...props} updateUser={this.updateUser} />}
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
      <div>
        <BrowserRouter>
          {rootRoute}
          <Route
            path="/login"
            render={(props) => <SplashPage {...props} updateAuth={this.getCurrentUser}/>}
          />
          <Route
            path="/profile"
            render={(props) => <Profile {...props} updateUser={this.updateUser} />}
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
