import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Home.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

if(!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAcAxl1Q9lLs2ymp1MJ6WVO-wNQEyB4feA",
    authDomain: "the-break-online.firebaseapp.com",
    projectId: "the-break-online",
    storageBucket: "the-break-online.appspot.com",
    databaseURL: "https://the-break-online.firebaseio.com",
    messagingSenderId: "579966862829",
    appId: "1:579966862829:web:98ae654f53ade0a39593e4",
    measurementId: "G-ZS5XZM7S3K"
  })
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function Gate() {

  const [user] = useAuthState(auth);

  return (
    <div className="whatsthepassword">

        {/* Not signed in at all lol       */}
        { user ? <SignOut /> : <SignIn /> }
      
        {/* Signed in but doesn't have valid @mypacificacademy.net domain */}
        { sessionStorage.getItem('userProfile') ? ( (<div className='notification'>You must log into a @mypacificacademy.net email</div>) ) : ""}
    
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

function SignOut() {
  return auth.currentUser && (
    <button 
      onClick={() => {
        sessionStorage.clear('userProfile');
        auth.signOut();
        <Redirect to={{ pathname: '/' }} />
      }}>
        Sign Out
    </button>
  )
}


export default Gate;
