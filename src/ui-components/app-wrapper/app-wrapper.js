import React from 'react';
import Header from '../../ui-components/header/header';
// import LeftRail from '../left-rail/left-rail';

const AppWrapper = (props) => {
  return(
    <div className="App">
      <Header user={props.currentUser}/>
      <div className="app-body">
        {/*<LeftRail/>*/}
        <div className="page-component">{props.children}</div>
      </div>
    </div>
  )
}

export default AppWrapper
