import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  filteredList: null,
  contactToDisplay: {
    name: '',
    surname: '',
    birth: 0,
    type: 'mobile',
    contact: '',
    favorite: false,
    star: false,
    user: 0,
    id: 0,
  },
  contactToDelete: {
    name: '',
    surname: '',
    birth: 0,
    type: 'mobile',
    contact: '',
    favorite: false,
    star: false,
    user: 0,
    id: 0,
  },
  sortAscending: {
    name: true,
    surname: true,
    birth: true,
    type: true,
    contact: true,
  },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    setContacts(state, action) {
      state.list = action.payload;
    },
    setContactToDisplay(state, action) {
      state.contactToDisplay = action.payload;
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
          name: newContact.name,
          surname: newContact.surname,
          birth: newContact.birth,
          type: newContact.type,
          contact: newContact.contact,
          favorite: newContact.favorite,
          star: newContact.star,
        });
      } else {
        // Contact exists
        existingContact.id = newContact.id;
        existingContact.name = newContact.name;
        existingContact.surname = newContact.surname;
        existingContact.birth = newContact.birth;
        existingContact.type = newContact.type;
        existingContact.contact = newContact.contact;
        existingContact.favorite = newContact.favorite;
        existingContact.star = newContact.star;
      }
    },
    sortContacts(state, action) {
      const sortAttribute = action.payload;

      // Check sortAscending status for given attribute (action.payload)
      if (state.sortAscending[action.payload]) {
        // Sort ascending
        if (action.payload === 'birth') {
          console.log(state.list[1][sortAttribute]);
          // Integer
          state.list = state.list.sort(
            (a, b) => a[sortAttribute] - b[sortAttribute]
          );
        } else {
          // String
          state.list = state.list.sort((a, b) =>
            ('' + a[sortAttribute]).localeCompare(b[sortAttribute])
          );
        }
      } else {
        // Sort descending
        if (action.payload === 'birth') {
          // Integer
          state.list = state.list.sort(
            (a, b) => b[sortAttribute] - a[sortAttribute]
          );
        } else {
          // String
          state.list = state.list.sort((a, b) =>
            ('' + b[sortAttribute]).localeCompare(a[sortAttribute])
          );
        }
      }
      // Toggle sortAscending state for given attribute (action.payload)
      state.sortAscending[action.payload] =
        !state.sortAscending[action.payload];
    },
    setFilteredList(state, action) {
      state.filteredList = action.payload;
    },
    setContactToDelete(state, action) {
      const id = action.payload;
      const existingContact = state.list.find((contact) => contact.id === id);
      if (existingContact) {
        state.contactToDelete = existingContact;
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
