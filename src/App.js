import './App.css';
import logotype from './assets/logotype.png';

function App() {
  return (
    <div className='app'>
      <img src={logotype} width='200px' alt='preserv logotype'></img>
      <button>SIGN UP</button>
      <button>LOG IN</button>
    </div>
  );
}

export default App;
