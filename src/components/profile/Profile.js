import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Profile = (props) => {
  if( props.isAuthenticated && props.currentUser ) {
    return (
      <h1>Welcome {props.currentUser.name_first} {props.currentUser.name_last}</h1>
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
