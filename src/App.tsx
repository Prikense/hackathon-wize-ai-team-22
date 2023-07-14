import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import logo from './images/DiagnosticaLogo.svg';
import Prompts from './pages/prompts';


function App() {
  return (
    <BrowserRouter>
    <div className='background'>
    </div>
    <div className='logo'>
      <img src={logo} className='logo-img'/>
    </div>
      <div className="App">
        <Routes>
          <Route path = '/' element={<Prompts />} />
          <Route path = '/a' element={<App />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
