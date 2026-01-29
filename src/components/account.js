import '../App.css';
import Navbar from './navbar';
import profileLime from '../assets/profilelime.png'
import householdOwner from '../data/household.json';
import householdMember from '../data/householdtwo.json';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';

const Account = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {

    let [page, getPage] = useState("account")
    
    let [selectedUser, setSelectedUser] = useState(null);

    // Can delete this later when implementing server side schtuff
    let [householdData, setHouseholdData] = useState(householdOwner);
    let [permission, setPermission] = useState("owner");
    // Some borderline uneccessary profile viewing shenanigans
    let theOwner = selectedUser && selectedUser.id === householdData.Owner.id;
    let alexboiOwner = permission === "owner";
    let alexboiselfReflection = selectedUser && selectedUser.name === "Alexboi777";

    function leaveremoveButton () {
        if (alexboiOwner) {
            if (theOwner) {
                return <Popup trigger=
                        {<button className="kick-leave-button">Leave Household</button>}
                        modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <p>Leave your current household?</p>
                                    </div>
                                <div className="pop-up-buttons">
                                    <button onClick={() => {setInHousehold(false); getPage("household"); close();}}>Leave Household</button>
                                    <button onClick={() => {close()}}>Cancel</button>
                                </div>
                            </div>
                            )
                        }
                        </Popup> 
                // <button className="kick-leave-button" onClick={() => {setInHousehold(false); getPage("household");}}>Leave Household</button>
            } else {
                return <Popup trigger=
                        {<button className="kick-leave-button">Remove From Household</button>}
                        modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <p>Remove member from household?</p>
                                    </div>
                                <div className="pop-up-buttons">
                                    <button onClick={() => {getPage("created"); close();}}>Remove</button>
                                    <button onClick={() => {close()}}>Cancel</button>
                                </div>
                            </div>
                            )
                        }
                        </Popup> 
                // <button className="kick-leave-button">Remove From Household</button>
            }
        }
        if (!alexboiOwner && alexboiselfReflection) {
            return <Popup trigger=
                        {<button className="kick-leave-button">Leave Household</button>}
                        modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <p>Leave your current household?</p>
                                    </div>
                                <div className="pop-up-buttons">
                                    <button onClick={() => {setInHousehold(false); getPage("household"); close();}}>Leave Household</button>
                                    <button onClick={() => {close()}}>Cancel</button>
                                </div>
                            </div>
                            )
                        }
                    </Popup> 
            //<button className="kick-leave-button" onClick={() => {setInHousehold(false); getPage("household");}}>Leave Household</button>
        }
        return null;
    }

    function isOwner () {
        setHouseholdData(householdOwner);
        setPermission("owner");
        setInHousehold (true);
        getPage("created");
    }
    function isMember() {
        setHouseholdData(householdMember);
        setPermission("member");
        setInHousehold(true);
        getPage("created");
    }
     // Some borderline neccessary household navigation tactics
    let [inHousehold, setInHousehold] = useState(false);
    function skiptoHousehold () {
        if (inHousehold) {
            getPage("created"); 
        } else {
            getPage("household");
        }
    }

    //ACTUAL HTML CONTENT STUFF
    let accountPage = (
        <div className='app'>
            <h1>Account</h1>
            <div className="account-personal">
                <img className="profile-pic" src={profileLime} alt="User's Profile Picture"/>
                <div className="profile-settings">
                    <h2>Alex</h2>
                    <p onClick={skiptoHousehold}>Household Settings</p>
                    <p>Change Profile Picture...</p>
                    <Popup trigger=
                        {<p>Change Password...</p>}
                        modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <label className="popup-label">New Password:</label>
                                        <input className="popup-input" type="text" name="newpassword"/>
                                        <label className="popup-label">Confirm Password:</label>
                                        <input className="popup-input" type="text" name="confirmpassword"/>
                                    </div>
                                <div className="pop-up-buttons">
                                    <button onClick={() => {close()}}>Submit</button>
                                </div>
                            </div>
                            )
                        }
                    </Popup> 
                    <Popup trigger=
                        {<p className="accountpage-logout">Logout...</p>}
                        modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <p>Log out of your account?</p>
                                    </div>
                                <div className="pop-up-buttons">
                                    <button>Log Out</button>
                                    <button onClick={() => {close()}}>Cancel</button>
                                </div>
                            </div>
                            )
                        }
                    </Popup> 
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
            <Navbar pantryLoad={pantryLoad} shoppingLoad={shoppingLoad} recipeLoad={recipeLoad} accountLoad={accountLoad} />
        </div>
    );
    //Create or Join
    let householdPage = (
        <div className='app'>
            <h1>Household</h1>
            <div className="householdBox">
                <p>Keep your household in sync with one shared pantry where everyone can add, update, and plan to shop together.</p>
                <button onClick={() => getPage("join")}>Join Household</button>
                <button onClick={isOwner}>Create Household</button>
            </div>
            <button onClick={() => getPage("account")}>Exit</button>
        </div>
        
    );
    // Join Page
    let householdJoin = (
        <div className='app'>
            <h1>Household</h1>
            <div className="householdBox">
                <p>Enter the 9-digit code provided by your household owner to join.</p>
                <input type="text" placeholder="000 000 000"/>
                <button onClick={isMember}>Join Household</button>
            </div>
            <button onClick={() => getPage("household")}>Exit</button>
        </div>
    );
    // View Member Page
    let householdCreated = (
        <div className='app'>
            <h1>Household</h1>
            {permission === "owner" && (
                <button className="add-member" onClick={() => getPage("add")}>Add Member</button>
            )}
            <h2>Owner</h2>
            <ul className="member-list">
                <li className="member-item">
                    <div className="left-side">
                        <img src={householdData.Owner.image} alt={householdData.Owner.name + "'s profile picture"} className="household-profile-pic"/>
                        <p>{householdData.Owner.name}</p>
                    </div>
                    <button className="tripledots" onClick={() => {setSelectedUser(householdData.Owner); getPage("profile")}}>...</button>
                </li>
            </ul>
            <h2>Members</h2>
            <ul className="member-list">
                {householdData.Members.map((member) =>(
                    <li key={member.id} className="member-item">
                        <div className="left-side">
                            <img src={member.image} alt={member.name + "'s profile picture"} className="household-profile"/>
                            <p>{member.name}</p>
                        </div>
                        <button className="tripledots" onClick={() => {setSelectedUser(member); getPage("profile")}}>...</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => getPage("account")}>Exit</button>
        </div>
    );

    let householdProfilePage = selectedUser && (
        <div className="app">
            <img src={selectedUser.image} alt={selectedUser.name + "'s profile picture"} className="permissions-profile-pic"/>
            <h1 className="member-name">{selectedUser.name}</h1>
            <h2 className="member-role">{selectedUser.role}</h2>
            <h2 className="">Household Permissions</h2>
            <ul classname="permissions-list"> 
                <li className="permission-item">
                    <p className="permission-text">Pantry Access</p>
                    <select className="permission-ddown" value="" name="paccess">
                        <option value="view">View</option>
                        <option value="Edit">Edit</option>
                    </select>
                </li>
                <li className="permission-item">
                    <p className="permission-text">Shopping List Access</p>
                    <select className="permission-ddown" value="" name="slaccess">
                        <option value="view">View</option>
                        <option value="Edit">Edit</option>
                    </select>
                </li>
            </ul>
            {leaveremoveButton()}
            <button onClick={() => getPage("created")}>Exit</button>
        </div>
    )
    let householdAdd = (
        <div className='app'>
            <h1>Household</h1>
            <div className="householdBox">
                <p>Create a unique 9-digit code to invite others to your household. Share this code only with people you trust, as anyone with the code will be able to join.</p>
                <input type="text" placeholder="000 000 000"/>
                <button>Generate Code</button>
            </div>
            <button onClick={() => getPage("created")}>Exit</button>
        </div>
    );
    /* let [content, setContent] = useState(accountPage);
    let [selectedUser, setSelectedUser] = useState(null);

    function aPage () {
        setContent(accountPage)
    }

    function hhPage () {
        setContent(householdPage)
    }

    function hhpageJoin () {
        setContent(householdJoin)
    }
    function hhMenu () {
        setContent (householdCreated)
    } */

    return (
        <div>
            {page === "account" && accountPage}
            {page === "household" && householdPage}
            {page === "join" && householdJoin}
            {page === "created" && householdCreated}
            {page === "profile" && householdProfilePage}
            {page === "add" && householdAdd}

        </div>   
    );
}

export default Account;