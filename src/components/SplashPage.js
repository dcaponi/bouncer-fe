import React from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const SplashPage = (props) => {
  return (
    <div>
      <p>Log In</p>
      <LoginForm/>
      <p>No Account? Sign Up!</p>
      <SignupForm/>
    </div>
  )
}

export default SplashPage;
