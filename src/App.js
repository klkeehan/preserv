import './App.css';
import { useState } from 'react';
import Pantry from './components/pantry';
import Shopping from './components/shopping';
import Recipe from './components/recipe';
import Account from './components/account';
import logotype from './assets/logotype.svg';
import backArrow from './assets/back.svg';

function App() {
  //home page
  let defaultContent = (
    <div className='layout' style={{backgroundColor:'var(--pink)'}}>
      <img src={logotype} className='logotype' alt='preserv logotype' />
      <div className='spacer' style={{height:'180px'}}></div>
      <button className='solid-button' onClick={loadSignUp}>SIGN UP</button>
      <button className='hollow-button' onClick={loadLogin}>LOG IN</button>
    </div>
  );

  let [content, setContent] = useState(defaultContent);

  //sign up page
  let signUp = (
    <div className='layout' style={{backgroundColor:'var(--white)'}}>
      <button className='back-arrow' onClick={loadHome}><img src={backArrow} style={{width:'28px'}} alt='back arrow'></img></button>
      <img src={logotype} className='logotype' alt='preserv logotype'/>
      <div className='spacer' style={{height:'150px'}}></div>
      <input name='fName' placeholder='First Name' className='input'/>
      <input name='email' placeholder='Email' className='input'/>
      <input name='username' placeholder='Username' className='input'/>
      <input name='password' placeholder='Password' className='input'/>
      <button className='solid-button' style={{color:'var(--white)'}} onClick={loadPantry}>GET STARTED</button>
    </div>
  );

  //login page
  let login = (
    <div className='layout' style={{backgroundColor:'var(--white)'}}>
      <button className='back-arrow' onClick={loadHome}><img src={backArrow} style={{width:'28px'}} alt='back arrow'></img></button>
      <img src={logotype} className='logotype' alt='preserv logotype' />
      <div className='spacer' style={{height:'50px'}}></div>
      <input name='username' placeholder='Username' className='input' />
      <input name='password' placeholder='Password' className='input' style={{marginBottom:'0px'}} />
      <button className='pw-forgot' onClick={loadPWReset}>Forgot Password?</button>
      <button className='solid-button' style={{color:'var(--white)'}} onClick={loadPantry}>LOG IN</button>
    </div>
  );

  //password reset page
  let pwReset = (
    <div className='layout' style={{backgroundColor:'var(--white)'}}>
      <button className='back-arrow' onClick={loadLogin}><img src={backArrow} style={{width:'28px'}} alt='back arrow'></img></button>
      <img src={logotype} className='logotype' alt='preserv logotype'/>
      <div className='spacer' style={{height:'50px'}}></div>
      <p className='pw-header'>Password Reset</p>
      <p className='body-text'>Enter your email address and we will send you instructions to reset your password.</p>
      <div className='spacer' style={{height:'20px'}}></div>
      <input name='email' placeholder='Email' className='input'/>
      <button className='solid-button' style={{color:'var(--white)'}} onClick={loadLogin}>SEND EMAIL</button>
    </div>
  );

  //load functions
  function loadHome() {
    setContent(defaultContent);
  }

  function loadSignUp() {
    setContent(signUp);
  }

  function loadLogin() {
    setContent(login);
  }

  function loadPWReset() {
    setContent(pwReset);
  }

  function loadPantry() {
    setContent(<Pantry pantryLoad={loadPantry} shoppingLoad={loadShopping} recipeLoad={loadRecipe} accountLoad={loadAccount} />);
  }

  function loadShopping() {
    setContent(<Shopping pantryLoad={loadPantry} shoppingLoad={loadShopping} recipeLoad={loadRecipe} accountLoad={loadAccount} />);
  }

  function loadRecipe() {
    setContent(<Recipe pantryLoad={loadPantry} shoppingLoad={loadShopping} recipeLoad={loadRecipe} accountLoad={loadAccount} />);
  }

  function loadAccount() {
    setContent(<Account pantryLoad={loadPantry} shoppingLoad={loadShopping} recipeLoad={loadRecipe} accountLoad={loadAccount} />);
  }

  return (
    <div className='app'>
      {content}
    </div>
  );

}

export default App;
