import React, { useEffect, useState } from 'react';
import { addMessages, getMessages, handleAuth } from '../firebase';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserName } from '../features/user/userSlice';
import { useParams } from 'react-router-dom';

const Chatroom = () => {
  const roomcode = useParams().code;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const name = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const username = email.split('@')[0];
  const sendMessageHandle = (event) => {
    event.preventDefault();
    addMessages(roomcode, input, username);
    setInput('');
  };
  useEffect(() => {
    getMessages(setMessages, roomcode);
  }, []);
  
  console.log(messages);
  return (
    <div className='flex flex-col w-full bg-gradient-to-tl from-fuchsia-200 via-fuchsia-400 to-violet-400'>
      <h1 className='text-2xl border-b-2 border-white text-yellow-900 uppercase font-bold p-4 '>WELCOME {name}</h1>
      <div className='relative  rounded-lg h-screen p-3 overflow-y-auto'>
        {messages?.map((message, i) => (
          <Message key={i} message={message} username={username} />
        ))}
      </div>
      <form className='bg-white flex gap-2  text-center' action=''>
        <input
          placeholder='type any message...'
          className='outline-none placeholder-purple-900 pl-4 w-full'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
        />
        <button
          className='w-1/4 h-14 btn rounded-none '
          disabled={!input}
          type='submit'
          onClick={sendMessageHandle}
        >
          send message
        </button>
      </form>
    </div>
  );
};

export default Chatroom;
