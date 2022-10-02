import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Button } from 'react-bootstrap';

import styles from '../../sass/main.module.scss';
import useHttp from '../../hooks/use-http';
import { contactsActions } from '../../store/contacts-slice';
import AddContactForm from './AddContactForm';

const AddContact = ({ userId, closeModal, star = false, favorite = false }) => {
  const [requestSent, setRequestSent] = useState();
  const { sendRequest, error } = useHttp();
  const dispatch = useDispatch();

  const requestSuccessHandler = (data) => {
    // After successful database update, update app state
    dispatch(contactsActions.addOrUpdateContact(data));
  };

  const addContactRequest = (contactData) => {
    setRequestSent(true);
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
          star: star,
          favorite: favorite,
          user: parseInt(userId),
        },
      },
      requestSuccessHandler
    );
  };

  const renderMessages = (error) => {
    let message;
    if (error) {
      message = (
        <>
          <span>An</span>
          <span className='mx-1 text-danger'>error</span>
          <span>
            occured during request processing. Please try again later!
          </span>
        </>
      );
    } else {
      message = (
        <>
          <span>Contact</span>
          <span className='mx-1 text-success'>successfully</span>
          <span>added!</span>
        </>
      );
    }
    return message;
  };

  return (
    <Stack>
      <div
        className={`${styles.modal__header} p-3 text-center fs-4 fw-bold text-white border-bottom rounded-top`}>
        Add New Contact
      </div>

      {!requestSent && (
        <AddContactForm onSubmit={addContactRequest} onClose={closeModal} />
      )}

      {requestSent && (
        <>
          <div className='p-5 text-center'>{renderMessages(error)}</div>
          <div className='d-flex justify-content-center pb-4'>
            <Button variant='success' onClick={closeModal}>
              Close
            </Button>
          </div>
        </>
      )}
    </Stack>
  );
};

export default AddContact;
