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
  console.log(userPhoto);
  useEffect(() => {
    myOnAuthStateChanged(setUser, navigate);
  }, [username]);
  return (
    <div className='flex items-center sm:flex-col sm:items-start sm:justify-start sm:w-1/4 p-4  justify-between text-white bg-purple-700'>
      <Link
        className='pl-4 font-bold hidden sm:block  sm:text-2xl uppercase text-zinc-900 sm:mb-8'
        to='/'
      >
        Rooms
      </Link>
      {username ? (
        <div className='pl-4 flex items-center
         ml-auto sm:ml-0 gap-2 sm:items-start sm:gap-5 text-sm sm:text-lg sm:flex-col'>
          <Link to='/rooms'>All Rooms</Link>
          <Link to='/create-room'>Construct Room</Link>
          <Link to='/myrooms'>My Rooms</Link>
          <div className='dropdown dropdown-bottom w-full'>
            <img
              tabIndex={0}
              className='rounded-full w-12'
              src={userPhoto}
              alt={username}
            />
            <button
              className='dropdown-content  border-none rounded-lg p-4 bg-zinc-700 hover:bg-zinc-800 duration-300'
              onClick={() => handleAuth(setUser, username)}
            >
              Sign out
            </button>
            {/* </ul> */}
          </div>
        </div>
      ) : (
        <button
          onClick={() => handleAuth(setUser, username)}
          className='p-2 text-white bg-zinc-800 rounded-lg border-2 shadow-xl border-none  hover:duration-300  active:translate-y-1 active:shadow-none'
        >
          Login now
        </button>
      )}
    </div>
  );
};

export default Navbar;
