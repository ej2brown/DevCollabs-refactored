import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import Routes from './Routes';

import './App.css';


const App = () => (
  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <div>DevCollabs</div>
      </header>
      <main className="container">
        <ul className="left">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/CodeEditor">Code Editor</Link>
          </li>
        </ul>
        <Routes />
      </main>
    </div>
  </BrowserRouter>
);


export default App;
