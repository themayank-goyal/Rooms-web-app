import React, { useEffect, useState } from 'react';
import Message from './components/Message';
import { addMessages, getMessages } from './firebase';
import Chatroom from './components/Chatroom';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CreateRoom from './components/CreateRoom';
import Rooms from './components/Rooms';

const App = () => {
  return (
    <div className='h-screen sm:flex'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/rooms/:code' element={<Chatroom />} />
        <Route path='/chatroom' element={<Chatroom />} />
        <Route path='/create-room' element={<CreateRoom />} />
      </Routes>
    </div>
  );
};

export default App;
