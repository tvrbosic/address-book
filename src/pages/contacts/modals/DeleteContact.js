import { Stack, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import styles from './ContactModals.module.scss';
import useHttp from '../../../hooks/use-http';
import { contactsActions } from '../../../store/contacts-slice';
import { useState } from 'react';

const DeleteContact = ({ closeModal }) => {
  const contactToDelete = useSelector(
    (state) => state.contacts.contactToDelete
  );
  const [requestSent, setRequestSent] = useState();
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();

  const requestSuccessHandler = () => {
    dispatch(contactsActions.deleteContact(contactToDelete.id));
  };

  const confirmDeleteHandler = () => {
    setRequestSent(true);
    sendRequest(
      {
        url: `http://localhost:3001/contacts/${contactToDelete.id}`,
        method: 'DELETE',
      },
      requestSuccessHandler
    );
  };

  const renderQuestion = () => {
    return (
      <>
        <span>Are you sure you want to delete contact</span>
        <span className='mx-1 text-danger'>{`${contactToDelete.name} ${contactToDelete.surname}`}</span>
        <span>?</span>
      </>
    );
  };

  const renderMessage = (error) => {
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
          <span className='mx-1 text-danger'>{`${contactToDelete.name} ${contactToDelete.surname}`}</span>
          <span>successfully deleted!</span>
        </>
      );
    }
    return message;
  };

  const renderDeleteButtons = () => {
    return (
      <>
        <Button variant='secondary' onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant='danger'
          className='ms-3'
          onClick={confirmDeleteHandler}>
          Delete
        </Button>
      </>
    );
  };

  return (
    <Stack>
      <div
        className={`${styles.header} p-3 text-center fs-4 fw-bold text-white border-bottom rounded-top`}>
        Delete Contact
      </div>
      <div className='p-5 text-center'>
        {!requestSent ? renderQuestion() : null}
        {requestSent ? renderMessage(error) : null}
      </div>
      <div className='d-flex justify-content-center pb-4'>
        {!requestSent ? renderDeleteButtons() : null}
        {requestSent ? (
          <Button variant='success' onClick={closeModal}>
            Close
          </Button>
        ) : null}
      </div>
    </Stack>
  );
};

export default DeleteContact;
