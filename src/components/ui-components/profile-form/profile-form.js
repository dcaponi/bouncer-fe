import React from 'react';
import SubmitButton from '../submit-button/submit-button';
const ProfileForm = (props) => {
  return (
    <form className="profile-form" onSubmit={props.updateUser}>
      <label className="profile-label">First Name</label>
      <input className="profile-input" name="firstName" placeholder={props.currentUser.name_first || ""} />
      <label className="profile-label">Last Name</label>
      <input className="profile-input" name="lastName" placeholder={props.currentUser.name_last || ""} />
      <SubmitButton text="Update Profile"/>
    </form>
  )
}

export default ProfileForm;
