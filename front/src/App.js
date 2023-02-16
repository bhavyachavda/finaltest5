import './App.css';
import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Screen from './pages/Screen';
import Listdata from './pages/Listdata';
import Editdata from './pages/Editdata';
import View from './pages/View';

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <div>
      {/* <h1>{message}</h1> */}
      <BrowserRouter>
        <Routes>
        <Route exact path='/' element={< Listdata />}></Route>
        <Route exact path='/Screen' element={< Screen />}></Route>
        <Route path="Edit" element={<Editdata/>}/>
        <Route path="View" element={<View/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
