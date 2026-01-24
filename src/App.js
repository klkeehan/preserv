import './App.css';
import React from 'react';
import { useState } from 'react';
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