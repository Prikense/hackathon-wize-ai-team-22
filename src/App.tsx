import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Prompts from './pages/prompts';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path = '/' element={<Prompts />} />
          <Route path = '/shit' element={<App />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
