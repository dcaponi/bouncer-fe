import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import SplashPage from './components/splash_page/SplashPage';
import Profile from './components/profile/Profile';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.checkAuthenticated()
  }

  bouncerUrl = process.env.REACT_APP_BOUNCER_URL

  state = {
    isAuthenticated: false,
    currentUser: null
  }

  checkAuthenticated = () => {
    fetch(`${this.bouncerUrl}/user`, {
      credentials: 'include'
    })
    .then((res)=>{
      if(res.status === 200) {
        this.setState({isAuthenticated: true})
      }
      return res.json();
    })
    .then((res) => {
      if(res){
        this.setState({currentUser: res.user})
      }
    })
  }

  render(){
    let rootRoute;
    if(this.state.isAuthenticated){
      rootRoute = (
        <Route
          exact path="/"
          render={(props) => <Profile {...props} />}
        />
      )
    }
    else{
      rootRoute = (
        <Route
          exact path="/"
          render={(props) => <SplashPage {...props} updateAuth={this.checkAuthenticated}/>}
        />
      )
    }
    return (
      <div className="App">
        <BrowserRouter>
          {rootRoute}
          <Route
            path="/login"
            render={(props) => <SplashPage {...props} checkAuth={this.state.isAuthenticated} updateAuth={this.checkAuthenticated}/>}
          />
          <Route
            path="/profile"
            render={(props) => <Profile checkAuth={this.state.isAuthenticated} {...props} />}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
