import React, { useContext, useReducer, useState } from 'react';
import { createRoom } from '../firebase';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CreateRoom = () => {
  const [roomDetails, setRoomDetails] = useState({});
  const reducer = (state, action) => {
    switch (action.type) {
      case 'setRoomCode':
        return {
          roomcode: action.inputRoomCode,
          name: state.name,
          members: state.members,
          input: state.input,
        };
        break;
      case 'setRoomName':
        return {
          roomcode: state.roomcode,
          name: action.inputRoomName,
          members: state.members,
          input: state.input,
        };
        break;

      default:
        break;
    }
  };
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    console.log();
    const isCreated = await createRoom(room);
    // isCreated
    //   ? toast.success('Room Created 🎉')
    //   : toast.error("don't be sad try again");
  };
  const handleRoomCode = (e) => {
    dispatch({
      type: 'setRoomCode',
      inputRoomCode: e.target.value,
    });
  };
  const handleRoomName = (e) => {
    dispatch({
      type: 'setRoomName',
      inputRoomName: e.target.value,
    });
  };
  const [room, dispatch] = useReducer(reducer, {
    roomcode: '',
    name: '',
    members: [],
    input: [],
  });
  return (
    <div className='w-full'>
      {/* <ToastContainer /> */}
      <div className='flex flex-col gap-4 mx-auto w-fit mt-10 mb-6'>
        <h1 className='text-xl font-bold'>Create a new Room</h1>
        <form action=''>
          <label htmlFor='room_name'>suggest a name</label>
          <input
            value={room.name}
            onChange={handleRoomName}
            className='p-4 rounded-md outline-none border-2 visited:border-red-500'
            type='text'
            placeholder='suggest a name for the room...'
            name=''
            id='room_name'
          />
          <label htmlFor='room_code'>Room Code</label>
          <input
            value={room.roomcode}
            onChange={handleRoomCode}
            className='p-4 rounded-md outline-none border-2 visited:border-red-500'
            type='text'
            placeholder='suggest a name for the room...'
            name=''
            id='room_code'
          />
          <button
            type='submit'
            onClick={handleCreateRoom}
            className='btn btn-primary'
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
