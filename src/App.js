import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SplashPage from './components/splash_page/SplashPage';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/private_route/PrivateRoute';

import './App.css';

class App extends Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount(){
    // fetch('http://localhost:3000/user', {
      fetch('https://api.bouncer.developerdom.com/users', {
      credentials: 'include'
    })
      .then((res)=>{
        if(res.status == 201) {
          this.setState({isAuthenticated: true})
        }
      })
      .then((res)=>{
        console.log(res);
      })
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            exact path="/"
            render={ (props) => {
              return this.state.isAuthenticated ?
                (<Redirect to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}/>) :
                (
                  <Redirect to={{
                    pathname: "/profile",
                    state: { from: props.location }
                  }}/>
                )
            }}
          />
          <Route path="/login" component={SplashPage} />
          <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/profile" component={Profile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
