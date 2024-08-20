import './App.css';
import MCQTest from './Mcqs/test';
import WebcamAccess from './WebCamAccess';
import { Routes,Route } from 'react-router-dom';
import Login from './login/login';
import { ToastContainer } from 'react-toastify';
import Home from './Home/Home';
import { useState } from 'react';
import Submit from './Submit';

function App() {
  const [currState,setCurrState]=useState("Login");

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home currState={currState} setCurrState={setCurrState} />}/>
        <Route path='/login' element={<Login currState={currState} setCurrState={setCurrState} />}/>
        <Route path="/test" element={<MCQTest />}/>
        <Route path="/web" element={<WebcamAccess />}/>
        <Route path="/submit" element={<Submit />}/>
      </Routes>
    </div>
  );
}

export default App;
