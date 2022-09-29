import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    setContacts(state, action) {
      state.list = action.payload;
    },
    addContact(state) {
      // TODO:
    },
    updateContact(state) {
      // TODO:
    },
    deleteContact(state) {
      // TODO:
    },
  },
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice.reducer;
