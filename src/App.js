import './App.css';
import React from 'react';
import { useState } from 'react';
import Pantry from './components/pantry';
import Shopping from './components/shopping';
import Recipe from './components/recipe';
import Account from './components/account';
import logotype from './assets/logotype.png';

function App() {
  //sign up/login page
  let defaultContent = (
    <div className='app'>
      <img src={logotype} width='200px' alt='preserv logotype'></img>
      <button>SIGN UP</button>
      <button>LOG IN</button>
    </div>
  );

  let [content, setContent] = useState(defaultContent);

  return (
    <div>
      {content}
    </div>
  );
}

export default App;