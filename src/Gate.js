import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './App.css';

import { firebase } from './config';
import 'firebase/auth';
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const auth = firebase.auth();
const firestore = firebase.firestore();

function Gate(props) {

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
        { !(user) && (
            <div className='sign-in'>
                <h1>Sign In</h1>
                <h3>You must sign in to access the BREAK</h3>
                <SignIn />
            </div>
        )}
      
        {/* Signed in but doesn't have valid @mypacificacademy.net domain */}
        { (user && !(verifyDomain(user)) ) && (
            <>
              <div className='notification'>
                  You must log into a @mypacificacademy.net email
              </div>
              <SignOut />
            </>
        )}
    
    </div>
  );
}

function SignIn() {
  let history = useHistory();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        sessionStorage.setItem('userProfile', JSON.stringify(result));
        history.push('/');
    });
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  let history = useHistory();

    return auth.currentUser && (
      <button 
        onClick={() => {
          auth.signOut();
          sessionStorage.clear('userProfile');
          history.push('/');
        }}>
          Sign Out
      </button>
    )
  }

export default Gate;
