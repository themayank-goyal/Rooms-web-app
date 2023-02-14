import React, { useEffect, useState } from 'react'
import { getAllRooms, getUserJoinedRooms, joinRoom } from '../firebase';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail, selectUserName, setSignOutState } from '../features/user/userSlice';

const Rooms = () => {
  const dispatch = useDispatch();
  const [allRooms, setAllRooms] = useState([]);
  const email = useSelector(selectUserEmail);
  const username = email.split('@')[0];
  const navigate = useNavigate();
  const setUser = (user) => {
    if(user){
      dispatch(setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }))}
      else{
        dispatch(setSignOutState())
        Navigate('/');
      }
    }
  useEffect(() => {
    getUserJoinedRooms(username);
    getAllRooms(setAllRooms);
  }, [])
  console.log(allRooms)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6 gap-6 w-5/6 mx-auto'>
      {allRooms.map((item) => (
        <Link className='shadow-lg hover:bg-purple-300 hover:font-bold hover:scale-105 duration-300 border-2 border-purple-400 rounded-lg hover:border-3 hover:border-purple-700' to={`/rooms/${item.roomcode}`}>
        <div key={item.roomcode} className='relative h-full flex flex-col items-center justify-center '>
          <h1 className='uppercase text-semibold'>{item.name}</h1>
          <h1 className='text-xs text-zinc-400'>{item.roomcode}</h1>
          {

          }
          <button onClick={() => joinRoom(username, item.roomcode)} className='btn btn-outline absolute bottom-2 right-2'>JOIN</button>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default Rooms