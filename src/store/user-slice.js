import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    login(state, action) {
      state.loggedIn = true;
      state.token = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
