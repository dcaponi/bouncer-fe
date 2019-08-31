import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import './splash-page.css';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class SplashPage extends Component {

  handleLogin = (event) => {
    event.preventDefault();
    let bouncerUrl = process.env.REACT_APP_BOUNCER_URL;
    fetch(`${bouncerUrl}/tokens`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: event.target.children.emailAddress.value,
          password: event.target.children.password.value,
        }
      })
    }).then((res) => {
      return res.json();
    }).then((res) => {
      this.props.updateAuth();
    })
  }

  handleSignup = (event) => {
    event.preventDefault();
    let bouncerUrl = process.env.REACT_APP_BOUNCER_URL;
    fetch(`${bouncerUrl}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: event.target.children.emailAddress.value,
          password: event.target.children.password.value,
          password_confirmation: event.target.children.passwordConfirm.value,
          redirect_url: "https://bouncer.developerdom.com/profile"
        },
      })
    }).then((res) => {
      return res.json()
    }).then((res) => {
      console.log(res)
    })
  }

  render(){
    if(this.props.checkAuth){
      return(<Redirect to="/profile" />)
    }
    return (
      <div>
        <div className="splash-page">
          <div className="form">
            <h4 className="splash-header">Log In</h4>
            <LoginForm handleLogin={this.handleLogin}/>
          </div>
          <div className="form">
            <h4 className="splash-header">Sign Up</h4>
            <SignupForm className="form" handleSignup={this.handleSignup}/>
          </div>
        </div>
      </div>
    )
  }
}

export default SplashPage;
