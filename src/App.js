import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile';
import BoatDetail from './Components/BoatDetail/BoatDetail';


const App = () => (
  <div>
    <Navbar ></Navbar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/boat/:id" element={<BoatDetail/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  </div>
);

export default App;
