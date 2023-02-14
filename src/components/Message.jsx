import React from 'react';

const Message = ({ message, username }) => {
  const isUser = username === message.username;
  const USER_STYLES = 'chat chat-end ';
  return (
    <div className={isUser ? USER_STYLES : 'chat chat-start'}>
      <div className='chat-header uppercase'>{message.username}</div>
      {!isUser ? (
        <div className='chat-bubble'>{message.text}</div>
      ) : (
        <div className='chat-bubble chat-bubble-accent'>{message.text}</div>
      )}
    </div>
  );
};

export default Message;
