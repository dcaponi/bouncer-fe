import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AppWrapper from '../../ui-components/app-wrapper/app-wrapper'
import ProfileForm from '../ui-components/profile-form/profile-form';

const Profile = (props) => {
  if( props.isAuthenticated && props.currentUser ) {
    return (
      <AppWrapper>
        <div className="profile">
          <h1>Welcome {props.currentUser.name_first} {props.currentUser.name_last}</h1>
          <h3>Your Name</h3>
          <ProfileForm currentUser={props.currentUser}/>
          <h3>Your Apps</h3>
          <a className="ratings-link" href={process.env.REACT_APP_RATINGS_URL}>Ratings - All your feedback in one place</a>
        </div>
      </AppWrapper>
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
