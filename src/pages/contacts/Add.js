import { useDispatch } from 'react-redux';
import { Stack } from 'react-bootstrap';

import styles from '../../sass/main.module.scss';
import useHttp from '../../hooks/use-http';
import { contactsActions } from '../../store/contacts-slice';
import AddContactForm from './AddForm';

const AddContact = ({ userId, closeModal }) => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();

  const requestSuccessHandler = (data) => {
    // After successful database update, update app state
    dispatch(contactsActions.addOrUpdateContact(data));
    closeModal();
  };

  const addContactRequest = (contactData) => {
    // Add contact to database
    sendRequest(
      {
        url: 'http://localhost:3001/contacts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...contactData,
          star: false,
          favourite: false,
          user: parseInt(userId),
        },
      },
      requestSuccessHandler
    );
    // TODO: Handle error by displaying message
    // Close modal on error
    closeModal();
  };

  return (
    <Stack>
      <div
        className={`${styles.modal__header} p-3 text-center fs-4 fw-bold text-white border-bottom rounded-top`}>
        Add New Contact
      </div>
      <AddContactForm onSubmit={addContactRequest} />
    </Stack>
  );
};

export default AddContact;
