import { contactsSliceActions } from './contacts-slice';

const markFilter = (inputData, favorite, star) => {
  let data;
  // Apply favorite filter (favorite = true)
  if (favorite)
    data = inputData.filter((contact) => contact.favorite === favorite);
  // Apply star filter (star = true)
  if (star) data = inputData.filter((contact) => contact.star === star);
  if (favorite || star) {
    return data;
  } else {
    // Filter not applied (favorite, star = false)
    return inputData;
  }
};

const typeFilter = (inputData, type) => {
  if (type && type !== 'all') {
    // Type not empty, filter and return data
    const data = inputData.filter((contact) => contact.type === type);
    return data;
  } else {
    // Type filter not applied, return inputData
    return inputData;
  }
};

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
        contact.surname.toLowerCase().includes(text) ||
        contact.contact.toLowerCase().includes(text)
    );
    return data;
  } else {
    // Text filter not applied, return inputData
    return inputData;
  }
};

export const applyContactFilters = (inputData, searchParams) => {
  return (dispatch) => {
    let resultData;
    resultData = markFilter(
      inputData,
      searchParams.favorite,
      searchParams.star
    );
    resultData = typeFilter(resultData, searchParams.type);
    resultData = dateFilter(resultData, searchParams.date);
    resultData = textFilter(resultData, searchParams.text);
    dispatch(contactsActions.setFilteredList(resultData));
  };
};

export const contactsActions = {
  ...contactsSliceActions,
  applyContactFilters,
};
