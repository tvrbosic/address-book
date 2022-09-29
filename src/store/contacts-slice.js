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
    addOrUpdateContact(state, action) {
      const newContact = action.payload;
      const existingContact = state.list.find(
        (contact) => contact.id === newContact.id
      );
      if (!existingContact) {
        // Contact does not exist
        state.list.push({
          id: newContact.id,
          name: newContact.title,
          surname: newContact.price,
          birth: newContact.birth,
          type: newContact.type,
          contact: newContact.contact,
          favourite: newContact.favourite,
          star: newContact.star,
        });
      } else {
        // Contact exists
        existingContact.id = newContact.id;
        existingContact.name = newContact.title;
        existingContact.surname = newContact.price;
        existingContact.birth = newContact.birth;
        existingContact.type = newContact.type;
        existingContact.contact = newContact.contact;
        existingContact.favourite = newContact.favourite;
        existingContact.star = newContact.star;
      }
    },
    deleteContact(state, action) {
      const id = action.payload;
      const existingContact = state.list.find((contact) => contact.id === id);
      if (existingContact) {
        state.list = state.list.filter((contact) => contact.id !== id);
      }
    },
  },
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice.reducer;
