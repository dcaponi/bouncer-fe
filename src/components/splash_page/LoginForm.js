import React from 'react';

import SubmitButton from '../SubmitButton';

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <input placeholder="Email" type="email" name="emailAddress"/><br/>
        <input placeholder="Password" type="password" name="password"/><br/>
        <SubmitButton text="Log In"/>
      </form>
    </div>
  );
}
export default LoginForm;
