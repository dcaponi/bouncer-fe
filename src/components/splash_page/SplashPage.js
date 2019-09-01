import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import './splash-page.css';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class SP extends Component {

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
      this.props.updateAuth()
      .then(()=>{
        if(this.props.location.search && this.props.isAuthenticated){
          let queryStringParts = this.props.location.search.slice(1).split("=");
          let parsedQuery = {}
          for(var i = 0; i < queryStringParts.length - 1; i+=2){
            parsedQuery[queryStringParts[i]] = queryStringParts[i+1]
          }
          if(parsedQuery["redirect"]){
            window.location.replace(parsedQuery["redirect"])
          }
        }
      })
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
    if(this.props.isAuthenticated){
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  }
};

const SplashPage = connect(mapStateToProps)(SP)

export default SplashPage;
