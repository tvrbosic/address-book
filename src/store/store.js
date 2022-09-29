import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user-slice';
import contactsSlice from './contacts-slice';

const store = configureStore({
  reducer: {
    user: userSlice,
    contacts: contactsSlice,
  },
});

export default store;
