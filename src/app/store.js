import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js';
import roomReducer from '../features/room/roomSlice.js';
export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
