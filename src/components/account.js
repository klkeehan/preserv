import '../App.css';
import Navbar from './navbar';
import profileLime from '../assets/profilelime.png'
import React from 'react';
import { useState } from 'react';

function Account() {
    let accountPage = (
        <div className='app'>
            <h1>Account</h1>
            <div className="account-personal">
                <img
                    className="profile-pic"
                    src={profileLime}
                    alt="User's Profile Picture"
                />
                <div className="profile-settings">
                    <h2>Alex</h2>
                    <p onClick={hhPage}>Household Settings</p>
                    <p>Change Profile Picture...</p>
                    <p>Change Password...</p>
                    <p className="accountpage-logout">Logout...</p>
                </div>
            </div>
            <div className="account-notifications">
                <h3>Notifications</h3>
                <div className="notification-item">
                    <p>Push Notifications</p>
                    <label className='toggle'>
                        <input type="checkbox" name='pushNotification'/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="notification-item">
                    <p>Near Expiration Date</p>
                    <label className='toggle'>
                        <input type="checkbox" name='nearExpiration'/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="notification-item">
                    <p>Low-Stock</p>
                    <label className='toggle'>
                        <input type="checkbox" name='lowStock'/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="notification-item">
                    <p>Shopping List Additions</p>
                    <label className='toggle'>
                        <input type="checkbox" name='shoppingListAdd'/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="notification-item">
                    <p>Shopping List Confirmed Purchases</p>
                    <label className='toggle'>
                        <input type="checkbox" name='shoppingListConfirm'/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="notification-item">
                    <p>High-contrast Colors</p>
                    <label className='toggle'>
                        <input type="checkbox" name='highContrast'/>
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
    //HOUSEHOLD STUFF
    let householdPage = (
        <div className='app'>
            <h1>Household</h1>
            <div className="householdBox">
                <p>Keep your household in sync with one shared pantry where everyone can add, update, and plan to shop together.</p>
                <button onClick={hhpageJoin}>Join Household</button>
                <button>Create Household</button>
            </div>
            <button>Exit</button>
        </div>
        
    );
    let householdJoin = (
        <div className='app'>
            <h1>Household</h1>
            <div className="householdBox">
                <p>Enter the 9-digit code provided by your household owner to join.</p>
                <input type="text" placeholder="000 000 000"/>
                <button>Join Household</button>
            </div>
            <button>Exit</button>
        </div>
    );

    let [content, setContent] = useState(accountPage);

    function hhPage () {
        setContent(householdPage)
    }

    function hhpageJoin () {
        setContent(householdJoin)
    }
    return (
        <div>
            {content}
        </div>   
    );
}

export default Account;