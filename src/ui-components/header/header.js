import React from 'react';
const Header = (props) => {
  let linkString = process.env.REACT_APP_LOGIN_URL + "/login";
  let userNameString = "Log In"

  if(props.user){
    linkString = process.env.REACT_APP_LOGIN_URL + "/profile";
    userNameString = props.user.name_first + " " + props.user.name_last;
  }
  return (
    <header className="header">
      <div className="title">
        <h1 className="main-title">Access</h1>
        <h4 className="subtitle">Manage your account</h4>
      </div>
      <div className="sign-in">
        <a className="user-link" href={linkString}>{userNameString}</a>
      </div>
    </header>
  );
}

export default Header
