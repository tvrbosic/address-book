import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state) {
      state.loggedIn = false;
      state.email = null;
      state.token = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
