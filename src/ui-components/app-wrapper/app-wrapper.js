import React, { Component } from 'react';
import Header from '../../ui-components/header/header';
// import LeftRail from '../left-rail/left-rail';
import withUser from '../../HOC/with-user';
import { connect } from "react-redux";

class AW extends Component {

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

const AppWrapper = withUser(connect(mapStateToProps)(AW))

export default AppWrapper
