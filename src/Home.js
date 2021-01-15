import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

import { firebase } from './config';
import 'firebase/auth';

// test data only:
import { articles } from './demodata';

const auth = firebase.auth();


function Home() {

    const [ selectedTopics, updateSelectedTopics ] = useState('scpat'); // by default, all article types selected

    const addGenre = e => {
        e.preventDefault();
        let type = e.currentTarget.id;
        // s, c, p, a, t

        let newSelection = '';

        if((selectedTopics.indexOf(type) > -1)) {
            // if its already selected; action: deselect
            newSelection = selectedTopics.split(type).join('');
            updateSelectedTopics(newSelection);
            e.currentTarget.className = `${type}-a`;
        } else {
            // if its not selected; action: select!
            newSelection = selectedTopics + type;
            updateSelectedTopics(newSelection);
            e.currentTarget.className = `${type}`;
        }
    }

    return (
        <>
            <div className='header'>
                <div className='toplobster'>
                    <div className='actions'>
                    <Link to=''>
                        Actions
                    </Link>
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
                    <button className='s' id="s" onClick={addGenre}>
                        Student Life
                    </button>
                    <button className='c' id="c" onClick={addGenre}>
                        Current Events
                    </button>
                    <button className='p' id="p"
                        onClick={addGenre}>
                        Pop Culture
                    </button>
                    <button className='a' id="a"
                        onClick={addGenre}>
                        Arts
                    </button>
                    <button className='t' id="t"
                        onClick={addGenre}>
                        Teacher's Life
                    </button>
                </div>
            </div>

            <div className='article-container'>
                <ShowArticles selected={selectedTopics} />
            </div>
        </>
    );
}

function ShowArticles(props) {

    let displayData = [];

    articles.forEach((item) => {
        if (props.selected.indexOf(item.tag) > -1) {
            if(item.published) {
                displayData.push(
                    <div className='showie'>
                        <h2>{item.title}</h2>
                        <h3>{item.subtitle}</h3>
                        <h4>{item.date}</h4>
                        <Likes likes={item.liked} />
                        <Link to={{
                            pathname: '/article/' + item.id,
                        }}>
                            Read More
                        </Link>
                    </div>
                );
            }
        }
    });

    return displayData;
}

function Likes(props) {
    return (
        <div className='like-icon'>
            {`<3`} {props.likes.length}
        </div>
    );
}

function SignOut() {
    let history = useHistory();

    return auth && (
        <button 
        onClick={() => {
            sessionStorage.clear('userProfile');
            auth.signOut();
            history.push('/');
        }}>
            Sign Out
        </button>
    );
}

export default Home;