import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  roomcode: '',
  members: [],
  input: []
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setNewRoomDetails: (state, action) => {
      state.name = action.payload.name;
      state.roomcode = action.payload.email;
    },
  },
});

export const { setNewRoomDetails } = roomSlice.actions;
export const selectRoomName = (state) => state.room.name;
export const selectRoomCode = (state) => state.room.roomcode;

export default roomSlice.reducer;
