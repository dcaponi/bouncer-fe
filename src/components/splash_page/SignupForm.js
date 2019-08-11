import React from 'react';

import SubmitButton from '../SubmitButton';

const SignupForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSignup}>
        <input placeholder="Email" type="email" name="emailAddress"/><br/>
        <input placeholder="Password" type="password" name="password"/><br/>
        <input placeholder="Confirm Password" type="password" name="passwordConfirm"/><br/>
        <SubmitButton text="Sign Up"/>
      </form>
    </div>
  );
}

export default SignupForm;
