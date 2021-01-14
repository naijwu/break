import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import { firebase } from './config';
import 'firebase/auth';

const auth = firebase.auth();

function Home() {

    return (
        <>
            <div className='header'>
                <div className='toplobster'>
                    <div className='actions'>
                    <a href='#"'>
                        Actions
                    </a>
                    {/* Or, displays the account's type (so either Actions or 'Reader') */}
                    </div>
                    <div className='logo'>
                    The Break
                    </div>
                    <div className='account'>
                        <SignOut />
                    </div>
                </div>
            </div>
            
            <div className='sub-header'>
                <div className='brasstoe'>
                    <a>
                    Student Life
                    </a>
                    <a>
                    Current Events
                    </a>
                    <a>
                    Pop Culture
                    </a>
                    <a>
                    Arts
                    </a>
                    <a>
                    Teacher's Life
                    </a>
                </div>
            </div>
        </>
    );
}

function SignOut() {
  return auth.currentUser && (
    <button 
      onClick={() => {
        sessionStorage.clear('userProfile');
        auth.signOut();
        <Redirect to={{ pathname: '/home' }} />
      }}>
        Sign Out
    </button>
  )
}

export default Home;