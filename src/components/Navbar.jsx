import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from '../features/user/userSlice';
import { handleAuth, myOnAuthStateChanged } from '../firebase';
import CreateRoom from './CreateRoom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const setUser = (user = null) => {
    if (user) {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    } else if (!user) {
      dispatch(setSignOutState());
      navigate('/');
    }
  };

  useEffect(() => {
    myOnAuthStateChanged(setUser, navigate);
  }, [username]);
  return (
    <div className='flex sm:flex-col sm:justify-start sm:w-1/4 p-4  justify-between text-white bg-purple-700'>
      <Link className='brder-2 pl-4 font-bold  sm:text-2xl uppercase text-zinc-900 sm:mb-8' to='/'>Rooms</Link>
      {username?
      <div className='brder-2 pl-4 flex gap-2 sm:gap-5 text-sm sm:text-lg sm:flex-col'>
        <Link to='/rooms'>All Rooms</Link>
        <Link to='/create-room'>Construct Room</Link>
        <Link to='/myrooms'>My Rooms</Link>
        <button className='w-fit mt-8 border-2 rounded-lg p-4 hover:bg-zinc-800 duration-300' onClick={handleAuth}>Sign out</button>
      </div> : <></>
      }
    </div>
  );
};

export default Navbar;
