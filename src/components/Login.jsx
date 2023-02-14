import React, { useEffect } from 'react';
import { handleAuth, myOnAuthStateChanged } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from '../features/user/userSlice';

const Login = () => {
  
  return (
    <div className='border-2 border-slate-900 w-full'>
    </div>
  );
};

export default Login;
