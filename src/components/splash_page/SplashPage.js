import React, { Component } from 'react';
import './splash-page.css';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class SplashPage extends Component {
  handleLogin(event){
    event.preventDefault();
    // fetch('http://localhost:3000/tokens', {
    fetch( 'https://bouncer.api.developerdom.com/tokens', {
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
      return res.json()
    }).then((res) => {
      console.log(res)
    })
  }

  handleSignup(event){
    event.preventDefault();
    // fetch('http://localhost:3000/users', {
    fetch('https://bouncer.api.developerdom.com/users', {
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
