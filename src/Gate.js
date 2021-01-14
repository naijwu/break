import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Home.js';

import { firebase } from './config';
import 'firebase/auth';
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const auth = firebase.auth();
const firestore = firebase.firestore();

function Gate() {

  const [user] = useAuthState(auth);

  const verifyDomain = (user) => {
    if( user.email.substring(user.email.indexOf("@")) === '@mypacificacademy.net' ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="whatsthepassword">

        {/* Is the user signed in at all? */}
        { user ? 
        (
            ""
        ) : (
            <div className='sign-in'>
                <h1>Sign In</h1>
                <h3>You must sign in to access the BREAK</h3>
                <SignIn />
            </div>
        ) }
      
        {/* Signed in but doesn't have valid @mypacificacademy.net domain */}
        { (sessionStorage.getItem('userProfile') && !(verifyDomain(user)) ) ? ( (
            <div className='notification'>
                You must log into a @mypacificacademy.net email
            </div>
        ) ) : <Redirect to={{ pathname: '/' }} />}
    
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        sessionStorage.setItem('userProfile', JSON.stringify(result));
        <Redirect to={{ pathname: '/' }} />
    });
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}


export default Gate;
