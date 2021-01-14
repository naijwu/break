import React, { useState } from 'react';

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

export default Home;