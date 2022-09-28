import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  loggedIn: false,
  email: null,
  expires: null,
  logoutTimer: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.id = action.payload.id;
      state.loggedIn = true;
      state.email = action.payload.email;
      state.expires = action.payload.expires;
      state.logoutTimer = action.payload.logoutTimer;
    },
    logout(state) {
      state.id = null;
      state.loggedIn = false;
      state.email = null;
      state.expires = null;
      state.logoutTimer = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
