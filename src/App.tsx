import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

import NavBar from './components/NavBar';

import './App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <NavBar />
      <Routes />
    </BrowserRouter>
  </div>
);

export default App;
