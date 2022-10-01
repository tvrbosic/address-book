import { contactsActions } from './contacts-slice';

const dateFilter = (inputData, date) => {
  if (date) {
    // Date not empty, filter and return data
    const filterDate = date.setHours(0, 0, 0, 0);
    const data = inputData.filter(
      (contact) => new Date(contact.birth).setHours(0, 0, 0, 0) === filterDate
    );
    return data;
  } else {
    // Date filter not applied, return inputData
    return inputData;
  }
};

const textFilter = (inputData, text) => {
  if (text) {
    // Text not empty, filter and return data
    const data = inputData.filter(
      (contact) =>
        contact.name.toLowerCase().includes(text) ||
        contact.surname.toLowerCase().includes(text)
    );
    return data;
  } else {
    // Text filter not applied, return inputData
    return inputData;
  }
};

export const applyContactFilters = (inputData, text, date) => {
  return (dispatch) => {
    let resultData;
    resultData = dateFilter(inputData, date);
    resultData = textFilter(resultData, text);
    dispatch(contactsActions.setFilteredList(resultData));
  };
};
