import React from 'react';
import {BrowserRouter,Routes,Route,} from "react-router-dom";

import Dashboard from './Dashboard';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
      <center><h2>Welcome to Subject Management System</h2></center>
    </div>
  );
}

export default App;
