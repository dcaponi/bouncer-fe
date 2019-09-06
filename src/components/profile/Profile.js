import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./profile.scss";

const Profile = (props) => {
  if( props.isAuthenticated && props.currentUser ) {
    return (
      <div className="profile">
        <h1>Welcome {props.currentUser.name_first} {props.currentUser.name_last}</h1>
        <hr/>
        <h3>Your Name</h3>
        <form className="profile-form" onSubmit={props.updateUser}>
          <label className="profile-label">First Name</label>
          <input className="profile-input" name="firstName" placeholder={props.currentUser.name_first || ""} />
          <label className="profile-label">Last Name</label>
          <input className="profile-input" name="lastName" placeholder={props.currentUser.name_last || ""} />
          <input className="submit-button" type="submit"/>
        </form>
        <h3>Your Apps</h3>
        <a className="ratings-link" href={process.env.REACT_APP_RATINGS_URL}>Ratings - All your feedback in one place</a>
      </div>
    );
  }
  else {
    return <Redirect to="/login" />
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    currentUser: state.currentUser
  }
};

const AuthedProfile = connect(mapStateToProps)(Profile)

export default AuthedProfile;
