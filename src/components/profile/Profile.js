import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../redux/actions"
import withUser from '../../HOC/with-user';
import AppWrapper from '../../ui-components/app-wrapper/app-wrapper'
import ProfileForm from '../../ui-components/profile-form/profile-form';
import Popup from '../../ui-components/popup/popup'

class Profile extends Component {
  state = {
    updatedProfile: false,
    wrongPassword: false,
    mismatchPassword: false
  }

  updateUser = (event) => {
    event.preventDefault();
    let bouncerUrl = process.env.REACT_APP_BOUNCER_URL;
    fetch(`${bouncerUrl}/user`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.buildParams(event.target.getElementsByClassName("profile-input"))
      })
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if(res.user){
        this.props.setUser({
          isAuthenticated: true,
          currentUser: res.user
        })
        this.setState({...this.state, updatedProfile: true})
      }
      if(res.unauthorized){
        this.setState({...this.state, wrongPassword: true})
      }
      if(res.password_confirmation){
        this.setState({...this.state, mismatchPassword: true})
      }
    })
  }

  buildParams = (fields) => {
    let params = {}
    for(var i = 0; i < fields.length; i++){
      params[fields[i].name] = fields[i].value
    }
    return params;
  }

  resetUpdate = () => this.setState({...this.state, updatedProfile: false})
  resetUnauthorized = () => this.setState({...this.state, wrongPassword: false})
  resetMismatch = () => this.setState({...this.state, mismatchPassword: false})

  render(){
    if( this.props.isAuthenticated ) {
      let nameFields = [];
      let passwordResetFields = [];

      if( this.props.currentUser ) {
        nameFields = [
          {
            name: "name_first",
            label: "First Name",
            defaultValue: this.props.currentUser.name_first
          },
          {
            name: "name_last",
            label: "Last Name",
            defaultValue: this.props.currentUser.name_last
          }
        ]
      }

      else {
        nameFields = [
          {
            name: "name_first",
            label: "First Name",
          },
          {
            name: "name_last",
            label: "Last Name",
          }
        ]
      }

      passwordResetFields = [
        {
          name: "old_password",
          label: "Old Password",
          type: "password"
        },
        {
          name: "password",
          label: "New Password",
          type: "password"
        },
        {
          name: "password_confirmation",
          label: "Confirm New Password",
          type: "password"
        }
      ]
      return (
        <AppWrapper>
          {this.state.updatedProfile ? <Popup text="Profile updated successfully" close={this.resetUpdate}/> : null}
          {this.state.wrongPassword ? <Popup text="Wrong password given" close={this.resetUnauthorized}/> : null}
          {this.state.mismatchPassword ? <Popup text="Password and Password Confirmation do not match" close={this.resetMismatch}/> : null}
          <div className="profile">
            <h2>Edit My Profile</h2>
              <div className="profile-forms">
                <ProfileForm formTitle="Update Name" submitAction={this.updateUser} fields={nameFields}/>
                <ProfileForm formTitle="Update Password" submitAction={this.updateUser} fields={passwordResetFields}/>
              </div>
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
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
};

Profile = withUser(connect(mapStateToProps, mapDispatchToProps)(Profile));

export default Profile;
