import { Stack, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../../sass/main.module.scss';
import useHttp from '../../hooks/use-http';
import { contactsActions } from '../../store/contacts-slice';
import { useState } from 'react';

const DeleteContact = ({ closeClick, afterDelete }) => {
  const contactToDelete = useSelector(
    (state) => state.contacts.contactToDelete
  );
  const [requestSent, setRequestSent] = useState();
  const { sendRequest, error } = useHttp();
  const dispatch = useDispatch();

  const requestSuccessHandler = () => {
    // After successful database update, update app state
    dispatch(contactsActions.deleteContact(contactToDelete.id));
  };

  const confirmDeleteHandler = () => {
    setRequestSent(true);
    // Delete contact from database
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

  const renderChoiceButtons = () => {
    return (
      <>
        <Button variant='secondary' onClick={closeClick}>
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
        className={`${styles.modal__header} p-3 text-center fs-4 fw-bold text-white border-bottom rounded-top`}>
        Delete Contact
      </div>
      <div className='p-5 text-center'>
        {!requestSent ? renderQuestion() : renderMessage(error)}
      </div>
      <div className='d-flex justify-content-center pb-4'>
        {!requestSent ? (
          renderChoiceButtons()
        ) : (
          <Button variant='success' onClick={afterDelete}>
            Close
          </Button>
        )}
      </div>
    </Stack>
  );
};

export default DeleteContact;
