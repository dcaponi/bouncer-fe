import React from 'react';
import { Redirect } from "react-router-dom";
import withAuth from '../hoc/withAuth';

const Profile = (props) => {
  return (
    <h1>check out my dope ass page</h1>
  );
}

const AuthedProfile = withAuth(Profile)

export default AuthedProfile;
