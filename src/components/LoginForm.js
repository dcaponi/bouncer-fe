import React, { Component } from 'react';

import SubmitButton from './SubmitButton';

class LoginForm extends Component {
  handleSubmit(event){
    event.preventDefault();
    fetch( 'http://localhost:3000/tokens', {
    // fetch( 'https://api.bouncer.developerdom.com/tokens', {
      method: 'POST',
      credentials: 'include',
      crossDomain: true,
      mode: 'cors',
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

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Email" type="email" name="emailAddress"/><br/>
          <input placeholder="Password" type="password" name="password"/><br/>
          <SubmitButton text="Log In"/>
        </form>
      </div>
    )
  }
}

export default LoginForm
