import React, { Component } from 'react';

import SubmitButton from './SubmitButton';

class SignupForm extends Component {
  handleSubmit(event){
    event.preventDefault();
    fetch('https://api.bouncer.developerdom.com/users', {
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
          <input placeholder="Confirm Password" type="password" name="passwordConfirm"/><br/>
          <SubmitButton text="Sign Up"/>
        </form>
      </div>
    )
  }
}

export default SignupForm
