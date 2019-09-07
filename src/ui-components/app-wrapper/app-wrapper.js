import React, { Component } from 'react';
import Header from '../header/header';
// import LeftRail from '../left-rail/left-rail';
import { connect } from "react-redux";
import { setUser } from "../../redux/actions";

class AW extends Component {

  constructor(props){
    super(props);
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    let bouncerUrl = process.env.REACT_APP_BOUNCER_URL;
    fetch(`${bouncerUrl}/user`, {
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.user){
        this.props.setUser({
          isAuthenticated: true,
          currentUser: res.user
        })
      }
    })
  }
  render(){
    return(
      <div className="App">
        <Header user={this.props.currentUser}/>
        <div className="app-body">
          {/*<LeftRail/>*/}
          <div className="page-component">
            {this.props.children}
          </div>
        </div>
      </div>
    )
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

const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(AW)

export default AppWrapper
