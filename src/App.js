import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import './App.css';
import Gate from './Gate.js'; // Login gate for all users to bypass (re privacy issues with the school)
import Home from './Home.js';

function AuthRoute({ component: Component, ...rest }) {
  
  const verifyDomain = (user) => {
    let profile = JSON.parse(user);
    if( profile.user.email.substring(profile.user.email.indexOf("@")) === '@mypacificacademy.net' ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        (sessionStorage.getItem('userProfile') && (verifyDomain(sessionStorage.getItem('userProfile')))) ? ( 
          // if there is userProfile & is valid information, then do this component
          <Component {...props} />
        ) : ( 
          // if there is no userProfile information, do this
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function App() {

  return (
    <Switch>
      <AuthRoute exact path='/' component={Home} />
      <Route exact path='/login' component={Gate} />
      
    </Switch>
  );
}

export default App;
